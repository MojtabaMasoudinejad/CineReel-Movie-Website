import React, { useState, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import PeopleCard from "./PeopleCard";

const People = () => {
  const { people } = useContext(UserContext);

  return (
    <MainDiv>
      <SideBar>Popular People</SideBar>
      <div>
        {people.map((item, index) => {
          return <PeopleCard key={index} people_id={item.id} />;
        })}
      </div>
    </MainDiv>
  );
};

export default People;

const MainDiv = styled.div`
  margin: auto;
  padding-top: 70px;
  width: 70vw;
`;

const SideBar = styled.div`
  padding: 20px;
  color: black;
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
`;
