import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "../UserContext";
import GlobalStyles from "../GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";
import Trending from "./Trending";
import Profile from "./Profile";
import People from "./People";
import PersonProfile from "./PersonProfile";

import MovieDetailsNewNew from "./MovieDetailsNewNew";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:movie_id" element={<MovieDetailsNewNew />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:people_id" element={<PersonProfile />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
