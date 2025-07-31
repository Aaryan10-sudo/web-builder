import React from "react";

const BlockRenderer = ({ blocks }) => {
  return (
    <div className="space-y-4 mt-6">
      {blocks.map((block) => {
        if (block.type === "text") {
          return (
            <div key={block.id} className="p-4 bg-white shadow rounded-md">
              <p>{block.content}</p>
            </div>
          );
        } else if (block.type === "image") {
          return (
            <div key={block.id} className="p-4 bg-white shadow rounded-md">
              <img
                src={block.content}
                alt="Block"
                className="w-full max-h-64 object-cover"
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default BlockRenderer;
