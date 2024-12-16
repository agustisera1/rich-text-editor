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

DocumentSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    this.increment(); // Increment the versionKey (__v)
  }
  next();
});

const DocumentModel = model("DocumentSchema", DocumentSchema);

export { DocumentModel };
