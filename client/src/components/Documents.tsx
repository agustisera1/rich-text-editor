import { memo, useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { TSerializedDocument } from "../api";
import { useDocuments } from "../hooks";
import { EditorContext } from "../providers";

const DocumentItem = memo(
  ({ name, created, id, version }: TSerializedDocument) => {
    const navigate = useNavigate();
    return (
      <div
        style={{ cursor: "pointer" }}
        key={id}
        onClick={() => navigate(`${id}`)}
      >
        <h2>{name}</h2>
        <p>Created: {created}</p>
        <p>Id: {id}</p>
        <p>Version: {version}</p>
      </div>
    );
  }
);

const DocumentsList = () => {
  const { documents } = useContext(EditorContext);
  return (
    <div style={{ textAlign: "center" }}>
      {documents.map((doc) => (
        <DocumentItem {...doc} key={doc.id} />
      ))}
    </div>
  );
};

export const Documents = () => {
  const { documents, pending } = useDocuments();
  const { id: documentID } = useParams();

  return (
    <EditorContext.Provider value={{ documents }}>
      <>
        {pending && <h2>Loading documents ... </h2>}
        {documentID && <Outlet />}
        {!documentID && <DocumentsList />}
      </>
    </EditorContext.Provider>
  );
};
