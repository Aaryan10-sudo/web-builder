import React from "react";

const Hero = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Build Your
          <span className="text-gray-400"> Modern Website</span>
          Instantly
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">
          Create, customize, and launch your stunning website with our intuitive
          drag-and-drop builder. No coding required!
        </p>
        <div className="flex flex-wrap justify-center">
          <button className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white text-black hover:bg-gray-200 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 m-2 text-lg border rounded text-white border-white hover:bg-gray-900 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
