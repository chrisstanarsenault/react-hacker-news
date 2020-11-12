import React from "react";

export default function Header() {
  return (
    <header className="bg-orange-500 flex flex-col lg:flex-row lg:justify-around items-center p-2 w-screen">
      <h1 className="text-2xl text-center font-bold mb-1">HackerNews Feed</h1>
      <form className="flex justify-center lg:justify-end py-2 w-full lg:w-1/5">
        <input
          name="search-bar"
          id="search-bar"
          placeholder="Search for a story"
          className="rounded border border-black px-2 py-1 w-3/4 lg:w-full relative lg:left-7"
        />
        <button className="relative left-1 xs:left-2 lg:left-9">
          <i className="fas fa-search fa-lg"></i>
        </button>
      </form>
    </header>
  );
}
