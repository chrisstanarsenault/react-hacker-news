import React, { useState, useEffect } from "react";

import AllStoriesContainer from "./AllStoriesContainer";
import Header from "./Header";

function App() {
  const [currentStories, setCurrentStories] = useState({});

  useEffect(() => {
    fetch("http://hn.algolia.com/api/v1/search?tags=front_page")
      .then((res) => res.json())
      .then((data) => setCurrentStories(data));
  }, []);

  return (
    <main className="bg-yellow-100">
      <Header />
      {Object.keys(currentStories.length !== 0) && (
        <AllStoriesContainer stories={currentStories} />
      )}
    </main>
  );
}

export default App;
