import { useContext } from "react";
// import styled from "styled-components";

import { UserContext } from "./UserContext";

const HomePage = () => {
  const { trendingDay } = useContext(UserContext);

  return (
    <>
      <div>
        Home Page
        {/* {trendingDay.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })} */}
      </div>
    </>
  );
};

export default HomePage;
