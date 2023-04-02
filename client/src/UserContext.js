import { createContext, useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

const API_KEY = process.env.REACT_APP_API_KEY;

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [trendingDay, setTrendingDay] = useState(null);
  const [trendingWeek, setTrendingWeek] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [popularPeople, setPopularPeople] = useState(null);

  console.log("trendingDay", trendingDay);
  //   console.log("PPeople", popularPeople);

  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
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
        setTrendingDay(data1.results);
        setTrendingWeek(data2.results);
        setTopRated(data3.results);
        setPopularPeople(data4.results);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  if (!trendingDay) {
    return (
      <div>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </div>
    );
  }

  const contextValue = {
    trendingDay,
    trendingWeek,
    topRated,
    popularPeople,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.2;
`;
