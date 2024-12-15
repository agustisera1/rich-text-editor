import { createContext } from "react";
import { TSerializedDocument } from "../api";

export const EditorContext = createContext<{
  documents: TSerializedDocument[];
}>({
  documents: [],
});
