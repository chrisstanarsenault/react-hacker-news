import React from "react";

export default function Header() {
  return (
    <header>
      <h1>HackerNews Feed</h1>
      <form>
        <input
          name="search-bar"
          id="search-bar"
          placeholder="Search for a story"
        />
      </form>
    </header>
  );
}
