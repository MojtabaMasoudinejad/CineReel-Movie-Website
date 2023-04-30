import { useContext, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../UserContext";

import MovieCard from "../components/MovieCard";

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const CoverTrendings = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);
  const [leftActive, setLeftActive] = useState(true);
  // const [arrowDisable, setArrowDisable] = useState(true);

  // const elementRef = useRef(null);

  // const handleHorizantalScroll = (element, speed, distance, step) => {
  //   let scrollAmount = 0;
  //   const slideTimer = setInterval(() => {
  //     element.scrollLeft += step;
  //     scrollAmount += Math.abs(step);
  //     if (scrollAmount >= distance) {
  //       clearInterval(slideTimer);
  //     }
  //     if (element.scrollLeft === 0) {
  //       setArrowDisable(true);
  //     } else {
  //       setArrowDisable(false);
  //     }
  //   }, speed);
  // };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 218;
    console.log("slider", slider.scrollLeft);
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 218;
  };

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
      <div style={{ display: "flex" }}>
        <div
          id="slider"
          style={{
            display: "flex",
            overflow: "auto",
            overflowX: "hidden",
            width: "70vw",
            height: "360px",
          }}
        >
          {trDay &&
            trendingDay.map((specificMovie, index) => {
              return <MovieCard key={index} specificMovie={specificMovie} />;
            })}
          {trWeek &&
            trendingWeek.map((specificMovie, index) => {
              return <MovieCard key={index} specificMovie={specificMovie} />;
            })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "30px",
          }}
        >
          <hr
            align="left"
            style={{ width: "70px", marginLeft: " 10px", opacity: "0.5" }}
          />
          <Title>TRENDING MOVIES</Title>

          <div>
            <SlArrowLeft
              size="50"
              onMouseOver={({ target }) => (target.style.color = "#2d3436")}
              onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
              color="#b2bec3"
              onClick={() => slideLeft()}
              style={{
                cursor: "pointer",
                top: "40%",
                right: "182px",
                zIndex: "10",
                userSelect: "none",
              }}
            />
            <SlArrowRight
              size="50"
              onMouseOver={({ target }) => (target.style.color = "#2d3436")}
              onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
              color="#b2bec3"
              onClick={() => slideRight()}
              style={{
                cursor: "pointer",
                top: "40%",
                right: "132px",
                zIndex: "10",
                userSelect: "none",
              }}
            />
          </div>
          <hr
            align="left"
            style={{
              marginLeft: " 10px",
              marginRight: "10px",
              opacity: "0.5",
            }}
          />
          <div>
            <Link to={"/allMovies"} style={{ textDecoration: "none" }}>
              <ViewallDiv> VIEW ALL</ViewallDiv>
            </Link>
          </div>
        </div>
      </div>
    </MainDiv>
  );
};

export default CoverTrendings;

const MainDiv = styled.div`
  height: 500px;
  margin: 0 60px;

  position: relative;
`;

const ButtonBox = styled.div`
  display: flex;
  margin: 20px 0;
  position: relative;
  background: white;
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
`;

const ViewallDiv = styled.div`
  font-size: 22px;
  width: 200px;
  margin-left: 10px;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

const Title = styled.p`
  /* font-family: "Montserrat", "Open Sans", sans-serif; */
  font-size: 35px;
  text-align: left;
  width: 200px;
  margin: 40px 20px;
`;
