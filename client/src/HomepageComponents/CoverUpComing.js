import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

import MovieCard from "../components/MovieCard";

const CoverUpComing = () => {
  const {
    upcomingMovies,
    setAllIsTopRated,
    setAllIsDayTr,
    setAllIsWeekTr,
    setAllIsUpcoming,
  } = useContext(UserContext);

  return (
    <MainDiv>
      <ButtonDiv>
        <hr
          align="left"
          style={{ width: "70px", marginLeft: " 10px", opacity: "0.5" }}
        />
        <Title>UPCOMMING MOVIES</Title>
        <hr
          align="left"
          style={{
            marginLeft: " 10px",
            marginRight: "10px",
            opacity: "0.5",
          }}
        />
        <Link
          to={"/allMovies"}
          onClick={() => {
            setAllIsTopRated(false);
            setAllIsDayTr(false);
            setAllIsWeekTr(false);
            setAllIsUpcoming(true);
          }}
        >
          <ViewDiv>VIEW ALL</ViewDiv>
        </Link>
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
  /* position: relative; */
  background-color: rgba(6, 4, 26, 1);
`;

const ViewDiv = styled.div`
  color: white;
  border: none;
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
  margin: 40px 60px;
`;

const Title = styled.p`
  color: white;
  font-size: 35px;
  text-align: left;
  width: 200px;
  margin: 40px 20px;
`;

const MovieDiv = styled.div`
  margin: 40px 30px;
  display: flex;
  flex-wrap: wrap;
`;
