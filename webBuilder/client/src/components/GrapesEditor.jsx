"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import axios from "axios";

export default function GrapesEditor() {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);
  const [blocks, setBlocks] = useState([]);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    async function getAllBlocks() {
      try {
        const result = await axios.get("http://localhost:9000/blocks/get");
        setBlocks(result.data.data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    }
    getAllBlocks();
  }, []);

  useEffect(() => {
    if (!editorRef.current || instanceRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      plugins: [],
    });

    instanceRef.current = editor;
    setIsEditorReady(true);

    editor.on("load", () => {
      const doc = editor.Canvas.getDocument();
      const head = doc.head;
      const link = doc.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
      head.appendChild(link);
    });

    return () => {
      editor.destroy();
      instanceRef.current = null;
      setIsEditorReady(false);
    };
  }, []);

  useEffect(() => {
    if (!instanceRef.current || blocks.length === 0) return;

    const editor = instanceRef.current;

    blocks.forEach((block) => {
      const unescaped = block.content.replace(/\\"/g, '"');
      editor.BlockManager.add(block.title, {
        label: block.label || block.title,
        category: block.category || "Basic",
        content: `<div data-block-id="${block.id}">${unescaped}</div>`,
      });

      editor.addComponents(
        `<div data-block-id="${block.id}">${unescaped}</div>`
      );
    });
  }, [blocks]);

  const handleSave = async () => {
    const editor = instanceRef.current;
    if (!editor) return;

    const html = editor.getHtml();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const blockElements = [...doc.querySelectorAll("[data-block-id]")];

    const blocksToUpdate = blockElements.map((el, index) => {
      const id = el.getAttribute("data-block-id");
      if (!id) return null;

      // Remove nested data-block-id so you don’t corrupt structure
      el.querySelectorAll("[data-block-id]").forEach((child) => {
        child.removeAttribute("data-block-id");
      });

      const content = el.innerHTML.trim();

      // If content is empty, skip update
      if (!content) return null;

      return {
        id,
        content: content,
        position: index,
      };
    });

    try {
      await Promise.all(
        blocksToUpdate.filter(Boolean).map(({ id, content, position }) =>
          axios.put(`http://localhost:9000/blocks/update/${id}`, {
            content,
            position,
          })
        )
      );
      alert("Blocks updated successfully!");
    } catch (error) {
      console.error("Error updating blocks:", error);
      alert("Failed to update blocks.");
    }
  };

  return (
    <>
      {isEditorReady && (
        <div className="p-2 bg-[#444444] flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#363636] text-[#D278C9] px-4 py-1 rounded transition font-semibold"
          >
            Save
          </button>
        </div>
      )}
      <div ref={editorRef} id="gjs" />
    </>
  );
}
