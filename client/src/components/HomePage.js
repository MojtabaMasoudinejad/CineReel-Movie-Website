import Footer from "../footer/Footer";
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
