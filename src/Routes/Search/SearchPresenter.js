import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BoldText from "../../Components/BoldText";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 90vh;
  position: relative;
  top: 100px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 180px);
  grid-template-rows: 180px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 260px);
  grid-template-rows: 260px;
`;

const override = css`
  display: block;
  margin: 0 auto;
`;

const SearchPresenter = ({ term, loading, data }) => {
  if (term === undefined) {
    return (
      <Wrapper>
        <BoldText text={"검색 결과가 없습니다."} />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <HashLoader css={override} size={50} color={"black"} />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <BoldText text={"유저 검색 결과가 없습니다."} />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isMe={user.isMe}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <BoldText text={"게시물 검색 결과가 없습니다."} />
          ) : (
            data.searchPost.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchQuery: PropTypes.string
};

export default SearchPresenter;
