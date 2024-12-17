import { ServiceResponse } from "../types";

/**
 * Deletes a document by ID.
 * @param documentID - The ID of the document to be deleted.
 * @returns A promise that resolves to a `ServiceResponse` indicating the success or failure of the operation.
 */
export async function deleteDocument(
  documentID: string
): Promise<ServiceResponse> {
  return await fetch(
    `${import.meta.env.VITE_SERVER_URL}/documents/${documentID}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (res) => {
    if (res.status === 200) {
      return { success: true, error: null };
    } else {
      return { success: false, error: "Could not delete the document." };
    }
  });
}
