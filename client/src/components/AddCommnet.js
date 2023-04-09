import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";

const AddCommnet = () => {
  const [comment, setComment] = useState("");
  const [listCommnets, setListComments] = useState([]);
  const [textAreaPosition, setTextAreaPosition] = useState(0);

  const textAreaRef = useRef(null);

  const onClickHandler = () => {
    setListComments(() => [...listCommnets, comment]);
    setComment("");
    const { top } = textAreaRef.current.getBoundingClientRect();
    setTextAreaPosition(-top);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <MainDiv>
      {listCommnets.map((text) => (
        <CommentList>{text}</CommentList>
      ))}
      <CommentBox>
        <CommentText>Comment</CommentText>
        <CommentArea
          ref={textAreaRef}
          style={{ marginTop: `${textAreaPosition}px` }}
          value={comment}
          onChange={onChangeHandler}
          placeholder="Add Commnet"
        />
        <Button onClick={onClickHandler}>Submit</Button>
      </CommentBox>
    </MainDiv>
  );
};

export default AddCommnet;

const MainDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: -200px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CommentText = styled.h3`
  margin: 12px 0;
  font-size: 1.15rem;
  font-weight: 600;
`;

const CommentArea = styled.textarea`
  height: 75px;
  width: 465px;
  background-color: #ffffff;
`;

const Button = styled.button`
  height: 40px;
  width: 80px;
  background-color: #1b0fff;
  color: white;
  font-size: 1.05rem;
  margin-top: 10px;
  border-radius: 5px;
  border-style: none;
  cursor: pointer;
`;

const CommentList = styled.div`
  /* height: 75px; */
  width: 465px;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 10px 0;
  word-break: break-all;
`;
