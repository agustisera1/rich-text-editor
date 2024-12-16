import { User } from "../../../providers/AuthContext";

type CreateDocument = {
  author: User;
  name: string;
};

export async function createDocument(document: CreateDocument) {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/documents`, {
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
