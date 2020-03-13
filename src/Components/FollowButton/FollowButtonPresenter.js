import React from "react";
import Button from "../Button";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/core";

const override = css`
  width: 100%;
  border: 0;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  background-color: #3897f0;
  padding: 8px 0px;
`;

export default ({ isFollowing, onClick, loading }) => {
  return loading ? (
    <PulseLoader css={override} size={5} color={"white"} />
  ) : (
    <Button text={isFollowing ? "언팔로우" : "팔로우"} onClick={onClick} />
  );
};
