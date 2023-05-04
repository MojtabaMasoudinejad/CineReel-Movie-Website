import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";
import styled from "styled-components";

const SearchBar = () => {
  const {
    searchItemsMovies,
    setSearchItemsMovies,
    setSearchItemsTv,
    setSearchItemsPerson,
    setSearchItemsCompanies,
  } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();

  console.log(searchItemsMovies);

  const searchQuery = async (searchValue) => {
    if (searchValue !== "") {
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=${searchValue}&page=1`
        ),
      ])

        .then(([response1, response2, response3, response4]) => {
          return Promise.all([
            response1.json(),
            response2.json(),
            response3.json(),
            response4.json(),
          ]);
        })
        .then(([data1, data2, data3, data4]) => {
          setSearchItemsMovies(data1.results);
          setSearchItemsTv(data2.results);
          setSearchItemsPerson(data3.results);
          setSearchItemsCompanies(data4.results);
        })
        .catch((err) => {
          console.log("Error", err);
        });
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
      </div>
    </MainDiv>
  );
};

export default SearchBar;

const MainDiv = styled.div`
  width: 430px;
  margin: 0 auto;
  font-family: "Raleway", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 24px;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;

  color: white;
  background-color: transparent;

  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid white;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &:hover,
  &:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid white;
    border-radius: 0;
    background-position: 100% center;
  }
`;
