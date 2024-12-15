import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { DocumentModel, UserModel } from "./models/index.js";

async function connectToDatabase() {
  await connect(process.env.DB_URI);
}

dotenv.config();
connectToDatabase();

const port = 3001;
const server = express();
server.use(cors({ origin: process.env.ORIGIN, credentials: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

/* Auth endpoints */
server.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) throw new Error("User already exists");
    const newUser = new UserModel({ username, email, password });
    await newUser.save();
    res.status(201).send({ success: true, message: "User created" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

server.post("/logout", (req, res) => {
  console.log("User logout", req.body.username);
  res.clearCookie("token");
  res.clearCookie("username");
  res.clearCookie("email");
  res.status(200).json({ message: "User logged out" });
});

server.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  try {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error("User not registered");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    res.cookie("username", username);
    res.cookie("email", user.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    /*
      The token houldn't be sent over json.
      res.cookie is already setting the cookie at the headers response but still needs a tweak
      on headers and browser config to make it work
    */
    res.status(200).send({
      success: true,
      message: "Welcome!",
      token,
      username,
      email: user.email,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

/* Document endpoints */
server.get("/documents", async (req, res) => {
  const documents = await DocumentModel.find();
  res.status(200).json({ documents });
});

server.post("/documents", async (req, res) => {
  const { name, author } = req.body;
  // Author is an OBJECT
  try {
    const document = new DocumentModel({ name, author });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: "Error creating document" });
  }
});

server.get("/documents/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await DocumentModel.findById(id);
    if (!document) throw new Error("Document not found");
    res.status(200).send({ success: true, document });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

server.delete("/documents/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await DocumentModel.findByIdAndDelete(id);
    if (!document) throw new Error("Document not found");
    res.status(200).send({ success: true, message: "Document deleted" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

server.listen(port, () => {
  console.info("App listening on port: ", port);
});
