import React, { useState } from "react";
import PropType from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt
}) => {
  return <PostPresenter />;
};

PostContainer.prototype = {
  id: PropType.string.isRequired,
  user: PropType.shape({
    id: PropType.string.isRequired,
    avatar: PropType.string,
    username: PropType.string.isRequired
  }).isRequired,
  files: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      file: PropType.string.isRequired
    })
  ).isRequired,
  likeCount: PropType.number.isRequired,
  isLiked: PropType.bool.isRequired,
  comments: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      text: PropType.string.isRequired,
      user: PropType.shape({
        id: PropType.string.isRequired,
        username: PropType.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropType.string.isRequired
};

export default PostContainer;
