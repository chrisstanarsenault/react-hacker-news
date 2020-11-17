// ToDo: fix infinite scroll so it respects being the final page and not make calls
// ToDo: see why when searching a topic, it loads multiple pages in one call
// ToDo: link author and bring up stories they have written
// ToDo: link comments and bring up comments for related story

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

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        console.log(state);
        setCurrentPage((x) => x + 1);
        return { ...state, page: state.page + 1, maxPages: maxPages };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, {
    page: 0,
  });

  const searchStoryFromInput = async (e, input) => {
    e.preventDefault();
    setCurrentStories([]);
    // setIsLoading(true);
    await fetch(
      `http://hn.algolia.com/api/v1/search?query=${input}&page=${pager.page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentStories([...currentStories, ...data.hits]);
        setMaxPages(data.nbPages - 1);
      });
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1500);
  };

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            pagerDispatch({ type: "ADVANCE_PAGE" });
          }
          if (currentPage === maxPages - 1) {
            console.log("hi");
          }
        });
      }).observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagerDispatch]
  );

  useEffect(() => {
    const getFrontPageData = async (page) => {
      setIsLoading(true);
      await fetch(
        `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}&hitsPerPage=10`
      )
        .then((res) => res.json())
        .then((data) => {
          setMaxPages(data.nbPages - 1);
          setCurrentStories((current) => [...current, ...data.hits]);
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        });
    };

    getFrontPageData(pager.page);
  }, [pager.page]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <main className="bg-yellow-100 w-screen min-h-screen relative">
      <Header getInput={searchStoryFromInput} />
      <h1
        className={`top-1/2 left-1/2 text-3xl bold transform -translate-x-1/2 -translate-y-1/2 ${
          isLoading ? "block" : "hidden"
        } bg-white h-64 w-1/2 flex justify-center items-center p-4 border border-black fixed`}
      >
        {currentPage === 0
          ? "Loading stories....."
          : "Loading more stories....."}
      </h1>
      {Object.keys(currentStories.length !== 0) && (
        <AllStoriesContainer
          stories={currentStories}
          boundaryRef={bottomBoundaryRef}
        />
      )}
    </main>
  );
}

export default App;
