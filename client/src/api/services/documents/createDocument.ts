import { serverURL } from "../../../constants";
import { User } from "../../../providers/AuthContext";

type CreateDocument = {
  author: User;
  name: string;
};

export async function createDocument(document: CreateDocument) {
  return await fetch(`${serverURL}/documents`, {
    body: JSON.stringify(document),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.status === 201) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not create the document." };
    }
  });
}
