import { User } from "../../../providers/AuthContext";
import { ServiceResponse } from "../types/common";

type TDocument = {
  name: string;
  created: string;
  author: User;
  __v: number;
  _id: string;
  lastModified: string;
};

export type TSerializedDocument = {
  name: string;
  created: string;
  id: string;
  version: string;
  author: User;
  lastModified: string;
};

function serializeDocument({ __v, _id, ...rest }: TDocument) {
  return {
    ...rest,
    id: _id,
    version: String(__v),
  };
}

/**
 * Fetches the list of documents from the server and returns a serialized response.
 *
 * @returns {Promise<ServiceResponse<TSerializedDocument[]>>} A promise that resolves to a service response containing an array of serialized documents.
 * The service response contains:
 * - `success`: A boolean indicating whether the request was successful.
 * - `error`: A string containing an error message if the request failed, otherwise `null`.
 * - `data`: An array of serialized documents if the request was successful, otherwise an empty array.
 * @see TSerializedDocument
 */
export async function getDocuments(): Promise<
  ServiceResponse<TSerializedDocument[]>
> {
  return await fetch(`${import.meta.env.VITE_SERVER_URL}/documents`, {
    method: "GET",
  }).then(async (res) => {
    const documents = (await res
      .json()
      .then(({ documents }) => documents)) as TDocument[];
    if (res.status === 200) {
      return {
        success: true,
        error: null,
        data: documents.map(serializeDocument),
      };
    } else {
      return {
        success: false,
        error: "An error occurred while fetching the documents",
        data: [],
      };
    }
  });
}
