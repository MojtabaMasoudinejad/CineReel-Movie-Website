import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "../UserContext";
import GlobalStyles from "../GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";
import Trending from "./Trending";
import Profile from "./Profile";
import People from "./People";
import PersonProfile from "./PersonProfile";
import SearchPage from "./SearchPage";
import ErrorMoviePage from "./ErrorMoviePage";
import MovieDetailsNewNew from "./MovieDetailsNewNew";
import Pricing from "./Pricing";
import AllMovies from "./AllMovies";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:movie_id" element={<MovieDetailsNewNew />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:people_id" element={<PersonProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/error" element={<ErrorMoviePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/allMovies" element={<AllMovies />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
