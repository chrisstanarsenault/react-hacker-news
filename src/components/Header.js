import React from "react";

export default function Header() {
  return (
    <header className="bg-orange-500 flex flex-col items-center p-2 w-screen">
      <h1 className="text-2xl text-center font-bold mb-1">HackerNews Feed</h1>
      <form className="flex justify-between w-full">
        <input
          name="search-bar"
          id="search-bar"
          placeholder="Search for a story"
          className="rounded px-2 py-1 w-full mr-4"
        />
        <button>
          <i className="fas fa-search fa-lg"></i>
        </button>
      </form>
    </header>
  );
}
