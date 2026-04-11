// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative max-w-md w-full mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full py-2 px-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring focus:ring-red-800"
      />
      {/* Add a dropdown or results if needed */}
    </div>
  );
};

export default SearchBar;
