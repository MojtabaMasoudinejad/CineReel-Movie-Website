import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../UserContext";

import MovieCard from "../components/MovieCard";

const CoverTrendings = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);
  const [leftActive, setLeftActive] = useState(true);

  return (
    <MainDiv>
      <ButtonBox style={{ marginTop: "20px" }}>
        {/* <BtnDiv style={{ left: leftActive ? "0" : "110px" }}></BtnDiv> */}
        <Button
          style={{
            color: leftActive ? "#74b9ff" : "",
            fontWeight: leftActive ? "bold" : "",
          }}
          onClick={(e) => {
            setTrDay(true);
            setTrWeek(false);
            setLeftActive(true);
          }}
        >
          Day-Trending
        </Button>
        <Button
          style={{
            color: !leftActive ? "#74b9ff" : "",
            fontWeight: !leftActive ? "bold" : "",
          }}
          onClick={() => {
            setTrWeek(true);
            setTrDay(false);
            setLeftActive(false);
          }}
        >
          Week-Trending
        </Button>
      </ButtonBox>
      <div>
        {trDay &&
          trendingDay.slice(0, 7).map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
        {trWeek &&
          trendingWeek.slice(0, 7).map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
        <AllLink to={"/trending"}>VIEW ALL</AllLink>
      </div>
    </MainDiv>
  );
};

export default CoverTrendings;

const MainDiv = styled.div`
  /* width: 100vw; */
  /* display: flex; */
  margin: 0 60px;
  margin-bottom: 60px;
  border: solid red 5px;
  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  /* width: 400px; */
  margin: 20px 0;
  position: relative;
  background: white;
  border: solid blue 5px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  text-align: center;
  border: solid green 5px;
`;

const AllLink = styled(NavLink)`
  /* color: #b2bec3; */
  font-size: 22px;
  margin: 130px 50px;
  position: absolute;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
