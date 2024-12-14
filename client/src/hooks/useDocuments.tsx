import { useEffect, useState } from "react";

type TDocument = unknown;

export const useDocuments = () => {
  const [documents, setDocuments] = useState<TDocument[]>([]);

  useEffect(() => {
    setDocuments([
      { name: "foo", created: Date.now(), version: "1.0.1" },
    ] as TDocument[]);
  }, []);

  return {
    documents,
  };
};
