import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import logo from "../assets/Global/logoblack.png";

import { getAuth } from "@firebase/auth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BrushIcon from "@mui/icons-material/Brush";
import InfoIcon from "@mui/icons-material/Info";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { auth } from "../providers/FirebaseProvider";
import { useLoadFonts } from "../providers/FontProvider";

const pages = [
  [
    "LeaderBoard",
    <LeaderboardIcon key="<LeaderboardIcon />" />,
    "rgba(63, 195, 128)",
    "See who leads now",
    "/leaderboard",
  ],
  [
    "Customize",
    <BrushIcon key="<BrushIcon />" />,
    "rgba(175, 65, 84)",
    "Custom car design",
    "/customize",
  ],
  [
    "About Us",
    <InfoIcon key="<InfoIcon />" />,
    "rgba(159, 90, 253)",
    "Informative Page",
    "/about",
  ],
];
const settings = [
  ["Profile", <AccountBoxIcon key="accountBox" />],
  ["Sign Out", <LogoutIcon key="Logout" />],
];

function Navbar() {
  const [scrollTop, setScrollTop] = useState(0);
  const navigate = useNavigate();
  useLoadFonts();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [user] = useAuthState(getAuth());

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (typeof page === "object") return;
    navigate(page);
  };

  const handleCloseUserMenu = (setting) => {
    setting && setting === "Sign Out" && auth.signOut();
    setting && setting === "Profile" && navigate("/profile");

    return setAnchorElUser(null);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#ffe500",
        animation:
          scrollTop > window.innerHeight * 0.2 ? "fadein 0.4s forwards" : null,
        animationDirection:
          scrollTop > window.innerHeight * 0.2 ? "reverse" : "normal",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <a href="/">
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "100%",
                maxHeight: "100px",
                my: 1,
                mr: 3,
              }}
            >
              <img src={logo} width="130" height="80" alt="" />
            </Box>
          </a>

          <Box sx={{ flexGrow: 0.9, display: { xs: "flex", md: "none" } }}>
            <IconButton
              sx={{ color: "black" }}
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handleCloseNavMenu(page[4])}
                >
                  <IconButton>{page[1]} </IconButton>
                  <Typography
                    sx={{ color: "black", fontSize: 15 }}
                    textAlign="center"
                  >
                    {page[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: -2,
              my: 1.2,
              flexGrow: { xs: 0.3, md: 1 },
            }}
          >
            <a href="/">
              <img src={logo} width="130" height="83" alt="" />
            </a>
          </Box>

          <Box
            sx={{
              flexGrow: 0.87,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              mr: 7,
            }}
          >
            {pages.map((page) => (
              <Tooltip
                variant="outlined"
                arrow
                title={
                  <Typography
                    style={{
                      fontSize: 13,
                      fontFamily: "Inter",
                      animation: "fadein 0.3s forwards",
                    }}
                  >
                    {page[3]}
                  </Typography>
                }
                key={page[3]}
              >
                <Button
                  variant="plain"
                  color="warning"
                  key={page}
                  startDecorator={page[1]}
                  onClick={() => handleCloseNavMenu(page[4])}
                  sx={{
                    "&:hover": {
                      color: page[2],
                    },
                    fontFamily: "Poppins",
                    my: 2,
                    ml: 3,
                    color: "black",
                    fontSize: 16,
                    fontWeight: 500,
                    justifyContent: "center",
                  }}
                >
                  {page[0]}
                </Button>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <IconButton color="warning" variant="plain">
              <SettingsSuggestIcon />
            </IconButton>
            <Tooltip
              title={
                <Typography style={{ fontSize: 13, fontFamily: "Montserrat" }}>
                  Profile Settings
                </Typography>
              }
            >
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  backgroundColor: "rgba(0,0,0,0)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0)",
                  },
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user?.photoURL}
                  sx={{
                    color: "white",
                    "--Avatar-size": { xs: "35px", md: "50px" },
                    ml: 3,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "55px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting[0]}
                  onClick={() => handleCloseUserMenu(setting[0])}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      ml: 2,
                      color: "black",
                    }}
                  >
                    {setting[0]}
                  </Typography>
                  <IconButton
                    sx={{
                      ml: setting[0] === "יציאה" ? 1 : 0,
                      color: "black",
                      backgroundColor: "rgba(0,0,0,0)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0)",
                      },
                    }}
                  >
                    {setting[1]}{" "}
                  </IconButton>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
