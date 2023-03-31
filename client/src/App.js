import { BrowserRouter, Route, Routes } from "react-router-dom";

import FetchTest from "./FetschTest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FetchTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
