import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { DocumentModel } from "./models/index.js";

// moves to .env -> const SECRET_KEY = crypto.randomBytes(64).toString("hex");
const SECRET_KEY =
  "42ec09a3bc6d6932cc43c0598e018d595871d7c1ce02b6961ffb572e9f6e2cac8dbbaf0d3b98f0ffbb944022f102ff8a17df7b02205adaae1c939d1743f780eb";

const crossOriginOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

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

server.get("/", (req, res) => {
  res.send("<h1>Front end in progress ... </h1>");
});

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
    sameSite: "lax",
  });

  /*  This shouldn't be sent over json.
      res.cookie is already setting the cookie at the headers response
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
        res.status(201).send("<h1>Document created</h1>");
      })()
    : (() => {
        res.status(400).send("<h1>Document already exists</h1>");
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
