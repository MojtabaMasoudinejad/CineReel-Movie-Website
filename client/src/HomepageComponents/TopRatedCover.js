import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

const TopRatedCover = () => {
  const { topRated } = useContext(UserContext);

  return (
    <div style={{ backgroundColor: "rgba(6,4,26,1)", position: "relative" }}>
      <RecomDiv>DAY RECOMMENDATION:</RecomDiv>
      <Cover
        src={`http://image.tmdb.org/t/p/w500${topRated[4].backdrop_path}`}
      ></Cover>
      <H1>{topRated[4].original_title} </H1>
      <OverviewDiv>{topRated[4].overview}</OverviewDiv>
      <Link to={`/movie/${424}`}>
        <Button>WATCH NOW</Button>
      </Link>
    </div>
  );
};

export default TopRatedCover;

const RecomDiv = styled.div`
  color: white;
  position: absolute;
  top: 30vh;
  left: 10vw;
`;

const Cover = styled.img`
  height: 100vh;
  width: 100%;
  background-size: "cover";
  background-position: "top";
  display: "grid";
  place-items: "center";
`;

const H1 = styled.div`
  width: 800px;
  color: white;
  position: absolute;
  top: 33vh;
  left: 9.5vw;
  font-size: 70px;
  font-weight: bold;
  line-height: 1.6;
`;

const OverviewDiv = styled.div`
  width: 600px;
  color: white;
  position: absolute;
  top: 46vh;
  left: 10vw;
  font-size: 17px;
  line-height: 1.6;
  opacity: 0.7;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 180px;
  height: 70px;
  position: absolute;
  top: 55vh;
  left: 10vw;
  color: white;
  background-color: #0984e3;
  border: none;
  border-radius: 5%;
  font-weight: bold;
  margin-top: 60px;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
