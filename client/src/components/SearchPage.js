import { useContext, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import MovieCardWithId from "./MovieCardWithId";
import PeopleCard from "./PeopleCard";

window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

const SearchPage = () => {
  const {
    searchItemsMovies,
    searchItemsTv,
    searchItemsPerson,
    searchItemsCompanies,
  } = useContext(UserContext);
  console.log("searchItemsCompanies", searchItemsCompanies);

  const [isMovies, setIsMovies] = useState(true);
  const [isTvs, setIsTvs] = useState(false);
  const [isPerson, setIsPerson] = useState(false);

  return (
    <MainDiv>
      <SideBar>
        <ItemMainDiv
          onClick={() => {
            setIsMovies(true);
            setIsTvs(false);
            setIsPerson(false);
          }}
        >
          <Item
            style={{
              color: isMovies ? "black" : "",
              fontWeight: isMovies ? "800" : "",
            }}
          >
            Movies
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsMovies(false);
            setIsTvs(true);
            setIsPerson(false);
          }}
        >
          <Item
            style={{
              color: isTvs ? "black" : "",
              fontWeight: isTvs ? "800" : "",
            }}
          >
            Tv Shows{" "}
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsMovies(false);
            setIsTvs(false);
            setIsPerson(true);
          }}
        >
          <Item
            style={{
              color: isPerson ? "black" : "",
              fontWeight: isPerson ? "800" : "",
            }}
          >
            People{" "}
          </Item>
        </ItemMainDiv>
      </SideBar>

      <div style={{ width: "90vw" }}>
        {isMovies && (
          <>
            {searchItemsMovies && searchItemsMovies.length !== 0 ? (
              searchItemsMovies.map((item, index) => {
                if (item.backdrop_path) {
                  return <MovieCardWithId key={index} movie_id={item.id} />;
                }
              })
            ) : (
              <TextDiv>No Results For This Keyword . . . !</TextDiv>
            )}
          </>
        )}

        {isTvs && (
          <>
            {searchItemsTv && searchItemsTv.length !== 0 ? (
              searchItemsTv.map((item, index) => {
                if (item.backdrop_path) {
                  return <MovieCardWithId key={index} movie_id={item.id} />;
                }
              })
            ) : (
              <TextDiv>No Results For This Keyword . . . !</TextDiv>
            )}
          </>
        )}

        {isPerson && (
          <>
            {searchItemsPerson && searchItemsPerson.length !== 0 ? (
              searchItemsPerson.map((item, index) => {
                if (item.profile_path) {
                  return <PeopleCard key={index} people_id={item.id} />;
                }
              })
            ) : (
              <TextDiv>No Results For This Keyword . . . !</TextDiv>
            )}
          </>
        )}
      </div>
    </MainDiv>
  );
};

export default SearchPage;

const MainDiv = styled.div`
  display: flex;
  padding-top: 70px;
`;

const SideBar = styled.div`
  width: 250px;
  height: 100vh;
  background-color: rgb(26 66 106 / 93%);
  padding: 20px;
`;

const ItemMainDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(26 66 106 / 60%);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  color: white;
  margin: 20px 10px;
  font-size: 18px;
`;

const TextDiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 20vw;
  margin-top: 30vh;
`;
