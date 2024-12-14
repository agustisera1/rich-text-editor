import { Schema, model } from "mongoose";

const DocumentSchema = new Schema({
  name: String,
  created: { type: Date, default: Date.now },
  version: String,
});

const DocumentModel = model("DocumentSchema", DocumentSchema);

export { DocumentModel };
