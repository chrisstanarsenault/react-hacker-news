import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from "react";

import AllStoriesContainer from "./AllStoriesContainer";
import Header from "./Header";

function App() {
  const [currentStories, setCurrentStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const storyReducer = (state, action) => {};

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        console.log(state.page);
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  const searchStoryFromInput = async (e, input) => {
    e.preventDefault();
    setCurrentStories([]);
    setIsLoading(true);
    await fetch(
      `http://hn.algolia.com/api/v1/search?query=${input}&page=${pager.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentStories([...currentStories, ...data.hits]);
        setMaxPages(data.nbPages - 1);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          console.log(pager.page);
          if (en.intersectionRatio > 0 && pager.page < maxPages) {
            console.log("load more");
            pagerDispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [pagerDispatch, maxPages]
  );

  useEffect(() => {
    const getFrontPageData = async (page) => {
      await fetch(
        `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMaxPages(data.nbPages - 1);
          setIsLoading(false);
          setCurrentStories([...currentStories, ...data.hits]);
        });
    };
    setTimeout(() => {
      getFrontPageData(pager.page);
    }, 1500);
  }, [pager.page]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef, isLoading]);

  return (
    <main className="bg-yellow-100 w-screen h-full relative">
      <Header getInput={searchStoryFromInput} />
      {isLoading && (
        <h1 className="absolute top-1/2 left-1/2 text-3xl bold transform -translate-x-1/2 -translate-y-1/2">
          Loading Stories.....
        </h1>
      )}
      {Object.keys(currentStories.length !== 0) && !isLoading && (
        <AllStoriesContainer
          stories={currentStories}
          testRef={bottomBoundaryRef}
        />
      )}
    </main>
  );
}

export default App;
