import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const HelpCenter = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <HelpContainer>
      <div>
        <h2>Please get some help if you need it D:</h2>
      </div>
    </HelpContainer>
  );
};

const HelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
`;
