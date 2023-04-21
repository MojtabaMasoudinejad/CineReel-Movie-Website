import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

import LoadingState from "./LoadingState";
import MovieCardWithId from "./MovieCardWithId";

import { FaBookmark, FaRegHeart } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_API_KEY;

const PersonProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [currentPersonMovieCredit, setCurrentPersonMovieCredit] =
    useState(null);
  const [currentPersonTvCredit, setCurrentPersonTvCredit] = useState(null);

  const { people_id } = useParams();

  //   console.log(currentPersonTvCredit);

  // Fetch Data for specific Person
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/person/${people_id}?api_key=${API_KEY}&language=en-US`
  //     );
  //     const jsonData = await response.json();

  //     setCurrentPerson(jsonData);
  //   };

  const fetchData = () => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/person/${people_id}?api_key=${API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${people_id}/movie_credits?api_key=${API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${people_id}/tv_credits?api_key=${API_KEY}&language=en-US`
      ),
    ])

      .then(([response1, response2, response3]) => {
        return Promise.all([
          response1.json(),
          response2.json(),
          response3.json(),
        ]);
      })
      .then(([data1, data2, data3]) => {
        setCurrentPerson(data1);
        setCurrentPersonMovieCredit(data2.cast);
        setCurrentPersonTvCredit(data3.cast);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    fetchData();

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [people_id]);

  if (!currentPerson) {
    return <LoadingState />;
  }

  if (!currentPersonMovieCredit) {
    return <LoadingState />;
  }

  if (!currentPersonTvCredit) {
    return <LoadingState />;
  }

  return (
    <MainDiv>
      <div style={{ width: "95%" }}>
        <MovieBackdrop></MovieBackdrop>
      </div>
      <MovieData>
        <div style={{ marginRight: "30px" }}>
          <div className="movie__posterBox">
            <MoviePoster
              src={`http://image.tmdb.org/t/p/w500${currentPerson.profile_path}`}
            />
          </div>
        </div>
        <MovieDataRight>
          <MovieDetail>
            <div style={{ fontWeight: "600", fontSize: "3rem" }}>
              {currentPerson.name && currentPerson.name}
              {/* {currentPerson.original_name &&
            currentPerson.original_name} */}
            </div>
            <div style={{ margin: "30px 0" }}>
              Popularity: {currentPerson.popularity}
              <i />
              {/* <span style={{ marginLeft: "1rem" }}>
            {"(" + currentPerson.vote_count + ") votes"}
          </span> */}
            </div>

            {currentPerson.birthday && (
              <div style={{ margin: "30px 0" }}>
                {"Date of Birth: " + currentPerson.birthday}
              </div>
            )}
            {currentPerson.deathday && (
              <div style={{ margin: "30px 0" }}>
                {"Date of Death: " + currentPerson.deathday}
              </div>
            )}
            <div style={{ margin: "1.25rem 0", display: "flex" }}></div>
            <div style={{ marginTop: "50px" }}>
              {/* <FaBookmark
            size={30}
            style={{ fill: addedWatchList ? "red" : "" }}
            onClick={addToWatchListHandler}
          /> */}
              <FaRegHeart
                size={30}
                // style={{ fill: liked ? "red" : "" }}
                // onClick={likedHandler}
              />
            </div>
          </MovieDetail>
          <div style={{ margin: "0rem 0", flex: "0.8" }}>
            <TextSynopsis>Biography:</TextSynopsis>
            <div>{currentPerson.biography.slice(0, 500)} . . . </div>
          </div>
        </MovieDataRight>
      </MovieData>
      <div>
        <div> Movie Credit:</div>
        {currentPersonMovieCredit.slice(0, 4).map((item, index) => {
          return <MovieCardWithId key={index} movie_id={item.id} />;
        })}
      </div>
      <div>
        <div> TV Credit:</div>
        {currentPersonTvCredit.slice(0, 4).map((item, index) => {
          return <MovieCardWithId key={index} movie_id={item.id} />;
        })}
      </div>
    </MainDiv>
  );
};

export default PersonProfile;

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieBackdrop = styled.div`
  width: 100%;
  height: 500px;
  background-color: #273c75;
  filter: brightness(0.8);
  margin-top: 30px;
`;

const MovieData = styled.div`
  align-items: center;
  width: 85%;
  display: flex;
  position: absolute;
  top: 50px;
`;

const MoviePoster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;
`;

const MovieDataRight = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
`;

// const MovieGenre = styled.span`
//   padding: 0.5rem;
//   border: 2px solid white;
//   border-radius: 20px;
//   margin-right: 1rem;
// `;

const TextSynopsis = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  display: flex;
  position: relative;
  align-items: center;
`;

const MovieDetail = styled.div`
  text-shadow: 0px 0px 5px #000000;
`;

// const CommentsDiv = styled.div`
//   margin-top: 20px;
//   width: 800px;
// `;
