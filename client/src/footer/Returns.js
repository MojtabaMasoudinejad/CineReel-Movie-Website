import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const Returns = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <ReturnsContainer>
      <div>
        <h1>Please click the button below to start the return process</h1>
        <Button type="button" disabled>
          Return a product
        </Button>
        <h4>If the button is unavailable, please try again later.</h4>
      </div>
    </ReturnsContainer>
  );
};

const ReturnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  & h4 {
    text-align: center;
  }
`;

const Button = styled.button`
  display: flex;
  width: 50%;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size: large;
  color: whitesmoke;
  margin: 0px auto;
  background-color: #3dacc9;
  border: none;
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
