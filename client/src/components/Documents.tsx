import { memo, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useAuth, useDocuments } from "../hooks";
import { formatDate } from "../utils";
import { ServiceResponse, createDocument, TSerializedDocument } from "@api";
import { FileIcon } from "lucide-react";

const DocumentItem = memo(
  ({ name, lastModified, id, version, author }: TSerializedDocument) => {
    const navigate = useNavigate();
    return (
      <div
        style={{
          cursor: "pointer",
          display: "block",
          textAlign: "center",
          border: "1px solid gray",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
        key={id}
        onClick={() => navigate(`${id}`)}
      >
        <FileIcon size={30} strokeWidth={1} />
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {name || "Untitled"}
        </p>
        <p>Last modified: {formatDate(lastModified)}</p>
        <p>Owner: {author?.email}</p>
        <p>Version: {version}</p>
      </div>
    );
  }
);

const initialState = {
  pending: false,
  success: false,
  error: null,
};

export const Documents = () => {
  const location = useLocation();
  const [addDocumentStatus, setAddDocumentStatus] =
    useState<ServiceResponse<null>>(initialState);
  const { documents, pending, revalidate } = useDocuments();
  const { id: documentID } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (!documentID) revalidate();
  }, [location, revalidate, documentID]);

  const addDocument = async () => {
    setAddDocumentStatus({ ...addDocumentStatus, pending: true });
    const response = await createDocument({ author: user, name: "Untitled" });
    setAddDocumentStatus({ ...response, pending: false });
  };

  const DocumentsList = () => (
    <>
      <button className="primary add-document-button" onClick={addDocument}>
        Create
      </button>
      <div className="documents-grid">
        {documents.map((doc) => (
          <DocumentItem {...doc} key={doc.id} />
        ))}
      </div>
    </>
  );

  useEffect(() => {
    if (addDocumentStatus.success) {
      revalidate();
    }

    return () => {
      setAddDocumentStatus(initialState);
    };
  });

  return (
    <>
      {addDocumentStatus.pending && <h2>Creating document ... </h2>}
      {pending && <h2>Loading documents ... </h2>}
      {documentID && <Outlet context={{ documents }} />}
      {!documentID && <DocumentsList />}
    </>
  );
};
