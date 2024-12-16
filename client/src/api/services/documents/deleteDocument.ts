export async function deleteDocument(documentID: string) {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/${documentID}`, {
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
