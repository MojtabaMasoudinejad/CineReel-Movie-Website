import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

export const ContactInfo = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <ContactContainer>
      <Contacts>
        <p>Please don't contact us :(</p>
      </Contacts>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 90vh;
  margin: 35px auto;
  align-items: center;
  justify-content: center;
`;

const Contacts = styled.p`
  font-size: 20px;
  & :hover {
    font-size: 100px;
    color: red;
    font-weight: bolder;
  }
`;
