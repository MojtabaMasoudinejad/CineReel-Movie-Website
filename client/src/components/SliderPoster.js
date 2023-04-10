import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const SliderPoster = () => {
  const { topRated } = useContext(UserContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = topRated.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  //   }, 2500);
  //   return () => clearTimeout(timer);
  // }, [currentSlide]);

  return (
    <MainDiv>
      <Slider>
        <SlArrowLeft
          size="100"
          onMouseOver={({ target }) => (target.style.color = "#2d3436")}
          onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
          color="#b2bec3"
          onClick={() => prevSlide()}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "40%",
            left: "32px",
            zIndex: "10",
            userSelect: "none",
          }}
        />
        <SlArrowRight
          size={100}
          onMouseOver={({ target }) => (target.style.color = "#2d3436")}
          onMouseOut={({ target }) => (target.style.color = "#b2bec3")}
          color="#b2bec3"
          onClick={() => nextSlide()}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "40%",
            right: "32px",
            zIndex: "10",
            userSelect: "none",
          }}
        />
        {topRated.map((item, index) => {
          return (
            <div key={index}>
              {index === currentSlide && (
                <div
                  style={{
                    opacity: "1",
                    transitionDuration: "1s",
                    transform: "scale(1.08)",
                  }}
                >
                  {/* <div>{item.title ? item.title : item.name}</div> */}
                  <Link to={`/movie/${item.id}`}>
                    <ImgPosterSlyder
                      src={`http://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                      alt="movie poster"
                    />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </Slider>
    </MainDiv>
  );
};

export default SliderPoster;

const MainDiv = styled.div`
  margin: 20px 20px;
  /* height: 700px; */
`;

const Slider = styled.div`
  position: relative;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgPosterSlyder = styled.img`
  width: 60vw;
  /* height: 300; */
  border-radius: 10px;
  margin: 20px 0;
`;
