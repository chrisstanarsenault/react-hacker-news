import React from "react";

import Story from "./Story";

export default function AllStoriesContainer(props) {
  const { stories, boundaryRef } = props;

  return (
    <section className="flex flex-col">
      {Object.keys(stories).length !== 0 &&
        stories.map((story) => <Story key={story.objectID} story={story} />)}
      <div ref={boundaryRef}></div>
    </section>
  );
}
