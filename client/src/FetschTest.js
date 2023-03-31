import { useEffect, useState } from "react";
// import styled from "styled-components";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

const FetchTest = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.results);
        console.log(resData.results);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>Hello World!</div>
      <div>
        {data.map((item) => {
          return <div>{item.title}</div>;
        })}
      </div>
    </>
  );
};

export default FetchTest;
