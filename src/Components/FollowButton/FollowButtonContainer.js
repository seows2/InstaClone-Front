import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_FOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingState, setIsFoloowingState] = useState(isFollowing);
  const [toggleFollowMutation, { loading }] = useMutation(TOGGLE_FOLLOW, {
    variables: { id }
  });

  const onClick = async () => {
    if (isFollowingState === true) {
      try {
        await toggleFollowMutation();
        setIsFoloowingState(false);
      } catch (error) {
        toast.error("서버 요청에 실패했습니다.");
      }
    } else {
      try {
        await toggleFollowMutation();
        setIsFoloowingState(true);
      } catch (error) {
        toast.error("서버 요청에 실패했습니다.");
      }
    }
  };

  return (
    <FollowButtonPresenter
      onClick={onClick}
      isFollowing={isFollowingState}
      loading={loading}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
