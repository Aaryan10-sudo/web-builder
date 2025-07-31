"use client";

import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import axios from "axios";
import baseURL from "../config/config";

const customBlockStyles = `
  .gjs-block {
    width: 100% !important;
    min-height: auto !important;
    text-align: left;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #444;
    margin-bottom: 10px;
  }
  .gjs-block:hover {
    background-color: #3b3b3b;
  }
  .gjs-block-label {
    width: 100%;
  }
`;

export default function GrapesEditor() {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  const [templates, setTemplates] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [assets, setAssets] = useState([]);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");

  useEffect(() => {
    async function getAllData() {
      try {
        const [templateResult, blockResult, assetsResult] = await Promise.all([
          axios.get(`${baseURL}/template/get`),
          axios.get(`${baseURL}/blocks/get`),
          axios.get(`${baseURL}/assets/get`),
        ]);

        if (templateResult.data?.data) setTemplates(templateResult.data.data);
        if (blockResult.data?.data) setBlocks(blockResult.data.data);
        if (assetsResult.data?.data) setAssets(assetsResult.data.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        alert("Could not load initial editor data. Please check the console.");
      }
    }
    getAllData();
  }, []);

  useEffect(() => {
    if (!editorRef.current || instanceRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      assetManager: {
        assets: [],
        uploadFile: (e) => {
          const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          if (!files.length) return Promise.resolve([]);
          const formData = new FormData();
          formData.append("file", files[0]);
          return fetch(`${baseURL}/api/upload`, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              const imageUrl = data.result?.url || data.result || data.url;
              if (typeof imageUrl !== "string") {
                throw new Error(
                  "Invalid server response: URL is not a string."
                );
              }
              setAssets((prevAssets) => [...prevAssets, { url: imageUrl }]);
              return [{ src: imageUrl }];
            })
            .catch((err) => console.error("Upload error:", err));
        },
      },
      canvas: {
        styles: ["https://cdn.tailwindcss.com"],
        scripts: ["https://cdn.tailwindcss.com"],
      },
    });

    editor.Commands.add("save-db", {
      run: (editor, sender) => {
        sender && sender.set("active", true);
        handleSave(editor, () => sender.set("active", false));
      },
    });

    editor.Panels.addButton("options", [
      {
        id: "save-db",
        className: "fa fa-floppy-o",
        command: "save-db",
        attributes: { title: "Save Page" },
      },
    ]);

    instanceRef.current = editor;
    setIsEditorReady(true);

    return () => {
      editor.destroy();
      instanceRef.current = null;
      setIsEditorReady(false);
    };
  }, []);

  useEffect(() => {
    if (!isEditorReady || !instanceRef.current) return;
    const editor = instanceRef.current;
    const injectStyles = () => {
      const style = document.createElement("style");
      style.innerHTML = customBlockStyles;
      editor.Canvas.getDocument().head.appendChild(style);
    };
    editor.on("canvas:load", injectStyles);
    return () => editor.off("canvas:load", injectStyles);
  }, [isEditorReady]);

  useEffect(() => {
    if (!isEditorReady || !instanceRef.current) return;

    const editor = instanceRef.current;
    const bm = editor.BlockManager;
    bm.getAll().forEach((block) => {
      if (block?.getId) bm.remove(block.getId());
    });

    templates.forEach((template) => {
      bm.add(`template-${template.id}`, {
        label: `
          <div>
            <img src="${
              template.preview ||
              "https://via.placeholder.com/200x150.png?text=No+Preview"
            }" style="width: 100%; display: block;" />
            <div style="padding: 10px; font-size: 12px; text-align: center;">${
              template.title
            }</div>
          </div>
        `,
        category: "Templates",
        content: `<div data-load-template-route="${template.content.route}"></div>`,
      });
    });

    blocks.forEach((block) => {
      const unescaped = block.content.replace(/\\"/g, '"');
      bm.add(block.title, {
        label: block.label || block.title,
        category: block.category || "Basic Blocks",
        content: unescaped,
      });
    });
  }, [templates, blocks, isEditorReady]);

  useEffect(() => {
    if (!isEditorReady || !instanceRef.current) return;
    const editor = instanceRef.current;

    const handleTemplateLoad = async (component) => {
      const route = component.getAttributes()["data-load-template-route"];
      // Exit if the dropped component is not a template loader
      if (!route) return;

      component.remove();

      editor.Modal.open({
        title: "Loading Template",
        content: "Please wait...",
      });

      try {
        // Using the route from the attribute for dynamic loading
        const result = await axios.get(
          `${baseURL}/template/get-by-route?route=${encodeURIComponent(route)}`
        );
        console.log("Server response payload:", result.data); // Good for debugging!

        // --- THIS IS THE FIX ---
        // Access result.data (the payload), then .content.html
        const html = result.data?.content?.html;

        console.log(
          "Extracted HTML:",
          html ? "HTML found!" : "HTML is undefined or null"
        );

        if (html) {
          editor.setComponents(html); // Replace full canvas content
        } else {
          // This will now correctly trigger if the html property is missing from the response
          throw new Error(
            "Template response did not contain valid HTML content."
          );
        }
      } catch (err) {
        console.error("Failed to load template:", err);
        alert("Template load failed. Check the console for details.");
      } finally {
        editor.Modal.close();
      }
    };

    const event = "component:add";
    editor.on(event, handleTemplateLoad);
    return () => editor.off(event, handleTemplateLoad);
  }, [isEditorReady]);

  useEffect(() => {
    if (isEditorReady && instanceRef.current && assets.length) {
      const am = instanceRef.current.AssetManager;
      const editorAssets = new Set(
        am.getAll().map((asset) => asset.get("src"))
      );
      const newAssetUrls = assets
        .filter((asset) => asset && asset.url && !editorAssets.has(asset.url))
        .map((asset) => asset.url);
      if (newAssetUrls.length) {
        am.add(newAssetUrls);
      }
    }
  }, [assets, isEditorReady]);

  const handleSave = async (editor, onSaveComplete) => {
    if (!activeRoute) return alert("No active route to save");

    const html = editor.getHtml({ cleanId: true });
    try {
      await axios.put(`${baseURL}/template/update?route=/`, {
        route: "/",
        html,
      });
      alert("Template saved successfully");
    } catch (err) {
      console.error("Error saving template:", err);
      alert("Error saving template. Check console.");
    }

    onSaveComplete && onSaveComplete();
  };

  return <div ref={editorRef} id="gjs" />;
}
