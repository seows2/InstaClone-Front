import React, { useState, useMemo } from "react";
import PropType from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  location,
  caption
}) => {
  const [likeState, setLikeState] = useState(isLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [targetIndex, setTargetIndex] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const newComment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation, { loading }] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: newComment.value }
  });
  const totalFiles = useMemo(() => files.length, [files]);
  const isLeftEnd = !targetIndex;
  const isRightEnd = targetIndex === totalFiles - 1;

  const showNext = () => !isRightEnd && setTargetIndex(targetIndex + 1);
  const showPrev = () => !isLeftEnd && setTargetIndex(targetIndex - 1);

  const getFormatData = date => {
    const month = date.substr(5, 2);
    const day = date.substr(8, 2);
    return month + "월 " + day + "일";
  };
  createdAt = getFormatData(createdAt);

  const toggleLike = async () => {
    if (likeState === true) {
      setLikeState(false);
      setLikeCountState(likeCountState - 1);
    } else {
      setLikeState(true);
      setLikeCountState(likeCountState + 1);
    }
    await toggleLikeMutation();
  };

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        newComment.setValue("");
        setSelfComments([...selfComments, addComment]);
      } catch (error) {
        toast.error("(댓글)서버 요청에 실패했습니다.");
      }
    }
    return;
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={likeState}
      comments={comments}
      createdAt={createdAt}
      newComment={newComment}
      setLikeState={setLikeState}
      setLikeCountState={setLikeCountState}
      location={location}
      caption={caption}
      targetIndex={targetIndex}
      showPrev={showPrev}
      showNext={showNext}
      isLeftEnd={isLeftEnd}
      isRightEnd={isRightEnd}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      loading={loading}
    />
  );
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
  createdAt: PropType.string.isRequired,
  location: PropType.string,
  caption: PropType.string.isRequired
};

export default PostContainer;
