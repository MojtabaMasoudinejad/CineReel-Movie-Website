import { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import SliderPoster from "./SliderPoster";

const HomePage = () => {
  const { trendingDay } = useContext(UserContext);

  return (
    <MainDiv>
      <SliderPoster />
    </MainDiv>
  );
};

export default HomePage;

const MainDiv = styled.div`
  margin: 20px 20px;
`;
