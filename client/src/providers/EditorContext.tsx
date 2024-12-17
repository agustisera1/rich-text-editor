import { createContext } from "react";
import { Editor } from "@tiptap/react";
import { Socket } from "socket.io-client";
import { TSerializedDocument } from "@api";

export const EditorContext = createContext<{
  editor: Editor | null;
  socket: Socket | null;
  participants: string[];
  documents: TSerializedDocument[];
}>({
  socket: null,
  participants: [],
  editor: null,
  documents: [],
});
