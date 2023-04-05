import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "../UserContext";
import GlobalStyles from "../GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";
import Trending from "./Trending";
import MovieDetails from "./MovieDetails";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:movie_id" element={<MovieDetails />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
