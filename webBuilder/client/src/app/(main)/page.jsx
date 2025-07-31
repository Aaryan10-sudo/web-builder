"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [pageHtml, setPageHtml] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getHtml() {
      try {
        const result = await axios({
          url: "http://localhost:9000/template/get-by-route?route=/",
          method: "GET",
        });

        if (result.data && result.data.content && result.data.content.html) {
          setPageHtml(result.data.content.html);
        } else {
          throw new Error("Invalid data structure in API response.");
        }
      } catch (err) {
        console.error("Failed to load page content:", err);
        setError(err.message);
      }
    }

    getHtml();
  }, []);

  if (error) {
    return <div>Error: Could not load page content. ({error})</div>;
  }

  if (!pageHtml) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}

export default Page;
