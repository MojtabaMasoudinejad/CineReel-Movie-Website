import { useContext } from "react";

import { UserContext } from "../UserContext";
import MovieCardWithId from "./MovieCardWithId";
import PeopleCard from "./PeopleCard";

const SearchPage = () => {
  const { searchItems, setSearchItems } = useContext(UserContext);

  return (
    <div>
      {searchItems &&
        searchItems.map((item, index) => {
          if (item.backdrop_path) {
            if (item.media_type === "movie" || item.media_type === "tv") {
              return <MovieCardWithId key={index} movie_id={item.id} />;
            } else if (item.media_type === "person") {
              return <PeopleCard people_id={item.id} />;
            }
          }
        })}
    </div>
  );
};

export default SearchPage;
