import { User } from "../../../providers/AuthContext";
import { ServiceResponse } from "../types";

type CreateDocument = {
  author: User;
  name: string;
};

/**
 * Creates a new document by sending a POST request to the server.
 *
 * @param document - The document to be created, containing the author and name.
 * @prop author - The Auth user object
 * @returns A promise that resolves to a ServiceResponse indicating the success or failure of the operation.
 */
export async function createDocument(
  document: CreateDocument
): Promise<ServiceResponse> {
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
