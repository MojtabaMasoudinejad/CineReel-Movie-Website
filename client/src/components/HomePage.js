import { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
// import SliderPoster from "./SliderPoster";
import MovieCard from "./MovieCard";
import Profile from "./Profile";

const HomePage = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);

  return (
    <MainDiv>
      <Profile />
      {/* <SliderPoster /> */}

      {/* <div>
        <button
          onClick={() => {
            setTrDay(true);
            setTrWeek(false);
          }}
        >
          trendingDay
        </button>
        <button
          onClick={() => {
            setTrWeek(true);
            setTrDay(false);
          }}
        >
          trendingWeek
        </button>
      </div>
      {trDay &&
        trendingDay.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
      {trWeek &&
        trendingWeek.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })} */}
    </MainDiv>
  );
};

export default HomePage;

const MainDiv = styled.div`
  margin: 20px 20px;
`;
