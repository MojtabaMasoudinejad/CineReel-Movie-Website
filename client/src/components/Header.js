import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <MainDIv>
      <NavContainer>
        <StyledNav to={"/"}>IMDB </StyledNav>
        <StyledNav>All Movies</StyledNav>
        <StyledNav to={"/trending"}>Trending</StyledNav>
        <StyledNav to={"/top-rated"}>Top Rated</StyledNav>
        <StyledNav to={"/people"}> People</StyledNav>
      </NavContainer>
      {/* <UserContainer>
        {isAuthenticated ? (
          <StyledNav to={"/profile"}>
            <FaUser size={35} />
          </StyledNav>
        ) : (
          ""
        )}
        <LogInButton />
        <LogOutButton />
      </UserContainer> */}
      <UserContainer>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {!isAuthenticated ? (
            <MenuItem onClick={() => loginWithRedirect()}>
              <Avatar /> Login
            </MenuItem>
          ) : (
            ""
          )}
          {isAuthenticated ? (
            <MenuItem onClick={() => navigateProfile()}>
              <Avatar /> Profile
            </MenuItem>
          ) : (
            ""
          )}

          {isAuthenticated ? <Divider /> : ""}

          {isAuthenticated ? (
            <MenuItem onClick={() => logout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          ) : (
            ""
          )}
        </Menu>
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
