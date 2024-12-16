import { serverURL } from "../../../constants";

type DocumentChanges = {
  content: string;
  name: string;
};

export async function updateDocument(
  documentID: string,
  changes: DocumentChanges
) {
  return await fetch(`${serverURL}/documents/${documentID}`, {
    body: JSON.stringify(changes),
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.status === 200) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not update the document." };
    }
  });
}
