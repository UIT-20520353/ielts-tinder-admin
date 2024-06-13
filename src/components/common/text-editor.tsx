import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import clsx from "clsx";
import React, { useMemo } from "react";

interface TextEditorProps {
  className?: string;
  onChange: (data: string) => void;
}

const TextEditor: React.FunctionComponent<TextEditorProps> = ({
  className,
  onChange,
}) => {
  const config = useMemo(
    () => ({
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "|",
          "blockQuote",
          "insertTable",
          "undo",
          "redo",
        ],
      },
      language: "en",
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    }),
    []
  );

  return (
    <div className={clsx("w-full", className)}>
      <CKEditor
        editor={ClassicEditor}
        data=""
        config={config}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default TextEditor;
