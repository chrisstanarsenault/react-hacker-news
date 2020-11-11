import React from "react";

export default function Stories(props) {
  const regEx = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www.)?([^:/?\n]+)/gim;
  return (
    <article>
      <a href={props.story.url}>
        <p>{props.story.title}</p>
      </a>
      <span>({props.story.url.match(regEx)})</span>
    </article>
  );
}
