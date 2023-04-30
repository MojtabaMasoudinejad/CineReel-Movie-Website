import styled from "styled-components";
import CommentForm from "./CommentForm";
// import { deleteComment } from "../../../server/handlers";
import Avatar from "@mui/material/Avatar";

import { VscReply } from "react-icons/vsc";
import { BsReplyAll } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment._id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment._id} style={{ display: "flex", marginBottom: "28px" }}>
      <div style={{ marginRight: "12px" }}>
        {/* <img src="/user-icon.png" /> */}
        <Avatar src="/broken-image.jpg" sx={{ width: 24, height: 24 }} />
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex" }}>
          <CommentAuthor>{comment.username}</CommentAuthor>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div style={{ fontSize: "18px" }}>{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment._id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <CommentActions>
          {canReply && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              <BsReplyAll size={20} />
              <CommentAction
                style={{ marginLeft: "5px" }}
                // onClick={() =>
                //   setActiveComment({ id: comment._id, type: "replying" })
                // }
              >
                Reply
              </CommentAction>
            </div>
          )}
          {canEdit && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              <CiEdit size={20} />
              <CommentAction
                style={{ marginLeft: "5px" }}
                // onClick={() =>
                //   setActiveComment({ id: comment._id, type: "editing" })
                // }
              >
                Edit
              </CommentAction>
            </div>
          )}
          {canDelete && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => deleteComment(comment._id)}
            >
              <AiOutlineDelete size={20} />
              <CommentAction
                style={{ marginLeft: "5px" }}
                // onClick={() => deleteComment(comment._id)}
              >
                Delete
              </CommentAction>
            </div>
          )}
        </CommentActions>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {replies.map((reply, index) => (
              <Comment
                comment={reply}
                key={index}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

const CommentAuthor = styled.div`
  margin-right: 8px;
  font-size: 20px;
  color: rgb(59, 130, 246);
`;

const CommentActions = styled.div`
  display: flex;
  /* justify-content:center; */
  align-items: center;
  font-size: 12px;
  color: rgb(51, 51, 51);
  cursor: pointer;
  margin-top: 8px;
`;

const CommentAction = styled.div`
  margin-right: 8px;
  font-size: 13px;

  &:hover {
    text-decoration: underline;
  }
`;
