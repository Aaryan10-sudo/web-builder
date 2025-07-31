"use client";
import GrapesEditor from "../../../components/GrapesEditor";
import React from "react";

const page = () => {
  return (
    <main>
      <GrapesEditor
        initialHtml=""
        initialCss=""
        initialProjectData={null}
        onSave={(html, css, projectData) => {
          console.log("Saved:", html, css, projectData);
        }}
      />
    </main>
  );
};

export default page;
