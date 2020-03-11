import React from "react";
import styled from "styled-components";
import { Link, Switch, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Instagram } from "./Iconst";
import { useQuery } from "@apollo/react-hooks";

const Header = styled.header`
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: center;
`;

const HedaerColumn = styled.div`
  width: 100%;
  height: 25px;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  height: auto;
  text-align: center;
  width: 75%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 300;
  }
  &:focus {
    text-align: left;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const GET_MY_PROFILE = gql`
  {
    getMyProfile {
      username
    }
  }
`;

const Router = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LogInHeader /> : null}</Switch>
);

const LogInHeader = withRouter(({ history }) => {
  const search = useInput("");
  const { data, loading } = useQuery(GET_MY_PROFILE);

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?query=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HedaerColumn>
          <Link to="/">
            <Instagram />
          </Link>
        </HedaerColumn>
        <HedaerColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput {...search} placeholder={`검색`} />
          </form>
        </HedaerColumn>
        <HedaerColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notification">
            <HeartEmpty />
          </HeaderLink>
          <HeaderLink
            to={
              data && data.getMyProfile
                ? `/${data.getMyProfile.username}`
                : "/#"
            }
          >
            <User />
          </HeaderLink>
        </HedaerColumn>
      </HeaderWrapper>
    </Header>
  );
});

export default withRouter(Router);
