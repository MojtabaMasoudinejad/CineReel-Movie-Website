import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LoadingState from "../components/LoadingState";

import { UserContext } from "../UserContext";

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
  const { user, isAuthenticated } = useContext(UserContext);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

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

  useEffect(() => {
    // 👇️ simulate chat messages flowing in
    setInterval(
      () =>
        setMessages((current) => [
          ...current,
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quaerat eum id obcaecati, magnam voluptatum dolorem sunt, omnis sed consectetur necessitatibus blanditiis ipsa? Cumque architecto, doloribus mollitia velit non sint!",
        ]),
      600
    );
  }, []);

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
  // Get All COmments from MongoDB
  useEffect(() => {
    fetch("/api/all-comments")
      .then((res) => res.json())
      .then((resData) => {
        setBackendComments(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [movie_id, activeComment]);
  ///I just deleted "backendComments" from top line [movie_id, activeComment,backendComments ] double check it later and make sure everything is ok
  if (!backendComments) {
    return (
      <div>
        <LoadingState />
      </div>
    );
  }

  return (
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
  margin-top: 40px;
`;
