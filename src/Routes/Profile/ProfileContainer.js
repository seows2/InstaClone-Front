import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { withRouter } from "react-router-dom";

const GET_USER = gql`
  query getProfile($username: String!) {
    getProfile(username: $username) {
      id
      avatar
      username
      name
      isFollowing
      isMe
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username }
    }
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
  }
);
