import React from "react";
import moment from "moment";

export default function Stories(props) {
  const regEx = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www.)?([^:/?\n]+)/gim;
  return (
    <article className="p-2 border-t border-black md:border-gray-800">
      <div className="flex flex-wrap">
        <a href={props.story.url}>
          <span className="mr-1 shadow-inner bg-opacity-0">
            {props.story.title}
          </span>
          <span className="text-xs text-gray-600">
            ({props.story.url.match(regEx)})
          </span>
        </a>
      </div>
      <div className="flex flex-wrap w-full text-xs">
        <span className="border-r border-gray-500 pr-1">
          Author: {props.story.author}
        </span>

        <span className="border-r border-gray-500 px-1">
          Points: {props.story.points}
        </span>

        <span className="border-r border-gray-500 px-1">
          Comments: {props.story.num_comments}
        </span>

        <span className="border-gray-500 px-1">
          {moment(props.story.created_at).format("ll")}
        </span>
      </div>
    </article>
  );
}
