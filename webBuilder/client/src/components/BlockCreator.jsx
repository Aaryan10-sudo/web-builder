"use client";
import React, { useState } from "react";

const BlockCreator = ({ onAddBlock }) => {
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (!content.trim()) return;
    const newBlock = {
      type,
      content,
      id: Date.now(),
    };
    onAddBlock(newBlock);
    setContent("");
  };

  return (
    <div className="p-4 border rounded-md space-y-4 bg-gray-100">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
      </select>

      {type === "text" ? (
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Enter text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Enter image URL"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      <button
        onClick={handleAdd}
        className="bg-purple-600 text-white px-4 py-2 rounded-md"
      >
        Add Block
      </button>
    </div>
  );
};

export default BlockCreator;
