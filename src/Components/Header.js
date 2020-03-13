import React, { useState } from "react";
import styled from "styled-components";
import { Link, Switch, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Instagram } from "./Iconst";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const SearchBox = styled.div`
  z-index: 2;

  position: fixed;
  background: #ffffff;
  border: 4px solid #46f26e;
  top: 105px;
  left: 41%;
  width: 300px;
  height: 300px;
  &::after {
    z-index: 2;
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 30px;
    margin-left: -30px;
  }
  &::before {
    z-index: 2;
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(70, 242, 110, 0);
    border-bottom-color: #46f26e;
    border-width: 36px;
    margin-left: -36px;
  }
`;
const SearchUI = styled.ul`
  margin-top: 10px;
`;

const SearchLI = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
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

const Router = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LogInHeader /> : null}</Switch>
);

const GET_MY_PROFILE = gql`
  {
    getMyProfile {
      username
    }
  }
`;
const LogInHeader = withRouter(({ history }) => {
  const search = useInput("");
  const [TypeState, setTypeState] = useState(false);
  const { data } = useQuery(GET_MY_PROFILE);

  const onSearchFocus = () => {
    setTypeState(true);
  };
  const onSearchBlur = () => {
    setTypeState(false);
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?query=${search.value}`);
    setTypeState(false);
  };
  return (
    <>
      {TypeState === true && (
        <SearchBox>
          <SearchUI>
            <SearchLI>{search.value}</SearchLI>
          </SearchUI>
        </SearchBox>
      )}
      <Header>
        <HeaderWrapper>
          <HedaerColumn>
            <Link to="/">
              <Instagram />
            </Link>
          </HedaerColumn>
          <HedaerColumn>
            <form
              onSubmit={onSearchSubmit}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
            >
              <SearchInput
                value={search.value}
                onChange={search.onChange}
                placeholder={`검색`}
              />
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
    </>
  );
});

export default withRouter(Router);
