import styled from "styled-components";

import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <MainDIv>
      <NavContainer>
        <div>IMDB</div>

        <StyledNav to={"/trending"}>Trending</StyledNav>
        <StyledNav to={"/top-rated"}>Top Rated</StyledNav>
        <StyledNav to={"/people"}>People</StyledNav>
      </NavContainer>
      <UserContainer>
        <FaUser size={35} />
      </UserContainer>
    </MainDIv>
  );
};

export default Header;

const MainDIv = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98.9vw;
  background-color: black;
  height: 70px;
  /* z-index: 2; */
  color: white;
  top: 0;
`;
const NavContainer = styled.div`
  margin: 0px 2%;
  display: flex;
  width: fit-content;
  gap: 60px;
  justify-content: space-between;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10%;
  margin: 0px 5%;
  position: relative;
`;

const StyledNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;
