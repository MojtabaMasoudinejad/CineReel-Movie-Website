import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LoadingState from "../components/LoadingState";

import { UserContext } from "../UserContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
    filmId: filmId,
    userId: userId,
    username: username,
    createdAt: new Date().toISOString(),
  };
};

const CommentsNew = ({ movie_id }) => {
  const { user, loginWithRedirect } = useContext(UserContext);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      handleClickOpen();
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
                setActiveComment(null);
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
  // Get All Comments from MongoDB
  useEffect(() => {
    fetch("/api/all-comments")
      .then((res) => res.json())
      .then((resData) => {
        setBackendComments(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [movie_id, activeComment, backendComments]);
  if (!backendComments) {
    return (
      <div>
        <LoadingState />
      </div>
    );
  }

  return (
    <CommentsDiv>
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
            You should first login to add comments to this movie
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => loginWithRedirect()} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <CommentsTitle>Comments</CommentsTitle>
      <CommentsFormTitle>Write comment</CommentsFormTitle>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <CommentsContainer
        id="container"
        style={{ border: rootComments.length !== 0 ? "solid 1px black" : "" }}
      >
        {rootComments.map((rootComment, index) => (
          <div key={index}>
            {index !== 0 && <hr />}
            <Comment
              key={index}
              comment={rootComment}
              replies={getReplies(rootComment._id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={user ? user.email : ""}
            />
          </div>
        ))}
      </CommentsContainer>
    </CommentsDiv>
  );
};

export default CommentsNew;

const CommentsDiv = styled.div`
  margin-top: 20px;
`;

const CommentsTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;

const CommentsFormTitle = styled.div`
  font-size: 22px;
`;

const CommentsContainer = styled.div`
  margin: 40px 0;
  padding: 20px;
  border-radius: 2%;
`;
