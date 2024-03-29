import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import { UserProvider } from "../UserContext";
import GlobalStyles from "../GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import People from "./People";
import PersonProfile from "./PersonProfile";
import SearchPage from "./SearchPage";
import MovieDetailsNewNew from "./MovieDetailsNewNew";
import Pricing from "./Pricing";
import AllMovies from "./AllMovies";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movie Website</title>
      </Helmet>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movie_id" element={<MovieDetailsNewNew />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:people_id" element={<PersonProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/allMovies" element={<AllMovies />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
