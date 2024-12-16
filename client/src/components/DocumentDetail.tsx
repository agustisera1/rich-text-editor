import StarterKit from "@tiptap/starter-kit";
import { useEditor, Editor, EditorContent } from "@tiptap/react";
import { useWebSocket } from "@hooks";
import { useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";
import { MenuBar } from "./MenuBar";
import { CursorPosition } from "./CursorPosition";
import { EditorContext } from "../providers";
import { TSerializedDocument } from "@api";

const extensions = [StarterKit];

export const DocumentDetail = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  /* WARNING: Use wss: protocol instead of HTTP */
  const { socket } = useWebSocket(import.meta.env.VITE_SERVER_URL);
  const { id: documentID } = useParams();
  const { documents } = useOutletContext() as {
    documents: TSerializedDocument[];
  };

  const onUpdate = ({ editor }: { editor: Editor }) => {
    if (socket) {
      const changes = editor.getJSON();
      /* To be done:
        - Set the cursor position for participants.
        - Provide username initials for active avatar
          const { from } = editor.state.selection;
          const cursorPosition = editor.view.coordsAtPos(from);
          socket.emit("cursor-position", { documentID, cursorPosition });      
        */
      socket.emit("send-changes", changes);
    }
  };

  const editor = useEditor({
    extensions,
    autofocus: true,
    onUpdate,
  }) as Editor;

  useEffect(() => {
    if (socket && editor) {
      socket.emit("join-document", documentID);
      socket.emit("get-room-participants", documentID);
      socket.on("users-connected", (users) => {
        setParticipants(
          users[documentID as string].filter(
            (user: string) => user !== socket.id
          )
        );
      });
      socket.on("alert", (msg) => alert(msg));
      socket.on("load-document", (document) => {
        editor.commands.setContent(document);
      });
      socket.on("recieve-changes", (delta) => {
        editor.commands.setContent(delta);
      });
    }
  }, [socket, editor, documentID]);

  return (
    <div className="editor-wrapper">
      <EditorContext.Provider
        value={{ editor, documents, socket, participants }}
      >
        <MenuBar autosave={true} autosaveInterval={10} />
        <CursorPosition />
        <EditorContent editor={editor} />
      </EditorContext.Provider>
    </div>
  );
};
