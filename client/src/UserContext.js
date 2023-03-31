import { createContext, useState } from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

const API_KEY = process.env.REACT_APP_API_KEY;

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  console.log(data);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.results);
        // console.log(resData.results);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  if (!data) {
    return (
      <div>
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </div>
    );
  }

  const contextValue = {
    data,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.2;
`;
