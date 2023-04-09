import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../UserContext";

// import { withBaseIcon } from "react-icons-kit";
// import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import LoadingState from "./LoadingState";

// const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetails = () => {
  const { trendingDay, trendingWeek, topRated } = useContext(UserContext);
  console.log("trendingDay", trendingDay);

  const [currentMovieDetail, setCurrentMovieDetail] = useState();
  const { movie_id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    {
      !currentMovieDetail &&
        trendingDay.map((item) => {
          if (item.id.toString() === movie_id) {
            console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }
    {
      !currentMovieDetail &&
        trendingWeek.map((item) => {
          if (item.id.toString() === movie_id) {
            console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }
    {
      !currentMovieDetail &&
        topRated.map((item) => {
          if (item.id.toString() === movie_id) {
            console.log(item);
            setCurrentMovieDetail(item);
          }
        });
    }
  }, [movie_id]);

  if (!currentMovieDetail) {
    return <LoadingState />;
  }

  return (
    <MainDiv>
      <div style={{ width: "80%" }}>
        <MovieBackdrop
          src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.backdrop_path}`}
        />
      </div>
      <MovieData>
        <div style={{ marginRight: "30px" }}>
          <div className="movie__posterBox">
            <MoviePoster
              src={`http://image.tmdb.org/t/p/w500${currentMovieDetail.poster_path}`}
            />
          </div>
        </div>
        <MovieDataRight>
          <MovieDetail className="movie__detailRightTop">
            <div style={{ fontWeight: "600", fontSize: "3rem" }}>
              {currentMovieDetail.original_title}
            </div>
            {/* <div className="movie__tagline">{currentMovieDetail.tagline}</div> */}
            <div className="movie__rating">
              {currentMovieDetail.vote_average}
              <i />
              <span style={{ marginLeft: "1rem" }}>
                {"(" + currentMovieDetail.vote_count + ") votes"}
              </span>
            </div>
            {/* <div className="movie__runtime">
              {currentMovieDetail.runtime + " mins"}
            </div> */}
            <div className="movie__releaseDate">
              {"Release date: " + currentMovieDetail.release_date}
            </div>
            {/* <span style={{ margin: "1.25rem 0", display: "flex" }}>
              {currentMovieDetail.genres.map((genre, index) => (
                <div key={index}>
                  <MovieGenre id={genre.id}>{genre.name}</MovieGenre>
                </div>
              ))}
            </span> */}
          </MovieDetail>
          <div style={{ margin: "2rem 0", flex: "0.8" }}>
            <TextSynopsis>Synopsis</TextSynopsis>
            <div>{currentMovieDetail.overview}</div>
          </div>
        </MovieDataRight>
      </MovieData>
      <MovieLink>
        <div style={{ fontSize: "2.2rem", color: "white" }}>Useful Links</div>
        {currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <MovieButton style={{ backgroundColor: "rgb(255, 0, 0)" }}>
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </MovieButton>
            </p>
          </a>
        )}

        {/* <a
          href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <p>
            <MovieButton style={{ backgroundColor: "#f3ce13" }}>
              IMDb
              <i
                style={{ marginLeft: "1.4rem" }}
                className=" fas fa-external-link-alt"
              ></i>
            </MovieButton>
          </p>
        </a> */}
      </MovieLink>
      <div style={{ color: "white" }} className="movie__heading">
        Production companies
      </div>
      {/* <MovieProduction>
        {currentMovieDetail.production_companies.map((company, index) => (
          <div key={index}>
            {company.logo_path && (
              <ProductionCompany>
                <img
                  style={{ width: "200px", margin: "2rem" }}
                  src={
                    "https://image.tmdb.org/t/p/original" + company.logo_path
                  }
                  alt="Company Logo"
                />
                <span>{company.name}</span>
              </ProductionCompany>
            )}
          </div>
        ))}
      </MovieProduction> */}
    </MainDiv>
  );
};

export default MovieDetails;

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
`;

const MovieBackdrop = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 0 35%;
`;

const MovieData = styled.div`
  align-items: center;
  width: 75%;
  display: flex;
  position: relative;
  bottom: 225px;
`;

const MoviePoster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;
`;

const MovieDataRight = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
`;

const MovieGenre = styled.span`
  padding: 0.5rem;
  border: 2px solid white;
  border-radius: 20px;
  margin-right: 1rem;
`;

const TextSynopsis = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  display: flex;
  position: relative;
  align-items: center;
`;

const MovieLink = styled.div`
  position: relative;
  bottom: 120px;
  display: flex;
  justify-content: space-between;
  width: 75%;
`;

const MovieButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  width: 150px;
  color: black;
  font-weight: bold;
`;

const MovieProduction = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 4rem;
`;

const ProductionCompany = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MovieDetail = styled.div`
  text-shadow: 0px 0px 5px #000000;
  margin-bottom: 0.5rem;
`;
