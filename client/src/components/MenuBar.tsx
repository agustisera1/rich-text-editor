import { BoldIcon, TrashIcon, ItalicIcon, SaveIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useCallback, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../providers";
import {
  deleteDocument as deleteDocumentService,
  TSerializedDocument,
  updateDocument,
} from "@api";

/**
 * @property `autosave`: If `true`, the document will be saved automatically instead of clicking the save button.
 * @property: `autosaveInterval` provide in seconds the autosave interval
 * */

interface MenuBarProps {
  autosave?: boolean;
  autosaveInterval: number;
}

export const MenuBar = ({
  autosave = false,
  autosaveInterval = 5,
}: MenuBarProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { id: documentID } = useParams() as { id: string };
  const { participants, editor, documents, socket } = useContext(EditorContext);
  const navigate = useNavigate();

  const saveDocument = useCallback(async () => {
    console.log("save called");
    if (editor) {
      const { success } = await updateDocument(documentID, {
        content: editor.getText(),
        name: nameInputRef.current?.value || "Untitled",
      });

      if (success && !autosave) alert("Document saved successfully");
    }
  }, [editor, documentID, autosave]);

  const deleteDocument = async () => {
    if (confirm("Are you sure you want to delete this document?")) {
      const { success, error } = await deleteDocumentService(documentID);
      if (success) {
        alert("Document successfully deleted");
        navigate("/documents");
      }

      if (error) alert("Could not delete the document. Please try again");
    }
  };

  useEffect(() => {
    if (autosave && editor) {
      const interval = setInterval(() => {
        socket?.emit("autosave", {
          content: editor.getText(),
          name: nameInputRef.current?.value || "Untitled",
        });
      }, autosaveInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [socket, saveDocument, autosave, editor, autosaveInterval]);

  if (!editor) return null;

  const document = documents.find(
    (doc) => doc.id === documentID
  ) as TSerializedDocument;

  /* More features implementation in the same way, bulleted list, strike, etc. */
  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };
  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  return (
    <>
      <input
        ref={nameInputRef}
        className="editor-input"
        defaultValue={document?.name}
      />
      <div className="editor-buttons-container">
        <div>
          <button
            className={`editor-button ${
              editor.isActive("italic") && "active-btn"
            }`}
            onClick={toggleItalic}
          >
            <ItalicIcon size={15} />
          </button>
          <button
            className={`editor-button ${
              editor.isActive("bold") && "active-btn"
            }`}
            onClick={toggleBold}
          >
            <BoldIcon size={15} />
          </button>
          <button className="editor-button" onClick={saveDocument}>
            <SaveIcon size={15} />
          </button>
          <button className="editor-button" onClick={deleteDocument}>
            <TrashIcon size={15} />
          </button>
        </div>
        {!!participants.length && (
          <div className="participants-container">
            {participants.map((participant) => (
              <div className="participant-avatar" key={participant}>
                {participant[0].toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};