import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/joy/Box";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import logo from "../assets/Global/logoblack.png";

import { getAuth } from "@firebase/auth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BrushIcon from "@mui/icons-material/Brush";
import InfoIcon from "@mui/icons-material/Info";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Slide } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
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
    navigate(page);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setting && setting === "Sign Out" && auth.signOut();
    setting && setting === "Profile" && navigate("/profile");

    return setAnchorElUser(null);
  };

  return (
    <Slide in={true} direction="down">
      <AppBar position="static" sx={{ bgcolor: "#ffe500" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <a href="/">
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: "100%",
                  maxHeight: "100px",
                  my: 1,
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
                flexGrow: 1,
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
                  arrow
                  title={
                    <Typography
                      style={{ fontSize: 13, fontFamily: "Montserrat" }}
                    >
                      {page[3]}
                    </Typography>
                  }
                  key={page[3]}
                  TransitionComponent={Zoom}
                  enterDelay={500}
                >
                  <Button
                    key={page}
                    endIcon={page[1]}
                    onClick={() => handleCloseNavMenu(page[4])}
                    sx={{
                      "&:hover": {
                        color: page[2],
                      },
                      fontFamily: "Montserrat",
                      my: 2,
                      mx: 2,
                      color: "black",
                      fontSize: 15,
                      fontWeight: 600,
                      justifyContent: "center",
                    }}
                  >
                    {page[0]}
                  </Button>
                </Tooltip>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title={
                  <Typography
                    style={{ fontSize: 13, fontFamily: "Montserrat" }}
                  >
                    Profile Settings
                  </Typography>
                }
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.photoURL}
                    sx={{
                      color: "white",
                      width: 50,
                      height: 50,
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
    </Slide>
  );
}
export default Navbar;
