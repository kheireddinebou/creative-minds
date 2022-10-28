import React from "react";
import { auth } from "../utils/firebase";
import { format } from "timeago.js";

const Post = ({ children, post }) => {
  const { description, author, date, comments } = post;

  return (
    <div className="px-2 py-4 d-flex flex-column  border-bottom">
      <div className="d-flex align-items-center justify">
        <img
          src={author.photoURL}
          alt={author.displayName}
          className="avatar"
        />
        <span className="fw-semibold fs-5 ms-2">{author.displayName}</span>
        <span className="text-muted ms-2">{format(date.seconds * 1000)}</span>
      </div>

      <span className="fs-5 mt-4">{description}</span>


      {/* <span>{comments?.lenght}</span> */}

      {children}
    </div>
  );
};

export default Post;
