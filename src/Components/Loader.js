import React from "react";
import styled, { keyframes } from "styled-components";
import { Instagram } from "./Iconst";

const Animation = keyframes`
  0%{
    opacity:0
  }
  50%{
    opacity:0.7
  }
  100%{
    opacity:0
  }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  position: fixed;
  top: 100px;
`;

export default () => (
  <Loader>
    <Instagram size={40} />
  </Loader>
);
