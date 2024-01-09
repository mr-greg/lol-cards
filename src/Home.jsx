// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";
import Example from "./components/Example/Example";

const StyledHome = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -150%);
  h1 {
    font-family: "Roboto";
    text-align: center;
  }
`;

function Home() {
  return (
    <StyledHome>
      <h1>Hello World.</h1>
      <Example />
    </StyledHome>
  );
}

export default Home;
