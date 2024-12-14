import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { DocumentModel } from "./models/index.js";
import { SECRET_KEY, crossOriginOptions } from "./configs.js";

async function connectToDatabase() {
  await connect("mongodb://127.0.0.1:27017/nolte-docs");
}

connectToDatabase();

const port = 3001;
const server = express();
server.use(cors(crossOriginOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  console.log("User registered", { username, password, email });
  res.status(201);
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  console.log("User logged", { username, password });
  res.cookie("loginToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  /*  This shouldn't be sent over json.
      res.cookie is already setting the cookie at the headers response but still needs a tweak
      on headers and browser config to make it work
  */
  res.status(200).json({ token });
});

server.get("/add/:docname", async (req, res) => {
  const { docname } = req.params;
  const newDoc = new DocumentModel({ name: docname });

  const doc = await DocumentModel.findOne({ name: docname });
  !doc
    ? (() => {
        newDoc.save();
        res.status(201);
      })()
    : (() => {
        res.status(400);
      })();

  newDoc.save();
});

server.get("/doclist", async (req, res) => {
  const docs = await DocumentModel.find();
  res.status(200).json(docs);
});

server.listen(port, () => {
  console.info("App listening on port: ", port);
});
