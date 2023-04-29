import { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";

const TopRatedCover = () => {
  const { topRated } = useContext(UserContext);

  return (
    <div style={{ backgroundColor: "rgba(6,4,26,1)", position: "relative" }}>
      <Cover
        src={`http://image.tmdb.org/t/p/w500${topRated[4].backdrop_path}`}
      ></Cover>
      <H1>name </H1>
    </div>
  );
};

export default TopRatedCover;

const Cover = styled.img`
  /* position: absolute; */
  /* top: 0; */
  height: 100vh;
  width: 100%;
  background-size: "cover";
  background-position: "top";
  display: "grid";
  place-items: "center";
  margin: 40px 0;
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
