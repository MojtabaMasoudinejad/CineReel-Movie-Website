import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";
// import MovieCardWithId from "./MovieCardWithId";
// import PeopleCard from "./PeopleCard";
import styled from "styled-components";

const SearchBar = () => {
  const { searchItems, setSearchItems } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  //   const [searchItems, setSearchItems] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();

  //   console.log("searchTerm", searchTerm);
  console.log(searchItems);

  const searchQuery = async (searchValue) => {
    if (searchValue !== "") {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      );
      const jsonData = await response.json();
      setSearchItems(jsonData.results);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search`);
    }
  };

  return (
    <MainDiv>
      <div>
        <Input
          id="searchInput"
          type="text"
          placeholder="Search here . . ."
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Link to={`/search`}>
          <button disabled={searchTerm.length < 2 ? true : ""}>Search </button>
        </Link>
      </div>
    </MainDiv>
  );
};

export default SearchBar;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90vw;
  background-color: #74b9ff;
  height: 200px;
`;

const Input = styled.input`
  width: 80vw;
  margin-left: 20px;
  height: 20px;
`;
