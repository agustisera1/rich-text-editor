import { useCallback, useEffect, useState } from "react";
import { getDocuments, TSerializedDocument, ServiceResponse } from "@api";

const initialState: ServiceResponse<TSerializedDocument[]> = {
  error: null,
  pending: false,
  success: false,
  data: [],
};

export const useDocuments = () => {
  const [documentsResponse, setDocumentsResponse] =
    useState<ServiceResponse<TSerializedDocument[]>>(initialState);

  const fetchDocuments = useCallback(async () => {
    setDocumentsResponse({ ...documentsResponse, pending: true });
    const response = await getDocuments();
    setDocumentsResponse({ ...response, pending: false });
  }, []);

  useEffect(() => {
    fetchDocuments();
    return () => {
      setDocumentsResponse(initialState);
    };
  }, [fetchDocuments]);

  return {
    documents: (documentsResponse.data as TSerializedDocument[]).sort(),
    error: documentsResponse.error,
    pending: documentsResponse.pending,
    revalidate: fetchDocuments,
  };
};
