import StarterKit from "@tiptap/starter-kit";
import { EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import { BoldIcon, ItalicIcon } from "lucide-react";

const extensions = [StarterKit];

const MenuBar = () => {
  const participants = ["Alice", "Bob", "Charlie"];
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  /* More features implementation in the same way, bulleted list, strike, etc. */
  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  return (
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
          className={`editor-button ${editor.isActive("bold") && "active-btn"}`}
          onClick={toggleBold}
        >
          <BoldIcon size={15} />
        </button>
      </div>
      <div className="participants-container">
        {participants.map((participant) => (
          <div className="participant-avatar" key={participant}>
            {participant[0].toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DocumentDetail = () => {
  // const { id } = useParams();
  // const { documents } = useContext(EditorContext);
  return (
    <div className="editor-wrapper">
      <EditorProvider
        content={"Document content here"}
        extensions={extensions}
        autofocus={true}
        slotBefore={<MenuBar />}
      ></EditorProvider>
    </div>
  );
};
