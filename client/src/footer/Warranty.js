import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const Warranty = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <WarrantyContainer>
      <div>
        <p>
          Please contact the brand of the item(s) for their warranties. We are
          not responsible <Span>enough in life</Span> of the purchased item(s)
        </p>
      </div>
    </WarrantyContainer>
  );
};

const WarrantyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
  & p {
    font-size: 35px;
  }
`;

const Span = styled.span`
  opacity: 0.2;
  font-size: 15px;
`;
