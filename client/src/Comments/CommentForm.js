import { useState } from "react";
import styled from "styled-components";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  // const [filmId, setFilmId] = useState("filmId");
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <CommentFormTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <CommentFormButton disabled={isTextareaDisabled}>
        {submitLabel}
      </CommentFormButton>
      {hasCancelButton && (
        <CommentFormButton
          style={{ marginLeft: "10px" }}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </CommentFormButton>
      )}
    </form>
  );
};

export default CommentForm;

const CommentFormTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
  margin-top: 8px;
  border: 1px solid rgb(107, 114, 12);
`;

const CommentFormButton = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  background: rgb(59, 130, 246);
  border-radius: 8px;
  color: white;

  &:hover:enabled {
    cursor: pointer;
    background: rgb(37, 99, 235);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;
