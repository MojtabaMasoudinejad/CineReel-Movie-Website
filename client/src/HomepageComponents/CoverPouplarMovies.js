import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../UserContext";

import MovieCard from "../components/MovieCard";

const CoverPouplarMovies = () => {
  const {
    topRated,
    setAllIsTopRated,
    setAllIsDayTr,
    setAllIsWeekTr,
    setAllIsUpcoming,
  } = useContext(UserContext);

  return (
    <MainDiv>
      <ContainerDiv>
        <hr
          align="left"
          style={{ width: "70px", marginLeft: " 10px", opacity: "0.5" }}
        />
        <Title>Popular Movies to Watch Now</Title>
        <hr
          align="left"
          style={{
            marginLeft: " 10px",
            marginRight: "10px",
            opacity: "0.5",
          }}
        />
        <AllLink
          to={"/allMovies"}
          onClick={() => {
            setAllIsTopRated(true);
            setAllIsDayTr(false);
            setAllIsWeekTr(false);
            setAllIsUpcoming(false);
          }}
        >
          VIEW ALL
        </AllLink>
      </ContainerDiv>
      <MovieDiv>
        {topRated &&
          topRated.slice(0, 14).map((specificMovie, index) => {
            return <MovieCard key={index} specificMovie={specificMovie} />;
          })}
      </MovieDiv>
    </MainDiv>
  );
};

export default CoverPouplarMovies;

const MainDiv = styled.div`
  background-color: rgba(6, 4, 26, 1);
  display: flex;
  position: relative;
`;

const ContainerDiv = styled.div`
  width: 300px;
  height: 300px;
  margin: 50px 30px;
  position: relative;
`;

const Title = styled.p`
  color: white;
  font-size: 35px;
  text-align: left;
  width: 200px;
  margin: 60px 20px;
`;

const AllLink = styled(NavLink)`
  color: #b2bec3;
  margin: 20px;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const MovieDiv = styled.div`
  margin: 50px 30px;
`;
