import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./UserContext";
import GlobalStyles from "./GlobalStyles";

import Header from "./Header";
import HomePage from "./HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
