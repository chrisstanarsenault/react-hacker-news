import React from "react";

import Story from "./Story";

export default function AllStoriesContainer(props) {
  const { stories } = props;
  return (
    <section>
      {Object.keys(stories).length !== 0 &&
        stories.hits.map((story) => (
          <Story key={story.objectID} story={story} />
        ))}
    </section>
  );
}
