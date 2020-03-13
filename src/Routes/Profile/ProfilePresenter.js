import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Avatar from "../../Components/Avatar";
import BoldText from "../../Components/BoldText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 90vh;
  position: relative;
  top: 100px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 28px;
  display: block;
  margin-right: 10px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 18px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(BoldText)`
  font-size: 18px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;
const override = css`
  display: block;
  margin: 0 auto;
`;

export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <HashLoader css={override} size={50} color={"black"} />
      </Wrapper>
    );
  } else if (!loading && data && data.getProfile) {
    const {
      getProfile: {
        id,
        avatar,
        username,
        name,
        isFollowing,
        isMe,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>InstaClone</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {isMe ? (
                <Button text={"로그아웃"} onClick={logOut} />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                게시물 <BoldText text={String(postsCount)} />
              </Count>
              <Count>
                팔로워 <BoldText text={String(followersCount)} />
              </Count>
              <Count>
                팔로우 <BoldText text={String(followingCount)} />
              </Count>
            </Counts>
            <FullName text={name} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
