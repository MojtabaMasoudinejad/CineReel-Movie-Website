import { useContext } from "react";

import { UserContext } from "../UserContext";
import MovieCardWithId from "./MovieCardWithId";
import PeopleCard from "./PeopleCard";

const SearchPage = () => {
  const { searchItems, setSearchItems } = useContext(UserContext);
  console.log(searchItems);
  return (
    <div>
      {searchItems && searchItems.length !== 0 ? (
        searchItems.map((item, index) => {
          if (item.media_type === "movie" || item.media_type === "tv") {
            if (item.backdrop_path) {
              return <MovieCardWithId key={index} movie_id={item.id} />;
            }
          } else if (item.media_type === "person") {
            if (item.profile_path) {
              return <PeopleCard key={index} people_id={item.id} />;
            }
          }
        })
      ) : (
        <div>no results for this keyword</div>
      )}
    </div>
  );
};

export default SearchPage;
