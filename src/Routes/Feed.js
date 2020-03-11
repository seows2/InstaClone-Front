import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import Post from "./Post";

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
  min-height: 90vh;
`;

export default () => {
  const { data, loading } = useQuery(GET_FEED);
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.getFeed &&
        data.getFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            file={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.cretedAt}
          />
        ))}
    </Wrapper>
  );
};
