import { BrowserRouter, Route, Routes } from "react-router-dom";

import FetchTest from "./FetschTest";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <BrowserRouter>
      {/* <GlobalStyles /> */}
      {/* <Sidebar /> */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<FetchTest />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
