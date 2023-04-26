import { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import SliderPoster from "./SliderPoster";

import MovieCard from "./MovieCard";
import Profile from "./Profile";
import Comments from "../Comments/Comments";
import SearchBar from "./SearchBar";
import Footer from "../footer/Footer";
// import AvatarProfile from "../AvatarProfile";

const HomePage = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);
  const [leftActive, setLeftActive] = useState(true);

  return (
    <MainDiv>
      {/* <AvatarProfile /> */}
      <SearchBar />
      <DivSlidePoster>
        <SliderPoster />
      </DivSlidePoster>

      <ButtonBox style={{ marginTop: "20px" }}>
        <BtnDiv style={{ left: leftActive ? "0" : "110px" }}></BtnDiv>
        <Button
          onClick={(e) => {
            setTrDay(true);
            setTrWeek(false);
            setLeftActive(true);
          }}
        >
          trendingDay
        </Button>
        <Button
          onClick={() => {
            setTrWeek(true);
            setTrDay(false);
            setLeftActive(false);
          }}
        >
          trendingWeek
        </Button>
      </ButtonBox>
      {trDay &&
        trendingDay.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
      {trWeek &&
        trendingWeek.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
      <Footer />
    </MainDiv>
  );
};

export default HomePage;

const MainDiv = styled.div`
  margin: 20px 20px;
`;

const DivSlidePoster = styled.div`
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 220px;
  /* margin: 35px auto; */
  margin: 20px 0;
  position: relative;
  border-radius: 30px;
  background: white;
  border: 1px solid black;
`;
const BtnDiv = styled.div`
  left: 0;
  top: 0;
  position: absolute;
  width: 110px;
  height: 100%;
  background: #74b9ff;
  border-radius: 30px;
  transition: 0.5s;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  text-align: center;
`;
