import { useCallback, useEffect, useState } from "react";
import { getDocuments, TSerializedDocument, ServiceResponse } from "@api";

const initialState: ServiceResponse<TSerializedDocument[]> = {
  error: null,
  pending: false,
  success: false,
  data: [],
};

/**
 * Custom hook to fetch and manage documents.
 *
 * @returns {Object} An object containing:
 * - `documents`: A sorted array of serialized documents.
 * - `error`: Any error that occurred during the fetch operation.
 * - `pending`: A boolean indicating if the fetch operation is in progress.
 * - `revalidate`: A function to re-fetch the documents.
 *
 * @example
 * const { documents, error, pending, revalidate } = useDocuments();
 */
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
    documents: (
      documentsResponse.data as TSerializedDocument[]
    ).sort() /* To be done: sort documents by modification date*/,
    error: documentsResponse.error,
    pending: documentsResponse.pending,
    revalidate: fetchDocuments,
  };
};
