import React, { useState, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import PeopleCard from "./PeopleCard";

const People = () => {
  const { people } = useContext(UserContext);
  //   console.log(latestPeople);

  return (
    <MainDiv style={{ display: "flex" }}>
      {/* <SideBar></SideBar> */}
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
  margin: 20px 8px;
`;

// const SideBar = styled.div`
//   width: 250px;
//   height: 100vh;
//   background-color: rgb(26 66 106 / 93%);
//   padding: 20px;
// `;
