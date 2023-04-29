import React from "react";
import styled from "styled-components";

import img from "../Assets/bg-presentation.jpg";

const CoverImg = () => {
  return (
    <>
      <Cover></Cover>
      <H1> Ultimated Movies, Shows, and more in CineReel ! </H1>
    </>
  );
};

export default CoverImg;

const Cover = styled.div`
  /* position: absolute; */
  top: 0;
  background-image: url(${img});
  min-height: 100vh;
  /* width: 100%; */
  background-size: "cover";
  background-position: "top";
  display: "grid";
  place-items: "center";
`;

const H1 = styled.div`
  width: 800px;
  color: white;
  position: absolute;
  top: 300px;
  left: 100px;
  font-size: 70px;
  font-weight: bold;
  /* text-align: justify;
  text-justify: auto; */
  line-height: 1.6;
`;
