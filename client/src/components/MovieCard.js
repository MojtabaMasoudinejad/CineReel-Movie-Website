import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styled from "styled-components";
import { Link } from "react-router-dom";

function MovieCard({ specificMovie }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <>
      {isLoading ? (
        <MainDiv className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </MainDiv>
      ) : (
        <Link
          to={`/movie/${specificMovie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <MainDiv>
            <img
              style={{ height: "300px" }}
              src={`http://image.tmdb.org/t/p/w500${specificMovie.poster_path}`}
              alt="Movie POster"
            />
            <DivMovie>
              <CardTitle>
                {specificMovie.title ? specificMovie.title : specificMovie.name}
              </CardTitle>
              <div
                style={{
                  fontSize: "0.75rem",
                  marginBottom: "0.25rem",
                  color: "white",
                }}
              >
                {specificMovie.release_date
                  ? specificMovie.release_date
                  : specificMovie.first_air_date}
                <span style={{ float: "right", color: "white" }}>
                  {specificMovie ? specificMovie.vote_average : ""}
                  <i />
                </span>
              </div>
              <CardDescription>
                {specificMovie
                  ? specificMovie.overview.slice(0, 118) + "..."
                  : ""}
              </CardDescription>
            </DivMovie>
          </MainDiv>
        </Link>
      )}
    </>
  );
}

export default MovieCard;

const MainDiv = styled.div`
  display: inline-block;
  transition: transform 0.2s;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin: 0.19rem;
  cursor: pointer;
  min-width: 200px;
  height: 300px;
  z-index: 0;
  border: 1px solid rgb(99, 99, 99);

  &:hover {
    transform: scale(1.2);
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

const DivMovie = styled.div`
  position: absolute;
  padding: 0 1rem 1rem 1rem;
  bottom: 0px;
  height: 290px;
  display: flex;
  flex-direction: column;
  width: 85%;
  justify-content: flex-end;
  background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const CardTitle = styled.div`
  color: white;
  font-weight: 900;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const CardDescription = styled.div`
  color: white;
  font-style: italic;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;
