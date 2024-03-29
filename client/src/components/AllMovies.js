import React, { useState, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";

import MovieCard from "./MovieCard";

const AllMovies = () => {
  const {
    trendingDay,
    trendingWeek,
    topRated,
    upcomingMovies,
    allIsTopRated,
    allIsDayTr,
    allIsWeekTr,
    allIsUpcoming,
  } = useContext(UserContext);

  const [isTopRated, setIsTopRated] = useState(allIsTopRated);
  const [isWeek, setIsWeek] = useState(allIsWeekTr);
  const [isDay, setIsDay] = useState(allIsDayTr);
  const [isUpComing, setIsUpComing] = useState(allIsUpcoming);

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <MainDiv>
      <SideBar>
        <ItemMainDiv
          onClick={() => {
            setIsTopRated(true);
            setIsWeek(false);
            setIsDay(false);
            setIsUpComing(false);
          }}
        >
          <Item
            style={{
              color: isTopRated ? "black" : "",
              fontWeight: isTopRated ? "800" : "",
            }}
          >
            Top Rated
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsTopRated(false);
            setIsWeek(false);
            setIsDay(true);
            setIsUpComing(false);
          }}
        >
          <Item
            style={{
              color: isDay ? "black" : "",
              fontWeight: isDay ? "800" : "",
            }}
          >
            Day Trending
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsTopRated(false);
            setIsWeek(true);
            setIsDay(false);
            setIsUpComing(false);
          }}
        >
          <Item
            style={{
              color: isWeek ? "black" : "",
              fontWeight: isWeek ? "800" : "",
            }}
          >
            Week Trending
          </Item>
        </ItemMainDiv>

        <ItemMainDiv
          onClick={() => {
            setIsTopRated(false);
            setIsWeek(false);
            setIsDay(false);
            setIsUpComing(true);
          }}
        >
          <Item
            style={{
              color: isUpComing ? "black" : "",
              fontWeight: isUpComing ? "800" : "",
            }}
          >
            UpComing
          </Item>
        </ItemMainDiv>
      </SideBar>
      <div style={{ width: "90vw" }}>
        {isTopRated &&
          topRated.map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
        {isDay &&
          trendingDay.map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
        {isWeek &&
          trendingWeek.map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
        {isUpComing &&
          upcomingMovies.map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
      </div>
    </MainDiv>
  );
};

export default AllMovies;

const MainDiv = styled.div`
  display: flex;
  padding-top: 70px;
`;

const SideBar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: rgb(26 66 106 / 93%);
  padding: 20px;
`;

const ItemMainDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(26 66 106 / 60%);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  color: white;
  margin: 20px 10px;
`;
