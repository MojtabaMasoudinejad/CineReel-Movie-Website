import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styled from "styled-components";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const PeopleCard = ({ people_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPerson, setCurrentPerson] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${people_id}?api_key=${API_KEY}&language=en-US`
    );
    const jsonData = await response.json();

    setCurrentPerson(jsonData);
  };

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [people_id]);

  //   console.log("currentPerson", currentPerson);

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
          to={`/people/${currentPerson.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <MainDiv>
            <img
              style={{ height: "300px" }}
              src={`http://image.tmdb.org/t/p/w500${currentPerson.profile_path}`}
              alt="Person Poster"
            />
            <DivMovie>
              <CardTitle>
                {currentPerson.title ? currentPerson.title : currentPerson.name}
              </CardTitle>
              <div
                style={{
                  fontSize: "0.75rem",
                  marginBottom: "0.25rem",
                  color: "white",
                }}
              >
                {currentPerson.birthday ? currentPerson.birthday : null}
                {/* {currentPerson.deathday ? currentPerson.deathday : null} */}
                {/* <span style={{ float: "right", color: "white" }}>
                  {currentPerson ? currentPerson.vote_average : ""}
                  <i />
                </span> */}
              </div>
              <CardDescription>
                {currentPerson
                  ? currentPerson.biography.slice(0, 118) + "..."
                  : ""}
              </CardDescription>
            </DivMovie>
          </MainDiv>
        </Link>
      )}
    </>
  );
};

export default PeopleCard;

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
    transform: scale(1.1);
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
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.4rem;
`;

const CardDescription = styled.div`
  color: white;
  font-style: italic;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;
