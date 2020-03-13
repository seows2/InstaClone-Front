import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post/index";

const GET_FEED = gql`
  {
    getFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export default () => {
  const { data, loading } = useQuery(GET_FEED);
  return (
    <Wrapper>
      <Helmet>
        <title>InstaClone</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.getFeed &&
        data.getFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            location={post.location}
            caption={post.caption}
          />
        ))}
    </Wrapper>
  );
};
