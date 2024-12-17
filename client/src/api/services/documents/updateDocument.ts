type DocumentChanges = {
  content: string;
  name: string;
};

/**
 * Updates a document with the given changes.
 *
 * @param documentID - The ID of the document to update.
 * @param changes - An object containing the changes to apply to the document.
 * @returns A promise that resolves to an object indicating the success or failure of the update operation.
 */
export async function updateDocument(
  documentID: string,
  changes: DocumentChanges
) {
  return await fetch(
    `${import.meta.env.VITE_SERVER_URL}/documents/${documentID}`,
    {
      body: JSON.stringify(changes),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not update the document." };
    }
  });
}
