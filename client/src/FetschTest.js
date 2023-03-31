import { useContext } from "react";
// import styled from "styled-components";

import { UserContext } from "./UserContext";

const FetchTest = () => {
  const { data } = useContext(UserContext);

  return (
    <>
      <div>Hello World!</div>
      <div>
        {data.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })}
      </div>
    </>
  );
};

export default FetchTest;
