import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const NewsLetter = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <NewsContainer>
      <div>
        <h1>
          Dear diary, I don't know what a newsletter is. What I DO know is that
          we just added the option to buy by categories. Enjoy!
        </h1>
        <h3>
          We also added Sony to the available brands but that's no big deal,
          right?
        </h3>
      </div>
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  & h3 {
    text-align: center;
  }
`;
