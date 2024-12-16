import { serverURL } from "../../../constants";

export async function deleteDocument(documentID: string) {
  return await fetch(`${serverURL}/documents/${documentID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.status === 200) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not delete the document." };
    }
  });
}
