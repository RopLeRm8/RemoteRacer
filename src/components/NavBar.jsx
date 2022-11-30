import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/joy/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.svg";
import logoblack from "../assets/logoblack.svg";

import { createTheme, Fade, ThemeProvider, Slider, Stack } from "@mui/material";
import { auth } from "../providers/FirebaseProvider";
import { useLoadFonts } from "../providers/FontProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BrushIcon from "@mui/icons-material/Brush";
import InfoIcon from "@mui/icons-material/Info";
import Zoom from "@mui/material/Zoom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import hoverlogo from "../assets/hoverlogo.gif";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useMemo } from "react";

const pages = [
  [
    "טבלת לידרים",
    <LeaderboardIcon key="<LeaderboardIcon />" />,
    "rgba(63, 195, 128)",
    "!כאן תוכלו לראות מי מוביל בנקודות",
  ],
  [
    "עיצוב אישי",
    <BrushIcon key="<BrushIcon />" />,
    "rgba(175, 65, 84)",
    "עיצוב אישי לאוטו",
  ],
  [
    "עלינו",
    <InfoIcon key="<InfoIcon />" />,
    "rgba(159, 90, 253)",
    "מידע על האתר והמייסדים שלו",
  ],
];
const settings = [
  ["פרופיל", <AccountBoxIcon key="accountBox" />],
  ["יציאה", <LogoutIcon key="Logout" />],
];

function Navbar() {
  useLoadFonts();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mode, setMode] = useState("dark");

  const [user] = useAuthState(getAuth());

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  const handleCloseUserMenu = (setting) => {
    setting && setting === "יציאה" && auth.signOut();
    setting && setting === "פרופיל" && navigate("/profile");

    return setAnchorElUser(null);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const colorMode = useMemo(
    () => ({
      switchColor: (_, val) => {
        setMode(val === 0 ? "dark" : "light");
      },
    }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <Fade in={true}>
        <AppBar position="static" sx={{ bgcolor: "background.default" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <a href="/">
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    width: "12%",
                    maxHeight: "100px",
                    mr: 5,
                    mt: 1,
                  }}
                >
                  <img
                    src={mode === "light" ? logoblack : logo}
                    width="96"
                    height="96"
                  />
                </Box>
              </a>

              <Box sx={{ flexGrow: 2.5, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  sx={{ color: "text.primary" }}
                  size="large"
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
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <IconButton>{page[1]} </IconButton>
                      <Typography textAlign="center">{page[0]}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: -2,
                  flexGrow: 0.9,
                }}
              >
                <a href="/">
                  <img
                    src={mode === "light" ? logoblack : logo}
                    width="96"
                    height="96"
                  />
                </a>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Tooltip
                    arrow
                    title={
                      <Typography style={{ fontSize: 16 }}>
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
                      onClick={handleCloseNavMenu}
                      sx={{
                        "&:hover": {
                          color: page[2],
                        },
                        fontFamily: "Noto Sans Hebrew",
                        my: 2,
                        mx: 2.5,
                        color: "text.primary",
                        fontSize: 18,
                      }}
                    >
                      {page[0]}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{
                  flexGrow: { md: 0.8, xs: 0.5, sm: 0.3, lg: 0.03 },
                  mx: { md: 10, sm: 6 },
                }}
              >
                <DarkModeOutlinedIcon
                  sx={{ color: mode === "dark" ? "white" : "black" }}
                />
                <Slider
                  color={mode === "dark" ? "info" : "warning"}
                  min={0}
                  max={1}
                  onChange={colorMode.switchColor}
                />
                <LightModeOutlinedIcon
                  sx={{ color: mode === "dark" ? "white" : "black" }}
                />
              </Stack>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="לפתוח הגדרות">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.photoURL}
                      sx={{ color: "white", width: 50, height: 50 }}
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
                      <Typography textAlign="center" sx={{ ml: 2 }}>
                        {setting[0]}
                      </Typography>
                      <IconButton sx={{ ml: setting[0] === "יציאה" ? 1 : 0 }}>
                        {setting[1]}{" "}
                      </IconButton>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Fade>
    </ThemeProvider>
  );
}
export default Navbar;
