import { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

import MovieCard from "../components/MovieCard";

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const CoverUpComing = () => {
  const { upcomingMovies } = useContext(UserContext);

  //   const [trDay, setTrDay] = useState(true);
  //   const [trWeek, setTrWeek] = useState(false);
  // const [leftActive, setLeftActive] = useState(true);

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
      <ButtonDiv>
        <hr
          align="left"
          style={{ width: "70px", marginLeft: " 10px", opacity: "0.5" }}
        />
        <Title>UPCOMMING MOVIES</Title>
        {/* <div style={{ marginLeft: "50px" }}>
          <SlArrowLeft
            size="50"
            onMouseOver={({ target }) => (target.style.color = "#2d3436")}
            onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
            color="#b2bec3"
            // color="red"
            onClick={() => slideLeft()}
            style={{
              cursor: "pointer",
              // position: "absolute",
              //   top: "40%",
              //   left: "152px",
              zIndex: "10",
              userSelect: "none",
            }}
          />
          <SlArrowRight
            size="50"
            onMouseOver={({ target }) => (target.style.color = "#2d3436")}
            onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
            color="#b2bec3"
            // color="red"
            onClick={() => slideRight()}
            style={{
              cursor: "pointer",
              // position: "absolute",
              //   top: "40%",
              //   left: "252px",
              zIndex: "10",
              userSelect: "none",
            }}
          />
        </div> */}
        <hr
          align="left"
          style={{
            marginLeft: " 10px",
            marginRight: "10px",
            opacity: "0.5",
          }}
        />
        <Link to={"/trending"}>
          <ViewDiv>VIEW ALL</ViewDiv>
        </Link>
        {/* <AllLink to={"/trending"}>VIEW ALL</AllLink> */}
      </ButtonDiv>
      <MovieDiv id="slider">
        {upcomingMovies.slice(0, 7).map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
      </MovieDiv>
    </MainDiv>
  );
};

export default CoverUpComing;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 500px;
  /* margin: 40px 60px; */
  /* margin-bottom: 60px; */
  /* border: solid red 5px; */
  position: relative;
  background-color: rgba(6, 4, 26, 1);
`;

const AllLink = styled(NavLink)`
  color: red;
  font-size: 22px;
  width: 200px;
  /* margin: 220px 150px; */
  position: absolute;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

const ViewDiv = styled.div`
  /* background-color: #0984e3; */
  color: white;
  border: none;
  /* text-decoration: none; */
  /* border-radius: 5%; */
  /* font-weight: bold; */
  cursor: pointer;
  opacity: 0.8;
  margin: 10px 10px;
  &:hover {
    opacity: 1;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin: 40px 60px;
`;

const Title = styled.p`
  /* font-family: "Montserrat", "Open Sans", sans-serif; */
  color: white;
  font-size: 35px;
  /* font-weight: bold; */
  text-align: left;
  width: 200px;
  margin: 40px 20px;
`;

const MovieDiv = styled.div`
  margin: 40px 60px;
  display: flex;
  /* overflow: auto; */
  // overflowX: "hidden",
  width: 80vw;
  height: 360px;
`;
