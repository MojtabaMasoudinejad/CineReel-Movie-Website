import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

import LoadingState from "./LoadingState";
import MovieCardWithId from "./MovieCardWithId";

import { FaFacebook } from "react-icons/fa";
import { IoHeartCircleSharp } from "react-icons/io5";
import { SiImdb } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const API_KEY = process.env.REACT_APP_API_KEY;

const PersonProfile = () => {
  const {
    user,
    userContextData,
    isAuthenticated,
    usersMongoDb,
    loginWithRedirect,
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [currentPersonMovieCredit, setCurrentPersonMovieCredit] =
    useState(null);
  const [currentPersonTvCredit, setCurrentPersonTvCredit] = useState(null);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPersonImgs, setCurrentPersonImgs] = useState(null);

  const [externalIDs, setExternalIDs] = useState(null);

  const { people_id } = useParams();

  console.log("currentPersonImgs", currentPersonImgs);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      fetch(
        `https://api.themoviedb.org/3/person/${people_id}/images?api_key=${API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/${people_id}/external_ids?api_key=${API_KEY}&language=en-US`
      ),
    ])

      .then(([response1, response2, response3, response4, response5]) => {
        return Promise.all([
          response1.json(),
          response2.json(),
          response3.json(),
          response4.json(),
          response5.json(),
        ]);
      })
      .then(([data1, data2, data3, data4, data5]) => {
        setCurrentPerson(data1);
        setCurrentPersonMovieCredit(data2.cast);
        setCurrentPersonTvCredit(data3.cast);
        setCurrentPersonImgs(data4.profiles);
        setExternalIDs(data5);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    usersMongoDb.forEach((item) => {
      if (item.email && user) {
        if (item.email === user.email) {
          if (item.likedListPerson) {
            if (item.likedListPerson.includes(people_id)) {
              setLiked(true);
            } else {
              setLiked(false);
            }
          }
        }
      }
    });
  }, [user, people_id]);

  // Add specific Person to LikedListPerson
  const likedHandler = () => {
    if (isAuthenticated) {
      if (!liked) {
        setLiked(true);
      } else {
        setLiked(!liked);
      }

      if (!liked) {
        fetch(`/api/users-add-person-like/${user.email}`, {
          method: "PATCH",
          body: JSON.stringify({ newLikedPerson: people_id }),
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
        fetch(`/api/users-remove-person-like/${user.email}`, {
          method: "PATCH",
          body: JSON.stringify({ newLikedPerson: people_id }),
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

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [people_id]);

  if (!currentPerson) {
    return <LoadingState />;
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
        <MovieBackdrop></MovieBackdrop>
      </div>
      <MovieData>
        <div style={{ marginRight: "30px" }}>
          <div>
            <MoviePoster
              src={`http://image.tmdb.org/t/p/w500${currentPerson.profile_path}`}
            />
          </div>
        </div>
        <MovieDataRight>
          <MovieDetail>
            <div style={{ fontWeight: "600", fontSize: "3rem" }}>
              {currentPerson.name && currentPerson.name}
            </div>
            <div style={{ margin: "30px 0" }}>
              Popularity: {currentPerson.popularity}
              <i />
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
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IoHeartCircleSharp
                size={30}
                style={{ fill: liked ? "red" : "", marginRight: "20px" }}
                onClick={likedHandler}
              />
              <a
                href={`https://www.imdb.com/name/${externalIDs.imdb_id}`}
                target="_blank"
              >
                <SiImdb
                  size={25}
                  style={{ marginRight: "20px", color: "white" }}
                />
              </a>
              <a
                href={`https://www.facebook.com/${externalIDs.facebook_id}`}
                target="_blank"
              >
                <FaFacebook
                  size={25}
                  style={{ marginRight: "20px", color: "white" }}
                />
              </a>
              <a
                href={`https://www.instagram.com/${externalIDs.instagram_id}  `}
                target="_blank"
              >
                <GrInstagram size={25} style={{ color: "white" }} />
              </a>
            </div>
          </MovieDetail>
          <div style={{ margin: "0rem 0", flex: "0.8" }}>
            <TextSynopsis>Biography:</TextSynopsis>
            <div>{currentPerson.biography.slice(0, 500)} . . . </div>
          </div>
        </MovieDataRight>
      </MovieData>
      {currentPersonMovieCredit && (
        <>
          {currentPersonMovieCredit.length !== 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h2> Movie Credit:</h2>
              <ScrollingDiv>
                {currentPersonMovieCredit.slice(0, 14).map((item, index) => {
                  if (item.poster_path) {
                    return <MovieCardWithId key={index} movie_id={item.id} />;
                  }
                })}
              </ScrollingDiv>
            </div>
          )}
        </>
      )}

      {currentPersonTvCredit && (
        <>
          {currentPersonTvCredit.length !== 0 && (
            <div style={{ marginBottom: "30px" }}>
              <hr
                align="left"
                style={{
                  margin: "60px 0",
                  marginBottom: "20px",

                  width: "60vw",
                  color: "red",
                }}
              />
              <h2> TV Credit:</h2>
              <ScrollingDiv>
                {currentPersonTvCredit.slice(0, 14).map((item, index) => {
                  if (item.poster_path) {
                    return <MovieCardWithId key={index} movie_id={item.id} />;
                  }
                })}
              </ScrollingDiv>
            </div>
          )}
        </>
      )}

      {currentPersonImgs && (
        <>
          {currentPersonImgs.length !== 0 && (
            <div style={{ marginBottom: "30px" }}>
              <hr
                align="left"
                style={{
                  margin: "60px 0",
                  marginBottom: "20px",

                  width: "60vw",
                  color: "red",
                }}
              />
              <h2> Images:</h2>
              <ScrollingDiv>
                {currentPersonImgs.slice(0, 14).map((item, index) => {
                  return (
                    <MoviePoster
                      key={index}
                      src={`http://image.tmdb.org/t/p/w500${item.file_path}`}
                    />
                  );
                })}
              </ScrollingDiv>
            </div>
          )}
        </>
      )}
    </MainDiv>
  );
};

export default PersonProfile;

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  padding-top: 70px;

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
  margin-right: 5px;
`;

const MovieDataRight = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
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
