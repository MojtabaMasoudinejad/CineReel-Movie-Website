import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

import LoadingState from "./LoadingState";
import CommentsNew from "../Comments/CommentsNew";
import MovieCard from "./MovieCard";

import { FaBookmark, FaRegHeart } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetailsNewNew = () => {
  const {
    trendingDay,
    trendingWeek,
    topRated,
    genre,
    user,
    usersMongoDb,
    userContextData,
  } = useContext(UserContext);
  const { movie_id } = useParams();

  const [currentMovieDetail, setCurrentMovieDetail] = useState();
  // const [video, setVideo] = useState(null);
  const [recommendedMovies, setrecommendedMovies] = useState();
  const [addedWatchList, setAddedWatchList] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // console.log(usersMongoDb);
    usersMongoDb.forEach((item) => {
      if (item.email && user) {
        // console.log("11");
        if (item.email === user.email) {
          // console.log("22");
          // console.log(item.watchList);
          if (item.watchList) {
            if (item.watchList.includes(movie_id)) {
              // console.log("33");
              setAddedWatchList(true);
            } else {
              setAddedWatchList(false);
            }
          }
        }

        if (item.email === user.email) {
          if (item.likedList) {
            if (item.likedList.includes(movie_id)) {
              setLiked(true);
            } else {
              setLiked(false);
            }
          }
        }
      }
    });
  }, [user, movie_id]);

  // Fetch all Specific Movie Data
  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
    const jsonData = await response.json();

    if (jsonData.status !== "Released") {
      const response2 = await fetch(
        `https://api.themoviedb.org/3/tv/${movie_id}?api_key=${API_KEY}&language=en-US`
      );
      const jsonData2 = await response2.json();
      setCurrentMovieDetail(jsonData2);
    } else {
      setCurrentMovieDetail(jsonData);
    }
  };

  //ّFetch Recommended Movies
  const fetchRecommendedMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    );
    const jsonData = await response.json();

    setrecommendedMovies(jsonData.results);
  };

  // Add specific Movie to WatchList
  const addToWatchListHandler = () => {
    //
    if (!addedWatchList) {
      setAddedWatchList(true);
    } else {
      setAddedWatchList(!addedWatchList);
    }

    if (!addedWatchList) {
      fetch(`/api/users/${user.email}`, {
        method: "PATCH",
        body: JSON.stringify({ newWatchList: movie_id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setAddedWatchList(true);
            userContextData();
          } else {
            console.log("Unknown error has occured. Please try again.");
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    } else {
      fetch(`/api/users-remove/${user.email}`, {
        method: "PATCH",
        body: JSON.stringify({ newWatchList: movie_id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setAddedWatchList(false);
            userContextData();
          } else {
            console.log("Unknown error has occured. Please try again.");
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };

  // Add specific Movie to LikedList
  const likedHandler = () => {
    if (!liked) {
      setLiked(true);
    } else {
      setLiked(!liked);
    }

    if (!liked) {
      fetch(`/api/users-add-like/${user.email}`, {
        method: "PATCH",
        body: JSON.stringify({ newLikedMovie: movie_id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setLiked(true);
            userContextData();
          } else {
            console.log("Unknown error has occured. Please try again.");
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    } else {
      fetch(`/api/users-remove-like/${user.email}`, {
        method: "PATCH",
        body: JSON.stringify({ newLikedMovie: movie_id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setLiked(false);
            userContextData();
          } else {
            console.log("Unknown error has occured. Please try again.");
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    fetchData();
    fetchRecommendedMovies();
  }, [movie_id]);

  if (!currentMovieDetail) {
    return <LoadingState />;
  }

  // if (!video) {
  //   return <LoadingState />;
  // }

  // if (!recommendedMovies) {
  //   return <LoadingState />;
  // }

  if (!currentMovieDetail.backdrop_path && !currentMovieDetail.poster_path) {
    window.alert("The Movie is not found in Data Base");
  }

  return (
    // {currentMovieDetail.success && }
    <MainDiv>
      <div style={{ width: "95%" }}>
        {currentMovieDetail.backdrop_path && (
          <MovieBackdrop
            src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.backdrop_path}`}
          />
        )}

        {!currentMovieDetail.backdrop_path && (
          <MovieBackdrop
            src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.poster_path}`}
          />
        )}

        {/* <MovieBackdrop
          src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.backdrop_path}`}
        /> */}
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
              {currentMovieDetail.original_title &&
                currentMovieDetail.original_title}
              {currentMovieDetail.original_name &&
                currentMovieDetail.original_name}
            </div>
            <div style={{ margin: "30px 0" }}>
              IMDB: {currentMovieDetail.vote_average}
              <i />
              <span style={{ marginLeft: "1rem" }}>
                {"(" + currentMovieDetail.vote_count + ") votes"}
              </span>
            </div>

            {currentMovieDetail.release_date && (
              <div style={{ margin: "30px 0" }}>
                {"Release date: " + currentMovieDetail.release_date}
              </div>
            )}
            <div style={{ margin: "1.25rem 0", display: "flex" }}>
              {currentMovieDetail.genres &&
                currentMovieDetail.genres.map((item, index) => {
                  return (
                    <div key={index}>
                      <MovieGenre>{item.name} </MovieGenre>
                    </div>
                  );
                })}
              {currentMovieDetail.genre_ids &&
                currentMovieDetail.genre_ids.map((item, index) => {
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
            <div style={{ marginTop: "50px" }}>
              <FaBookmark
                size={30}
                style={{ fill: addedWatchList ? "red" : "" }}
                onClick={addToWatchListHandler}
              />
              <FaRegHeart
                size={30}
                style={{ fill: liked ? "red" : "" }}
                onClick={likedHandler}
              />
            </div>
          </MovieDetail>
          <div style={{ margin: "0rem 0", flex: "0.8" }}>
            <TextSynopsis>Synopsis:</TextSynopsis>
            <div>{currentMovieDetail.overview}</div>
          </div>
        </MovieDataRight>
      </MovieData>
      {/* <div>
        {video.map((item, index) => {
          return (
            <video key={index}>
              <source src={` https://www.youtube.com/watch?v=${item.key}`} />
            </video>
          );
        })}
      </div> */}
      {recommendedMovies && (
        <div>
          <h2>Recommended Movies</h2>
          {recommendedMovies &&
            recommendedMovies.slice(0, 4).map((item, index) => {
              if (item.poster_path !== undefined) {
                return <MovieCard key={index} specificMovie={item} />;
              }
            })}
        </div>
      )}

      <CommentsDiv>
        <CommentsNew movie_id={movie_id} />
      </CommentsDiv>
    </MainDiv>
  );
};

export default MovieDetailsNewNew;

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

// const MovieLink = styled.div`
//   position: relative;
//   bottom: 120px;
//   display: flex;
//   justify-content: space-between;
//   width: 75%;
// `;

// const MovieButton = styled.span`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0.8rem 2rem;
//   border-radius: 20px;
//   cursor: pointer;
//   width: 150px;
//   color: black;
//   font-weight: bold;
// `;

// const MovieProduction = styled.div`
//   width: 85%;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   margin-bottom: 4rem;
// `;

// const ProductionCompany = styled.span`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const MovieDetail = styled.div`
  text-shadow: 0px 0px 5px #000000;
  /* margin-bottom: 0.3rem; */
`;

const CommentsDiv = styled.div`
  margin-top: 20px;
  width: 800px;
`;
