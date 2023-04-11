import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import styled from "styled-components";

const createCommentApi = async (text, parentId = null) => {
  return {
    _id: Math.random().toString(36),
    body: text,
    parentId,
    filmId: 1,
    userId: "1", // this should Be dynamically changed
    username: "John", //this should Be dynamically changed
    createdAt: new Date().toISOString(),
  };
};

const Comments = ({ currentUserId, filmId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
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
            setActiveComment(null);
          } else {
            window.alert("Something went wrong.");
          }
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    });
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
  }, [backendComments]); //it should be update when any comment is added to DB

  if (!backendComments) {
    return <div>Loading . . .</div>;
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
            currentUserId={currentUserId}
          />
        ))}
      </CommentsContainer>
    </CommentsDiv>
  );
};

export default Comments;

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
