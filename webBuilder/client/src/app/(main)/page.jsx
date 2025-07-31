"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../config/config";

function Page() {
  // let pageHtml = "";
  let [pageHtml, setPageHtml] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getHtml() {
      try {
        const result = await axios({
          url: `${baseURL}/template/get-by-route?route=/`,
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

  // if (error) {
  //   return <div>Error: Could not load page content. ({error})</div>;
  // }

  if (!pageHtml) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] w-full">
        <h1 className="text-[24px]">Loading</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path
              strokeDasharray={16}
              strokeDashoffset={16}
              d="M12 3c4.97 0 9 4.03 9 9"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="16;0"
              ></animate>
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </path>
            <path
              strokeDasharray={64}
              strokeDashoffset={64}
              strokeOpacity={0.3}
              d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="1.2s"
                values="64;0"
              ></animate>
            </path>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}

export default Page;
