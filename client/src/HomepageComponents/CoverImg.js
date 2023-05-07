import React from "react";
import styled from "styled-components";

import img from "../Assets/bg-presentation.jpg";

const CoverImg = () => {
  return (
    <>
      <Cover></Cover>
      <H1> Unlimited Movies, Shows, and more in CineReel ! </H1>
    </>
  );
};

export default CoverImg;

const Cover = styled.div`
  top: 0;
  background-image: url(${img});
  height: 100vh;
  background-size: "cover";
  background-position: "top";
  display: "grid";
  place-items: "center";
`;

const H1 = styled.div`
  width: 800px;
  color: white;
  position: absolute;
  top: 35vh;
  left: 10vw;
  font-size: 70px;
  font-weight: bold;
  line-height: 1.6;
`;
