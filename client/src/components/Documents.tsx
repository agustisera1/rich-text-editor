import { useDocuments } from "../hooks";

export const Documents = () => {
  const { documents } = useDocuments();
  console.info("Documents list:", documents);
  return <div>{JSON.stringify(documents.map((doc) => doc))}</div>;
};
