// import { useContext, useState } from "react";
// import styled from "styled-components";

// import { UserContext } from "../UserContext";
// import SliderPoster from "./SliderPoster";

// import MovieCard from "./MovieCard";
// import Profile from "./Profile";
// import Comments from "../Comments/Comments";
// import SearchBar from "./SearchBar";
import Footer from "../footer/Footer";
// import AvatarProfile from "../AvatarProfile";
// import img from "../Assets/bg-presentation.jpg";
// import Pricing from "./Pricing";
import CoverImg from "../HomepageComponents/CoverImg";
import TopRatedCover from "../HomepageComponents/TopRatedCover";
import CoverPouplarMovies from "../HomepageComponents/CoverPouplarMovies";
import CoverTrendings from "../HomepageComponents/CoverTrendings";
import CoverUpComing from "../HomepageComponents/CoverUpComing";

const HomePage = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  return (
    <div>
      <CoverImg />
      <CoverPouplarMovies />
      <CoverTrendings />
      <TopRatedCover />
      <CoverUpComing />
      <Footer />
    </div>
  );
};

export default HomePage;

// const MainDiv = styled.div`
//   margin: 20px 20px;
// `;

// const DivSlidePoster = styled.div`
//   margin-bottom: 20px;
// `;

// const ButtonBox = styled.div`
//   display: flex;
//   width: 220px;
//   /* margin: 35px auto; */
//   margin: 20px 0;
//   position: relative;
//   border-radius: 30px;
//   background: white;
//   border: 1px solid black;
// `;
// const BtnDiv = styled.div`
//   left: 0;
//   top: 0;
//   position: absolute;
//   width: 110px;
//   height: 100%;
//   background: #74b9ff;
//   border-radius: 30px;
//   transition: 0.5s;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   cursor: pointer;
//   background: transparent;
//   border: 0;
//   outline: none;
//   position: relative;
//   text-align: center;
// `;

// const CoverImg = styled.div`
//   /* position: absolute; */
//   top: 0;
//   background-image: url(${img});
//   min-height: 100vh;
//   /* width: 100%; */
//   background-size: "cover";
//   background-position: "top";
//   display: "grid";
//   place-items: "center";
// `;
