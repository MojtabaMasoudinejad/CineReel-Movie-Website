import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const Faq = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <FaqContainer>
      <div>
        <h1>Why?</h1>
        <p>Because.</p>
      </div>
    </FaqContainer>
  );
};

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  & p {
    font-size: 20px;
  }
`;
