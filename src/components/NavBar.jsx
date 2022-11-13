import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { createTheme, Fade, ThemeProvider } from "@mui/material";
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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Fade in={true}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <TimeToLeaveIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/dashboard"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  letterSpacing: ".05rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RemoteRacer
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
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
              <TimeToLeaveIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href=""
                sx={{
                  fontFamily: "Noto Sans Hebrew",
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 500,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RemoteRacer
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Tooltip
                    title={page[3]}
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
                        mx: 1.5,
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      {page[0]}
                    </Button>
                  </Tooltip>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="לפתוח הגדרות">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.photoURL}
                      sx={{ color: "white" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
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
