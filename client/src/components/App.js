import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "../UserContext";
import GlobalStyles from "../GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";
import Trending from "./Trending";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
