import { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LoadingState from "./components/LoadingState";

const API_KEY = process.env.REACT_APP_API_KEY;

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [trendingDay, setTrendingDay] = useState(null);
  const [trendingWeek, setTrendingWeek] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [popularPeople, setPopularPeople] = useState(null);
  const [genre, setGenre] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  // console.log("trendingDayUseContex", trendingDay);
  //   console.log("PPeople", popularPeople);
  // console.log("Genre:", genre);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`),
      fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      ),
    ])
      .then(([response1, response2, response3, response4, response5]) => {
        return Promise.all([
          response1.json(),
          response2.json(),
          response3.json(),
          response4.json(),
          response5.json(),
        ]);
      })
      .then(([data1, data2, data3, data4, data5]) => {
        setTrendingDay(data1.results);
        setTrendingWeek(data2.results);
        setTopRated(data3.results);
        setPopularPeople(data4.results);
        setGenre(data5.genres);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  if (!trendingDay) {
    return <LoadingState />;
  }

  const contextValue = {
    trendingDay,
    trendingWeek,
    topRated,
    popularPeople,
    genre,
    user,
    isAuthenticated,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
