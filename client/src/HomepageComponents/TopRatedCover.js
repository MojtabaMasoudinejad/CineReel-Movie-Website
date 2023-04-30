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
  top: 270px;
  left: 100px;
`;

const Cover = styled.img`
  /* position: absolute; */
  /* top: 0; */
  height: 100vh;
  width: 100%;
  background-size: "cover";
  background-position: "top";
  display: "grid";
  place-items: "center";
  /* margin: 40px 0; */
`;

const H1 = styled.div`
  width: 800px;
  color: white;
  position: absolute;
  top: 300px;
  left: 100px;
  font-size: 70px;
  font-weight: bold;
  /* text-align: justify;
  text-justify: auto; */
  line-height: 1.6;
`;

const OverviewDiv = styled.div`
  width: 600px;
  color: white;
  /* z-index: 10; */
  position: absolute;
  top: 400px;
  left: 100px;
  font-size: 17px;
  /* font-weight: bold; */
  line-height: 1.6;
  opacity: 0.7;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 180px;
  height: 70px;
  position: absolute;
  top: 500px;
  left: 100px;
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
