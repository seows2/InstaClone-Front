import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import BoldText from "./BoldText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton/FollowButtonContainer";

const Card = styled.div`
  ${props => props.theme.whiteBox};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CardAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const CardLink = styled(Link)`
  color: inherit;
  margin-bottom: 30px;
`;

const UserCard = ({ id, username, isFollowing, url, isMe }) => (
  <Card>
    <CardAvatar url={url} size={"md"} />
    <CardLink to={`/${username}`}>
      <BoldText text={username} />
    </CardLink>
    {!isMe && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string,
  isMe: PropTypes.bool.isRequired
};

export default UserCard;
