import { TSerializedDocument } from "../api";
import { useDocuments } from "../hooks";

const Document = ({ name, created, id, version }: TSerializedDocument) => {
  return (
    <div key={id}>
      <h2>{name}</h2>
      <p>Created: {created}</p>
      <p>Id: {id}</p>
      <p>Version: {version}</p>
    </div>
  );
};

export const Documents = () => {
  const { documents } = useDocuments();
  return <div style={{ textAlign: "center" }}>{documents.map(Document)}</div>;
};
