import React, { useState, useContext } from "react";
// import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

import { UserContext } from "../UserContext";
import LoadingState from "./LoadingState";
import MovieCardWithId from "./MovieCardWithId";
import PeopleCard from "./PeopleCard";

import { FaRegHeart } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";

const API_KEY = process.env.REACT_APP_API_KEY;

const Profile = () => {
  const { usersMongoDb } = useContext(UserContext);
  const [isWatchList, setIsWatchList] = useState(true);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isFavoritesPerson, setIsFavoritesPerson] = useState(false);

  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  // console.log(usersMongoDb);
  // console.log(user);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!usersMongoDb) {
    return <LoadingState />;
  }

  return (
    <MainDiv>
      <SideBar>
        <div>
          <Item style={{ marginLeft: "-5px" }}>
            <Avatar src="/broken-image.jpg" />
            <span style={{ fontWeight: "800", marginLeft: "10px" }}>
              {user.given_name} !
            </span>{" "}
          </Item>
        </div>

        <ItemMainDiv
          onClick={() => {
            setIsFavorites(false);
            setIsWatchList(true);
            setIsFavoritesPerson(false);
          }}
        >
          <BsBookmark color="white" size={25} />
          <Item
            style={{
              color: isWatchList ? "black" : "",
              fontWeight: isWatchList ? "800" : "",
            }}
          >
            WatchList Movies
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsFavorites(true);
            setIsWatchList(false);
            setIsFavoritesPerson(false);
          }}
        >
          <FaRegHeart color="white" size={25} />
          <Item
            style={{
              color: isFavorites ? "black" : "",
              fontWeight: isFavorites ? "800" : "",
            }}
          >
            Favorites Movies
          </Item>
        </ItemMainDiv>
        <ItemMainDiv
          onClick={() => {
            setIsFavorites(false);
            setIsWatchList(false);
            setIsFavoritesPerson(true);
          }}
        >
          <IoHeartCircleSharp color="white" size={25} />
          <Item
            style={{
              color: isFavorites ? "black" : "",
              fontWeight: isFavorites ? "800" : "",
            }}
          >
            Favorites Persons
          </Item>
        </ItemMainDiv>
        <ItemMainDiv onClick={() => logout()}>
          <IoIosLogOut color="white" size={30} />
          <Item>Logout</Item>
        </ItemMainDiv>
      </SideBar>
      <div style={{ width: "90vw" }}>
        {isWatchList &&
          usersMongoDb.map((item) => {
            if (item.hasOwnProperty("watchList") && item.email === user.email) {
              return item.watchList.map((movie_id, index) => {
                return <MovieCardWithId key={index} movie_id={movie_id} />;
              });
            }
          })}
        {isFavorites &&
          usersMongoDb.map((item) => {
            if (item.hasOwnProperty("likedList") && item.email === user.email) {
              return item.likedList.map((movie_id, index) => {
                return <MovieCardWithId key={index} movie_id={movie_id} />;
              });
            }
          })}
        {isFavoritesPerson &&
          usersMongoDb.map((item) => {
            if (
              item.hasOwnProperty("likedListPerson") &&
              item.email === user.email
            ) {
              return item.likedListPerson.map((people_id, index) => {
                return <PeopleCard key={index} people_id={people_id} />;
              });
            }
          })}
      </div>
    </MainDiv>
  );
};

export default Profile;

const MainDiv = styled.div`
  display: flex;
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
  /* cursor: pointer; */
  /* &:hover {
    color: black;
  } */
`;
