import React, { useState, useEffect } from "react";

import AllStoriesContainer from "./AllStoriesContainer";
import Header from "./Header";

function App() {
  const [currentStories, setCurrentStories] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  const searchStoryFromInput = async (e, input) => {
    e.preventDefault();
    setCurrentStories({});
    setIsLoading(true);
    await fetch(
      `http://hn.algolia.com/api/v1/search?query=${input}&page=${pageNum}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentStories(data);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const getFrontPageData = async () => {
      await fetch(
        `http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNum}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.hits);
          setIsLoading(false);
          setCurrentStories(data);
        });
    };
    setTimeout(() => {
      getFrontPageData();
    }, 1500);
  }, []);

  return (
    <main className="bg-yellow-100 w-screen h-full relative">
      <Header getInput={searchStoryFromInput} />
      {isLoading && (
        <h1 className="absolute top-1/2 left-1/2 text-3xl bold transform -translate-x-1/2 -translate-y-1/2">
          Loading Stories.....
        </h1>
      )}
      {Object.keys(currentStories.length !== 0) && !isLoading && (
        <AllStoriesContainer stories={currentStories} />
      )}
    </main>
  );
}

export default App;
