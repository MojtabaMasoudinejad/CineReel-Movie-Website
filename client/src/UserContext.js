import { createContext, useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LoadingState from "./components/LoadingState";
// import MovieCard from "./components/MovieCard";
// import MovieCardWithId from "./components/MovieCardWithId";

const API_KEY = process.env.REACT_APP_API_KEY;

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [trendingDay, setTrendingDay] = useState(null);
  const [trendingWeek, setTrendingWeek] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [popularPeople, setPopularPeople] = useState(null);
  const [genre, setGenre] = useState(null);
  const [people, setPeople] = useState(null);
  const [searchItemsMovies, setSearchItemsMovies] = useState(null);
  const [searchItemsTv, setSearchItemsTv] = useState(null);
  const [searchItemsPerson, setSearchItemsPerson] = useState(null);
  const [searchItemsCompanies, setSearchItemsCompanies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [onClickId, setOnClickId] = useState(null);
  const [allIsTopRated, setAllIsTopRated] = useState(true);
  const [allIsDayTr, setAllIsDayTr] = useState(false);
  const [allIsWeekTr, setAllIsWeekTr] = useState(false);
  const [allIsUpcoming, setAllIsUpcoming] = useState(false);

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [usersMongoDb, setUsersMongoDb] = useState();

  //   console.log("PPeople", popularPeople);
  // console.log("latestPeople:", latestPeople);

  // console.log("userMongoDb", usersMongoDb);
  // console.log("userAuth0", user);
  // console.log("userWatchList", userWatchList);

  const userContextData = () => {
    // fetch(`/api/users`)
    //   .then((res) => {
    //     res.json();
    //   })
    //   .then((data) => {
    //     setUsersMongoDb(data.data);
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //   });

    const genre = "Action";
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
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
      ),

      fetch(`/api/users`),
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      ),
    ])

      .then(
        ([
          response1,
          response2,
          response3,
          response4,
          response5,
          response6,
          response7,
          response8,
        ]) => {
          return Promise.all([
            response1.json(),
            response2.json(),
            response3.json(),
            response4.json(),
            response5.json(),
            response6.json(),
            response7.json(),
            response8.json(),
          ]);
        }
      )
      .then(([data1, data2, data3, data4, data5, data6, data7, data8]) => {
        setTrendingDay(data1.results);
        setTrendingWeek(data2.results);
        setTopRated(data3.results);
        setPopularPeople(data4.results);
        setGenre(data5.genres);
        setPeople(data6.results);
        setUsersMongoDb(data7.data);
        setUpcomingMovies(data8.results);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    userContextData();
  }, []);
  if (!trendingDay) {
    return <LoadingState />;
  }

  if (!usersMongoDb && !user) {
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
    loginWithRedirect,
    usersMongoDb,
    setUsersMongoDb,
    userContextData,
    people,
    searchItemsMovies,
    setSearchItemsMovies,
    upcomingMovies,
    onClickId,
    setOnClickId,
    searchItemsTv,
    setSearchItemsTv,
    searchItemsPerson,
    setSearchItemsPerson,
    searchItemsCompanies,
    setSearchItemsCompanies,
    allIsTopRated,
    setAllIsTopRated,
    allIsDayTr,
    setAllIsDayTr,
    allIsWeekTr,
    setAllIsWeekTr,
    allIsUpcoming,
    setAllIsUpcoming,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
