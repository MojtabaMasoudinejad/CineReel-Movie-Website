import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

import LoadingState from "./LoadingState";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetails = () => {
  const { trendingDay, trendingWeek, topRated, genre } =
    useContext(UserContext);
  console.log("trendingDay", trendingDay);
  // console.log("Genre:", genre);

  const [currentMovieDetail, setCurrentMovieDetail] = useState();
  const [video, setVideo] = useState(null);
  const { movie_id } = useParams();

  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  //   )
  //     .then((res) =>
  //       res.json()
  //     )
  //     .then((data) => {
  //       console.log(data);
  //       setVideo(data);
  //     });
  // }, [movie_id]);

  // if (!video) {
  //   return <LoadingState />;
  // }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    {
      !currentMovieDetail &&
        trendingDay.map((item) => {
          if (item.id.toString() === movie_id) {
            // console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }
    {
      !currentMovieDetail &&
        trendingWeek.map((item) => {
          if (item.id.toString() === movie_id) {
            // console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }
    {
      !currentMovieDetail &&
        topRated.map((item) => {
          if (item.id.toString() === movie_id) {
            // console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("video", data.results);
        setVideo(data.results);
      });
  }, [movie_id]);

  if (!currentMovieDetail) {
    return <LoadingState />;
  }

  if (!video) {
    return <LoadingState />;
  }

  return (
    <MainDiv>
      <div style={{ width: "95%" }}>
        <MovieBackdrop
          src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.backdrop_path}`}
        />
      </div>
      <MovieData>
        <div style={{ marginRight: "30px" }}>
          <div className="movie__posterBox">
            <MoviePoster
              src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.poster_path}`}
            />
          </div>
        </div>
        <MovieDataRight>
          <MovieDetail>
            <div style={{ fontWeight: "600", fontSize: "3rem" }}>
              {currentMovieDetail.original_title}
            </div>
            <div style={{ margin: "30px 0" }}>
              IMDB: {currentMovieDetail.vote_average}
              <i />
              <span style={{ marginLeft: "1rem" }}>
                {"(" + currentMovieDetail.vote_count + ") votes"}
              </span>
            </div>

            <div style={{ margin: "30px 0" }}>
              {"Release date: " + currentMovieDetail.release_date}
            </div>
            <div style={{ margin: "1.25rem 0", display: "flex" }}>
              {currentMovieDetail.genre_ids.map((item, index) => {
                return (
                  <div key={index}>
                    {genre.map((genreItem) => {
                      if (item === genreItem.id) {
                        return (
                          <div key={index}>
                            <MovieGenre>{genreItem.name} </MovieGenre>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </MovieDetail>
          <div style={{ margin: "2rem 0", flex: "0.8" }}>
            <TextSynopsis>Synopsis:</TextSynopsis>
            <div>{currentMovieDetail.overview}</div>
          </div>
        </MovieDataRight>
      </MovieData>
      <div>
        {video.map((item, index) => {
          return (
            <video key={index}>
              <source src={` https://www.youtube.com/watch?v=${item.key}`} />
            </video>
          );
        })}
      </div>
    </MainDiv>
  );
};

export default MovieDetails;

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: black; */
`;

const MovieBackdrop = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 0 35%;
  filter: brightness(0.3);
  margin-top: 30px;
`;

const MovieData = styled.div`
  align-items: center;
  width: 85%;
  display: flex;
  position: relative;
  bottom: 480px;
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

const MovieGenre = styled.span`
  padding: 0.5rem;
  border: 2px solid white;
  border-radius: 20px;
  margin-right: 1rem;
  /* background-color: red; */
  /* z-index: 10; */
`;

const TextSynopsis = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  display: flex;
  position: relative;
  align-items: center;
`;

const MovieLink = styled.div`
  position: relative;
  bottom: 120px;
  display: flex;
  justify-content: space-between;
  width: 75%;
`;

const MovieButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  width: 150px;
  color: black;
  font-weight: bold;
`;

const MovieProduction = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 4rem;
`;

const ProductionCompany = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MovieDetail = styled.div`
  text-shadow: 0px 0px 5px #000000;
  margin-bottom: 0.5rem;
`;
