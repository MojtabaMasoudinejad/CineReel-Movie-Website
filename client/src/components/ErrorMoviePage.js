import React from "react";
import image from "../Assets/errorPic04.png";
import styled from "styled-components";

const ErrorMoviePage = () => {
  return (
    <div>
      <MainDiv></MainDiv>

      <MessageDiv>
        There is an error while trying to load page from API
      </MessageDiv>
    </div>
  );
};

export default ErrorMoviePage;

const MainDiv = styled.div`
  background-image: url(${image});
  height: 92vh;
  width: 98.9vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 1200px;
  padding-top: 70px;

  /* filter: brightness(0.5); */
`;

const MessageDiv = styled.div`
  /* color: white; */
  position: absolute;

  top: 400px;
  left: 400px;
`;
