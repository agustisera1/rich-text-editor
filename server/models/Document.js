import { Schema, model } from "mongoose";

const DocumentSchema = new Schema(
  {
    name: String,
    created: { type: Date, default: Date.now },
    author: { username: String, email: String },
    content: { type: String, default: "" },
    lastModified: { type: Date, default: Date.now },
  },
  { versionKey: "__v" }
);

const DocumentModel = model("DocumentSchema", DocumentSchema);

export { DocumentModel };
