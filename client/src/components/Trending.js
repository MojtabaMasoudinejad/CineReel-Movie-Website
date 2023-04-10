import { useState, useContext } from "react";
import styled from "styled-components";

import MovieCard from "./MovieCard";
import { UserContext } from "../UserContext";

export const Trending = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);
  const [leftActive, setLeftActive] = useState(true);

  return (
    <div>
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
    </div>
  );
};

export default Trending;

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
