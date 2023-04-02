import { useState, useContext } from "react";

import MovieCard from "./MovieCard";
import { UserContext } from "../UserContext";

export const Trending = () => {
  const { trendingDay, trendingWeek } = useContext(UserContext);

  const [trDay, setTrDay] = useState(true);
  const [trWeek, setTrWeek] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setTrDay(true);
            setTrWeek(false);
          }}
        >
          trendingDay
        </button>
        <button
          onClick={() => {
            setTrWeek(true);
            setTrDay(false);
          }}
        >
          trendingWeek
        </button>
      </div>
      {trDay &&
        trendingDay.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
      {trWeek &&
        trendingWeek.map((specificMovie, index) => {
          return <MovieCard key={index} specificMovie={specificMovie} />;
        })}
    </div>
  );
};

export default Trending;
