"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../config/config";

function Page() {
  // let pageHtml =
  //   '<body><div data-block-id="22ce3317-0836-40df-864e-8fb6d048d47f"><div data-block-id="22ce3317-0836-40df-864e-8fb6d048d47f"><div><div><div><nav class="sticky top-0 z-50 px-4 py-4 shadow-md"><div class="max-w-7xl mx-auto flex justify-between items-center"><div class="text-2xl font-bold">Nnine Solution</div><div class="hidden md:flex space-x-6"><a href="/" class="hover:text-purple-300 transition">Home</a><a href="/services" class="hover:text-purple-300 transition">Services</a><a href="/portfolio" class="hover:text-purple-300 transition">Portfolio</a><a href="/contact" class="hover:text-purple-300 transition">Contact</a></div><button id="hamburger-btn" aria-label="Toggle menu" class="md:hidden flex flex-col space-y-1"><span class="w-6 h-0.5 bg-white"></span><span class="w-6 h-0.5 bg-white"></span><span class="w-6 h-0.5 bg-white"></span></button></div><div id="mobile-menu" class="md:hidden hidden px-4 mt-4 space-y-3"><a href="/" class="block hover:text-purple-300">Home</a><a href="/services" class="block hover:text-purple-300">Services</a><a href="/portfolio" class="block hover:text-purple-300">Portfolio</a><a href="/contact" class="block hover:text-purple-300">Contact</a></div></nav></div></div></div></div></div><div data-block-id="ebbcab50-06c7-4e0f-9168-9cee16656c42"><div data-block-id="ebbcab50-06c7-4e0f-9168-9cee16656c42"><div><div><div><div><div><div class="bg-white"><div class="relative isolate"><div aria-hidden="true" class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"><div id="iexsa" class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a78bfa] to-[#7c3aed] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div></div><div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 h-[100vh] lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-40"><div class="mx-auto max-w-xl lg:mx-0 lg:flex-shrink-0"><h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">We\'re changing the development work....</h1><p class="mt-6 text-lg leading-8 text-gray-600">Hello world great to see you all this is a test and it\'s working fine. Let\'s goooooooo....!!!!!</p><div class="mt-10 flex items-center gap-x-6"><a href="#" class="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a><a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a></div></div><div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"><div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none"><img src="https://res.cloudinary.com/dtgvvhwbu/image/upload/v1753946239/uploads/1753946234822-Screenshot%20from%202025-07-28%2016-06-36.png.png" alt="App screenshot" width="2432" height="1442" class="w-full max-w-[500px] rounded-2xl bg-white/5 top-5"/></div></div></div></div></div></div></div></div></div></div></div><div data-block-id="850bf1c1-bb86-4f7d-922e-cd4890ebd500"><div data-block-id="850bf1c1-bb86-4f7d-922e-cd4890ebd500"><div><div><div><div><div></div></div></div></div></div></div></div><div data-block-id="850bf1c1-bb86-4f7d-922e-cd4890ebd500"><div><div><div><div><div></div></div></div></div></div></div><section id="about" class="bg-white text-black py-16 px-6"><div class="max-w-3xl mx-auto text-center"><h2 class="text-3xl font-bold mb-4">About Us</h2><p class="text-lg text-gray-700">We are a passionate team dedicated to providing intuitive and powerful website building experiences. With a focus on simplicity and performance, our platform helps you build stunning websites without writing a single line of code.</p></div></section><div data-block-id="8a47f1f5-9415-4b94-ab06-cf96e3235411"><div data-block-id="8a47f1f5-9415-4b94-ab06-cf96e3235411"><div><div><div><div><div><section class="bg-gray-50 font-sans"><div class="container max-w-7xl mx-auto p-4 lg:p-8"><div class="flex flex-col lg:flex-row rounded-lg overflow-hidden bg-white"><div id="ijdnb" class="w-full lg:w-3/5 relative text-white bg-cover bg-center"><div class="absolute inset-0 bg-black opacity-50"></div><div class="relative z-10 flex flex-col justify-center p-8 md:p-16 min-h-[480px] lg:min-h-full"><p class="text-sm font-semibold tracking-wider">OPTIMIZE IT SYSTEMS</p><h1 class="text-4xl md:text-5xl font-light mt-2">Creating a better</h1><h2 class="text-4xl md:text-6xl font-bold mt-1">IT solutions</h2><p class="mt-6 max-w-md text-gray-200">Affixed pretend account ten natural. Need eat week even yet that. Incommode delighted he resolving sportsmen do in listening.</p><a href="#" class="mt-8 bg-white text-black font-semibold py-3 px-8 rounded-md w-fit hover:bg-gray-200 transition-colors">Start Now</a></div></div><div class="w-full lg:w-2/5 p-8 md:p-16 flex flex-col justify-center"><h2 class="text-3xl md:text-4xl font-bold text-gray-800">Visual Editor is Real</h2><ul class="mt-8 space-y-4"><li class="flex items-start"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-gray-600">Now you can customize <span class="font-bold text-gray-800">every single bit</span> of your website with this <span class="font-bold text-gray-800">100% visual</span> editors.</p></li><li class="flex items-start"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-gray-600">Free up your <span class="font-bold text-gray-800">time</span> and unleash your <span class="font-bold text-gray-800">creativity</span>.</p></li><li class="flex items-start"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-gray-600">Speed, Power &amp; Performance.</p></li></ul><a href="#" class="mt-10 bg-blue-500 text-white font-semibold py-3 px-10 rounded-lg w-fit hover:bg-blue-600 transition-colors">BUY NOW</a></div></div></div></section></div></div></div></div></div></div></div><div data-block-id="70e252b8-d7dd-46ec-9741-9fdf0c217665"><div data-block-id="70e252b8-d7dd-46ec-9741-9fdf0c217665"><div><div><div></div></div></div></div></div><div data-block-id="adbc9c82-8471-4bdf-98ed-a41d6861590e"><div data-block-id="adbc9c82-8471-4bdf-98ed-a41d6861590e"><div><div><div><div><footer class="px-4 divide-y dark:bg-gray-100 dark:text-gray-800"><div class="container max-w-7xl flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0"><div class="lg:w-1/3"><a rel="noopener noreferrer" href="#" class="flex justify-center space-x-3 lg:justify-start"><div class="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" class="w-5 h-5"><path d="M18.266 26.068l7.839-7.854...z"></path></svg></div><span class="self-center text-2xl font-semibold">Brand name</span></a></div><div class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4"><div class="space-y-3"><h3 class="tracking-wide uppercase dark:text-gray-900">Product</h3><ul class="space-y-1"><li><a href="#">Features</a></li><li><a href="#">Integrations</a></li><li><a href="#">Pricing</a></li><li><a href="#">FAQ</a></li></ul></div><div class="space-y-3"><h3 class="tracking-wide uppercase dark:text-gray-900">Company</h3><ul class="space-y-1"><li><a href="#">Privacy</a></li><li><a href="#">Terms of Service</a></li></ul></div><div class="space-y-3"><h3 class="uppercase dark:text-gray-900">Developers</h3><ul class="space-y-1"><li><a href="#">Public API</a></li><li><a href="#">Documentation</a></li><li><a href="#">Guides</a></li></ul></div><div class="space-y-3"><div class="uppercase dark:text-gray-900">Social media</div><div class="flex space-x-3"><a href="#" class="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="w-5 h-5"><path d="M32 16c0-8.839-7.167-16-16-16...z"></path></svg></a><a href="#" class="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path d="M23.954 4.569a10 10 0 01-2.825.775...z"></path></svg></a><a href="#" class="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" class="w-5 h-5"><path d="M16 0c-4.349 0-4.891...z"></path></svg></a></div></div></div></div><div class="py-6 text-sm text-center dark:text-gray-600">© 1968 Company Co. All rights reserved.</div></footer></div></div></div></div></div></div></div></body>';
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

  if (error) {
    return <div>Error: Could not load page content. ({error})</div>;
  }

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
