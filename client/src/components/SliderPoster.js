import { useContext, useState } from "react";
import styled from "styled-components";

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

  return (
    <MainDiv>
      <Slider>
        <SlArrowLeft
          size={100}
          color="red"
          onClick={() => prevSlide()}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "32px",
            zIndex: "10",
            userSelect: "none",
          }}
        />
        <SlArrowRight
          size={100}
          color="red"
          onClick={() => nextSlide()}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "50%",
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
                  <div>{item.title ? item.title : item.name}</div>
                  <ImgPosterSlyder
                    src={`http://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt="movie poster"
                  />
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
`;

const Slider = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgPosterSlyder = styled.img`
  width: 1000px;
  height: 600px;
  border-radius: 10px;
`;
