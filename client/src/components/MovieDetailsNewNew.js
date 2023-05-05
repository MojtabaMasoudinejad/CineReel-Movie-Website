import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import { UserContext } from "../UserContext";

import LoadingState from "./LoadingState";
import CommentsNew from "../Comments/CommentsNew";
import MovieCard from "./MovieCard";
import PeopleCard from "./PeopleCard";

import { FaBookmark, FaRegHeart } from "react-icons/fa";
import { SiImdb } from "react-icons/si";

import image from "../Assets/errorPic04.png";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetailsNewNew = () => {
  const {
    genre,
    user,
    usersMongoDb,
    userContextData,
    isAuthenticated,
    loginWithRedirect,
    onClickId,
  } = useContext(UserContext);
  const { movie_id } = useParams();

  const [currentMovieDetail, setCurrentMovieDetail] = useState();
  const [movieVideo, setMovieVideo] = useState(null);
  const [recommendedMovies, setrecommendedMovies] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [addedWatchList, setAddedWatchList] = useState(false);
  const [liked, setLiked] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    usersMongoDb.forEach((item) => {
      if (item.email && user) {
        if (item.email === user.email) {
          if (item.watchList) {
            if (item.watchList.includes(movie_id)) {
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
  }, [user, movie_id, usersMongoDb]);

  // Fetch all Specific Movie Data

  const fetchData = async () => {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/tv/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
    const jsonDataTv = await response1.json();

    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );

    const jsonDataMovie = await response2.json();

    if (jsonDataTv.name === onClickId) {
      setCurrentMovieDetail(jsonDataTv);
    } else {
      setCurrentMovieDetail(jsonDataMovie);
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

  //ّFetch Movies Credits
  const fetchMoviesCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const jsonData = await response.json();

    setMovieCredits(jsonData.cast);
  };

  //ّFetch Movies Video
  const fetchMoviesVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const jsonData = await response.json();

    setMovieVideo(jsonData.results);
  };

  // Add specific Movie to WatchList
  const addToWatchListHandler = () => {
    if (isAuthenticated) {
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
    } else {
      handleClickOpen();
    }
  };

  // Add specific Movie to LikedList
  const likedHandler = () => {
    if (isAuthenticated) {
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
    } else {
      handleClickOpen();
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    fetchData();
    fetchRecommendedMovies();
    fetchMoviesCredits();
    fetchMoviesVideo();
  }, [movie_id]);

  if (!currentMovieDetail) {
    return <LoadingState />;
  }

  if (!currentMovieDetail.backdrop_path && !currentMovieDetail.poster_path) {
    return (
      <DivError>
        <MainDivError></MainDivError>
        <div style={{ position: "absolute", top: "35vh", left: "20vw" }}>
          <ErrorMsgOne>
            There is an error while trying to load page from API
          </ErrorMsgOne>
          <ErrorMsgTwo>
            Please try refreshing the page, or{" "}
            <a href="https://github.com/MojtabaMasoudinejad">contact support</a>{" "}
            if the problem persists
          </ErrorMsgTwo>
        </div>
      </DivError>
    );
  }

  return (
    <MainDiv>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User is not logged in"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You should first login to add this movie to your profile
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => loginWithRedirect()} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>

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
      </div>
      <MovieData>
        <div style={{ marginRight: "30px" }}>
          <div>
            {currentMovieDetail.poster_path && (
              <MoviePoster
                src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.poster_path}`}
              />
            )}
          </div>
        </div>
        <MovieDataRight>
          <MovieDetail>
            <div style={{ fontWeight: "600", fontSize: "3rem" }}>
              {currentMovieDetail.title && currentMovieDetail.title}
              {currentMovieDetail.name && currentMovieDetail.name}
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
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaBookmark
                size={30}
                style={{
                  fill: addedWatchList ? "red" : "",
                  marginRight: "20px",
                }}
                onClick={addToWatchListHandler}
                onMouseOver={({ target }) => (target.style.cursor = "pointer")}
              />
              <FaRegHeart
                size={30}
                style={{ fill: liked ? "red" : "", marginRight: "20px" }}
                onClick={likedHandler}
                onMouseOver={({ target }) => (target.style.cursor = "pointer")}
              />
              {currentMovieDetail.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
                  target="_blank"
                >
                  <SiImdb
                    size={30}
                    style={{
                      margin: "20px 0",
                      color: "white",
                      marginRight: "20px",
                    }}
                  />
                </a>
              )}
            </div>
          </MovieDetail>
          <div style={{ margin: "0rem 0", flex: "0.8" }}>
            <TextSynopsis>Synopsis:</TextSynopsis>
            <div>{currentMovieDetail.overview}</div>
          </div>
        </MovieDataRight>
      </MovieData>

      <div>
        {recommendedMovies && (
          <div>
            {recommendedMovies.length !== 0 && (
              <>
                <h2>Recommended Movies</h2>
                <ScrollingDiv>
                  {recommendedMovies.length !== 0 &&
                    recommendedMovies.map((item, index) => {
                      if (item.poster_path && item.backdrop_path) {
                        return <MovieCard key={index} specificMovie={item} />;
                      }
                    })}
                </ScrollingDiv>
              </>
            )}
          </div>
        )}
      </div>

      {movieCredits && (
        <div>
          {movieCredits.length !== 0 && (
            <>
              <hr
                align="left"
                style={{
                  margin: "60px 0",
                  marginBottom: "20px",

                  width: "60vw",
                  color: "red",
                }}
              />
              <h2> Movie Cast</h2>
              <ScrollingDiv>
                {movieCredits.length !== 0 &&
                  movieCredits.slice(0, 15).map((item, index) => {
                    return <PeopleCard key={index} people_id={item.id} />;
                  })}
              </ScrollingDiv>
            </>
          )}
        </div>
      )}

      {movieVideo && (
        <div>
          {movieVideo.length !== 0 && (
            <>
              <hr
                align="left"
                style={{
                  margin: "60px 0",
                  marginBottom: "20px",

                  width: "60vw",
                  color: "red",
                }}
              />
              {movieVideo.length !== 0 && (
                <div>
                  <h2> Movie Video</h2>
                  <ScrollingDiv style={{ height: "400px" }}>
                    {movieVideo.slice(0, 8).map((item, index) => {
                      if (item.site === "YouTube") {
                        return (
                          <YouTube
                            key={index}
                            videoId={item.key}
                            style={{ margin: "10px " }}
                          />
                        );
                      }
                    })}
                  </ScrollingDiv>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <hr
        align="left"
        style={{
          margin: "60px 0",
          marginBottom: "20px",
          marginLeft: "-250px",
          width: "60vw",
          color: "red",
        }}
      />
      <CommentsDiv>
        <CommentsNew movie_id={movie_id} />
      </CommentsDiv>
    </MainDiv>
  );
};

export default MovieDetailsNewNew;

const MainDiv = styled.div`
  padding-top: 70px;

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
  padding-top: 70px;

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
`;

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

const CommentsDiv = styled.div`
  margin-top: 20px;
  width: 800px;
`;

const ScrollingDiv = styled.div`
  width: 75vw;
  height: 350px;
  display: flex;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #bdc3c7;
  }
`;

const DivError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 70px;
`;

const ErrorMsgOne = styled.div`
  font-size: x-large;
  font-weight: bold;
  padding: 15px;
  margin-bottom: 50px;
`;

const ErrorMsgTwo = styled.div`
  font-size: large;
`;

const MainDivError = styled.div`
  background-image: url(${image});
  height: 92vh;
  width: 98.9vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 1200px;
  padding-top: 70px;
`;
