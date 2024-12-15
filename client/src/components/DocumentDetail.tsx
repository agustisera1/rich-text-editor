import { useContext } from "react";
import { useParams } from "react-router";
import { EditorContext } from "../providers";

export const DocumentDetail = () => {
  const { id } = useParams();
  const { documents } = useContext(EditorContext);
  const document = documents.find((doc) => doc.id === id);
  return <div style={{ textAlign: "center" }}>{JSON.stringify(document)}</div>;
};
