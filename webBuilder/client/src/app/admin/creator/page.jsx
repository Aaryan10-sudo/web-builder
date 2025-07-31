"use client";
import React, { useState } from "react";
import axios from "axios";

const CreateBlock = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Hero");
  const [html, setHtml] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/blocks", {
      name,
      category,
      html,
    });
    alert("Block saved successfully!");
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create New Block</h2>
      <div className="flex w-full gap-10">
        {/* Left: Editor */}
        <div className="bg-gray-800 p-4 rounded-lg w-[50%]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 rounded bg-gray-700"
              placeholder="Block Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full p-2 rounded bg-gray-700"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <textarea
              className="w-full p-2 h-60 rounded bg-gray-700 font-mono text-sm"
              placeholder="Write HTML with Tailwind CSS"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
            >
              Save Block
            </button>
          </form>
        </div>

        {/* Right: Preview */}
        <div className="bg-gray-900 p-4 rounded-lg w-[50%]">
          <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
          <div
            className="  text-black"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBlock;
