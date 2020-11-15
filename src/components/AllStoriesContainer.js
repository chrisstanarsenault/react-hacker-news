import React from "react";

import Story from "./Story";

export default function AllStoriesContainer(props) {
  const { stories, testRef } = props;

  return (
    <section className="flex flex-col">
      {Object.keys(stories).length !== 0 &&
        stories.map((story) => <Story key={story.objectID} story={story} />)}
      <div className="border-t-2 border-red-400" ref={testRef}></div>
    </section>
  );
}
