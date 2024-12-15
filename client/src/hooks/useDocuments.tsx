import { useEffect, useState } from "react";
import { getDocuments, TSerializedDocument } from "../api";
import { ServiceResponse } from "../types/common";

const initialState: ServiceResponse<TSerializedDocument[]> = {
  error: null,
  pending: false,
  success: false,
  data: [],
};

export const useDocuments = () => {
  const [documentsResponse, setDocumentsResponse] =
    useState<ServiceResponse<TSerializedDocument[]>>(initialState);

  useEffect(() => {
    (async () => {
      setDocumentsResponse({ ...documentsResponse, pending: true });
      const response = await getDocuments();
      setDocumentsResponse({ ...response, pending: false });
    })();

    return () => {
      setDocumentsResponse(initialState);
    };
  }, []);

  return {
    documents: documentsResponse.data as TSerializedDocument[],
    error: documentsResponse.error,
    pending: documentsResponse.pending,
  };
};
