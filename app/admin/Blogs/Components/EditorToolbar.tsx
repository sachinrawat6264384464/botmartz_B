"use client";

import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  List,
  ListOrdered,
  Table as TableIcon,
  Image as ImageIcon,
  Code2,
} from "lucide-react";

// Font Options
export const BLOG_FONTS = [
  { label: "Georgia (Serif)", value: "Georgia, serif" },
  { label: "Inter (Sans)", value: "Inter, sans-serif" },
  { label: "Merriweather (Serif)", value: "Merriweather, serif" },
];

export const TEXT_SIZES = [
  { label: "Small", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Medium", value: "18px" },
  { label: "Large", value: "20px" },
  { label: "X-Large", value: "24px" },
];

interface EditorToolbarProps {
  editor: Editor | null;
  uploadingImage: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLinkAdd: () => void;
  onCodeBlockClick: () => void; // Add this
}

export default function EditorToolbar({
  editor,
  uploadingImage,
  onImageUpload,
  onLinkAdd,
  onCodeBlockClick,
}: EditorToolbarProps) {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tableSize, setTableSize] = useState({ rows: 3, cols: 3 });

  // Track undo/redo state changes
  useEffect(() => {
    if (!editor) return;

    const updateHistoryState = () => {
      setCanUndo(editor.can().undo());
      setCanRedo(editor.can().redo());
    };

    updateHistoryState();
    editor.on("transaction", updateHistoryState);

    return () => {
      editor.off("transaction", updateHistoryState);
    };
  }, [editor]);

  if (!editor) return null;

  const setFontFamily = (font: string) => {
    if (font) editor.chain().focus().setFontFamily(font).run();
  };

  const setFontSize = (size: string) => {
    if (size)
      editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  const insertTable = () => {
    setShowTablePicker(true);
  };

  const confirmInsertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({
        rows: tableSize.rows,
        cols: tableSize.cols,
        withHeaderRow: true,
      })
      .run();
    setShowTablePicker(false);
    setTableSize({ rows: 3, cols: 3 });
  };

  // Table operations
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  return (
    <>
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap items-center gap-1 sticky top-0 z-10">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </button>
        </div>

        {/* Font Family */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <select
            onChange={(e) => setFontFamily(e.target.value)}
            className="text-xs px-2 py-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Font Family"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Font
            </option>
            {BLOG_FONTS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <select
            onChange={(e) => setFontSize(e.target.value)}
            className="text-xs px-2 py-1.5 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Font Size"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Size
            </option>
            {TEXT_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .unsetMark("textStyle")
                .run()
            }
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""}`}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .unsetMark("textStyle")
                .run()
            }
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""}`}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 3 })
                .unsetMark("textStyle")
                .run()
            }
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""}`}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""}`}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""}`}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""}`}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={onCodeBlockClick}
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors ${editor?.isActive("codeBlock") ? "bg-gray-300" : ""}`}
            title="Insert Code Block"
          >
            <Code2 size={18} />
          </button>
        </div>

        {/* Tables */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={insertTable}
            className="p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors"
            title="Insert Custom Table"
          >
            <TableIcon size={18} />
          </button>
          {editor.isActive("table") && (
            <>
              <button
                type="button"
                onClick={addColumnAfter}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-xs font-medium"
                title="Add Column After"
              >
                Col+
              </button>
              <button
                type="button"
                onClick={deleteColumn}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-xs font-medium"
                title="Delete Column"
              >
                Col-
              </button>
              <button
                type="button"
                onClick={addRowAfter}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-xs font-medium"
                title="Add Row After"
              >
                Row+
              </button>
              <button
                type="button"
                onClick={deleteRow}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-xs font-medium"
                title="Delete Row"
              >
                Row-
              </button>
              <button
                type="button"
                onClick={deleteTable}
                className="px-2 py-1 rounded hover:bg-red-100 text-red-600 text-xs font-medium"
                title="Delete Table"
              >
                Del
              </button>
            </>
          )}
        </div>

        {/* Media */}
        <div className="flex items-center gap-1 px-2 border-r border-gray-300">
          <label
            className={`p-2 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Upload Image with Alt Text"
          >
            <ImageIcon size={18} />
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
          </label>
        </div>

        {/* Undo/Redo */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!canUndo}
            className={`p-2 rounded transition-colors ${
              canUndo
                ? "hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "text-gray-400 cursor-not-allowed opacity-50"
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!canRedo}
            className={`p-2 rounded transition-colors ${
              canRedo
                ? "hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "text-gray-400 cursor-not-allowed opacity-50"
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </button>
        </div>
      </div>

      {/* Table Size Picker Modal */}
      {showTablePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-80">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Insert Table
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rows: {tableSize.rows}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={tableSize.rows}
                  onChange={(e) =>
                    setTableSize((prev) => ({
                      ...prev,
                      rows: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Columns: {tableSize.cols}
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={tableSize.cols}
                  onChange={(e) =>
                    setTableSize((prev) => ({
                      ...prev,
                      cols: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                Creating {tableSize.rows} × {tableSize.cols} table
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTablePicker(false);
                  setTableSize({ rows: 3, cols: 3 });
                }}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmInsertTable}
                className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
