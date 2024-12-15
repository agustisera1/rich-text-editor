import { ServiceResponse } from "../../types/common";

type TDocument = {
  name: string;
  created: string;
  author: string;
  __v: number;
  _id: string;
};

export type TSerializedDocument = {
  name: string;
  created: string;
  id: string;
  version: string;
};

function serializeDocument({ __v, _id, ...rest }: TDocument) {
  return {
    ...rest,
    id: _id,
    version: String(__v),
  };
}

export async function getDocuments(): Promise<
  ServiceResponse<TSerializedDocument[]>
> {
  return await fetch("http://localhost:3001/documents", { method: "GET" }).then(
    async (res) => {
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
    }
  );
}
