import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

import CommentForm from "../Comments/CommentForm";
import Comment from "../Comments/Comment";
import LoadingState from "./LoadingState";

const API_KEY = process.env.REACT_APP_API_KEY;

// const createCommentApi = async (text, parentId = null, filmId) => {
//   return {
//     _id: Math.random().toString(36),
//     body: text,
//     parentId,
//     filmId: filmId, // this should Be dynamically changed
//     userId: "1", // this should Be dynamically changed
//     username: "John", //this should Be dynamically changed
//     createdAt: new Date().toISOString(),
//   };
// };

const MovieDetailsNew = () => {
  const { trendingDay, trendingWeek, topRated, genre, user, isAuthenticated } =
    useContext(UserContext);
  console.log(user);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [loginUser, setLoginUser] = useState();

  //   console.log("trendingDay", trendingDay);

  const [currentMovieDetail, setCurrentMovieDetail] = useState();
  const [video, setVideo] = useState(null);
  const { movie_id } = useParams();

  // Fetch All comments
  const fetchAllComments = async () => {
    const response = await fetch("/api/all-comments");
    const jsonData = await response.json();

    setBackendComments(jsonData.data);
  };

  // Fetch video for specific Movie
  const fetchVideo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const jsonData = await response.json();

    setVideo(jsonData.results);
  };

  const createCommentApi = async (
    text,
    parentId = null,
    filmId,
    userId,
    username
  ) => {
    return {
      _id: Math.random().toString(36),
      body: text,
      parentId,
      filmId: filmId, // this should Be dynamically changed
      userId: userId, // this should Be dynamically changed
      username: username, //this should Be dynamically changed
      createdAt: new Date().toISOString(),
    };
  };

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

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

    fetchVideo();
    fetchAllComments();
  }, [movie_id, activeComment]);

  // console.log(activeComment);
  // useEffect(() => {
  //   fetch("/api/all-comments")
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       setBackendComments(resData.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //     });
  //   // fetchAllComments();
  // }, []);

  if (!backendComments) {
    return (
      <div>
        <LoadingState />
      </div>
    );
  }

  if (!currentMovieDetail) {
    return <LoadingState />;
  }

  if (!video) {
    return <LoadingState />;
  }

  const rootComments = backendComments.filter(
    (backendComment) =>
      backendComment.parentId === null && backendComment.filmId === movie_id
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId, filmId, userId, username) => {
    if (user) {
      createCommentApi(
        text,
        parentId,
        (filmId = movie_id),
        (userId = user.email),
        (username = user.name)
      ).then((comment) => {
        // add Comment to CommentsCollection
        fetch("/api/add-comments", {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              setBackendComments([comment, ...backendComments]);
              setActiveComment("null");
            } else {
              window.alert("Something went wrong.");
            }
          })
          .catch((e) => {
            console.log("Error: ", e);
          });
      });
    } else {
      window.alert("You Should Ligin First.");
    }
  };

  // Update the Comments
  const updateComment = (text, commentId) => {
    console.log("text", text);
    console.log("commentID:", commentId);

    fetch(`/api/add-comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ updatedComment: text }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setBackendComments(backendComments);
          setActiveComment(null);
          console.log("The Comment is Updatad Successfully");
        } else {
          console.log("Unknown error has occured. Please try again.");
        }
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };

  //Delete the Comments
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      backendComments.map((item) => {
        if (item._id === commentId) {
          fetch(`/api/add-comments/${commentId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                setBackendComments(backendComments);
                setActiveComment("null");
              } else {
                window.alert("Something went wrong.");
              }
            })
            .catch((e) => {
              console.log("Error: ", e);
            });
        }
      });
    }
  };

  return (
    <MainDiv>
      {/* <div style={{ width: "95%" }}>
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
      </MovieData> */}
      <>hello</>
      {/* <div>
        {video.map((item, index) => {
          return (
            <video key={index}>
              <source src={` https://www.youtube.com/watch?v=${item.key}`} />
            </video>
          );
        })}
      </div> */}
      <CommentsDiv>
        <CommentsTitle>Comments</CommentsTitle>
        <CommentsFormTitle>Write comment</CommentsFormTitle>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        <CommentsContainer>
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment._id}
              comment={rootComment}
              replies={getReplies(rootComment._id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={rootComment.userId}
            />
          ))}
        </CommentsContainer>
      </CommentsDiv>
    </MainDiv>
  );
};

export default MovieDetailsNew;

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
  margin-bottom: 0.5rem;
`;

const CommentsDiv = styled.div`
  margin-top: 20px;
  width: 800px;
`;

const CommentsTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;

const CommentsFormTitle = styled.div`
  font-size: 22px;
`;

const CommentsContainer = styled.div`
  margin-top: 40px;
`;
