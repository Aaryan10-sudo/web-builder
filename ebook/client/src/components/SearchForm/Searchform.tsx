"use client";

const categories = ["Mockups", "Templates", "Design", "Logos"];

export default function SearchForm() {
  return (
    <form className="w-full max-w-xl mx-auto">
      <div className="flex h-[56px] text-base relative group">
        {/* Dropdown Wrapper (hover trigger) */}
        <div className="relative z-20">
          <button
            type="button"
            className="h-12 inline-flex items-center px-5 text-base text-gray-900 bg-gray-100  rounded-s-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none whitespace-nowrap"
          >
            All categories
            <svg
              className="w-3 h-3 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Hover Dropdown */}
          <div className="absolute -translate-y-2 hidden group-hover:block mt-1 bg-white  p-4  border-gray-200 rounded-lg shadow-xl w-48">
            <ul className="py-2 text-sm text-gray-700">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-sm"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Search Input and Submit Button */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block w-full h-12 px-5 text-base text-gray-900 bg-gray-50 rounded-r-2xl rounded-l-0  focus:ring-[#249351] focus:border-[#249351]"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-12 px-5 text-base font-medium text-white bg-[#249351] rounded-e-lg border border-[#249351] hover:bg-blue-800 focus:ring-2 focus:ring-blue-300"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
