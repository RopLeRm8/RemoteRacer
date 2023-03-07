import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import LoadingButton from "@mui/lab/LoadingButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useCallback, useRef, useState } from "react";
import logo from "../assets/Global/logo.png";
import logoblack from "../assets/Global/logoblack.png";

import { getAuth } from "@firebase/auth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BrushIcon from "@mui/icons-material/Brush";
import CheckIcon from "@mui/icons-material/Check";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NetworkPingIcon from "@mui/icons-material/NetworkPing";
import RadarIcon from "@mui/icons-material/Radar";
import SearchIcon from "@mui/icons-material/Search";
import SensorsIcon from "@mui/icons-material/Sensors";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
import SupportIcon from "@mui/icons-material/Support";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import {
  Autocomplete,
  Button,
  Chip,
  CssVarsProvider,
  Divider,
  FormControl,
  FormLabel,
} from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Button as MUIButt,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { useNotification } from "../hooks/useNotification";
import useSignalStrength from "../hooks/useSignalStrength";
import { auth } from "../providers/FirebaseProvider";

const pages = [
  [
    "LEADERBOARD",
    <LeaderboardIcon key="<LeaderboardIcon />" />,
    "rgba(63, 195, 128)",
    "See who leads now",
    "/leaderboard",
  ],
  [
    "CUSTOMIZE",
    <BrushIcon key="<BrushIcon />" />,
    "rgba(175, 65, 84)",
    "Custom car design",
    "/customize",
  ],
  [
    "ABOUT US",
    <InfoIcon key="<InfoIcon />" />,
    "rgba(159, 90, 253)",
    "Informative Page",
    "/about",
  ],
  [
    "Getting started",
    <StartIcon key="<StartIcon/>" />,
    "rgba(241, 90, 34)",
    "FAQ page",
    "/gettingstarted",
  ],
  [
    "SUPPORT",
    <SupportIcon key="<SupportIcon/>" />,
    "rgba(20, 52, 164)",
    "Let us know if you need Getting started",
    "/contact",
  ],
  ["MORE", <MoreHorizIcon key="<MoreHorizIcon/>" />],
];
const settings = [
  ["Profile", <AccountBoxIcon key="accountBox" />],
  ["Game History", <HistoryIcon key="history" />],
  [
    "ESP Settings",
    <SettingsIcon
      sx={{
        animation: "rotate 5s linear infinite",
      }}
      key="settings"
    />,
  ],
  ["Sign Out", "red"],
];
function Navbar() {
  const [scrollTop, setScrollTop] = useState(0);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [networkList, setNetworkList] = useState([]);
  const [passwordEntry, setPasswordEntry] = useState({});
  const [passwordEntryValue, setPasswordEntryValue] = useState({});
  const [connectLoading, setConnectLoading] = useState(false);
  const [disconnectButton, setDisconnectButton] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const moreRef = useRef();
  const notify = useNotification();

  const [user] = useAuthState(getAuth());

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page, pageName) => {
    if (pageName === "MORE") {
      setIsRotated((prev) => !prev);
      if (anchorEl === null) {
        setAnchorEl(moreRef.current);
      } else setAnchorEl(null);
    }
    setAnchorElNav(null);
    if (typeof page === "object" || page === null) return;
    navigate(page);
  };

  const handleCloseUserMenu = (setting) => {
    setting && setting === "Sign Out" ? auth.signOut() : null;
    setting && setting === "Profile" ? navigate("/profile") : null;
    setting && setting === "ESP Settings" ? setopenModal(true) : null;

    return setAnchorElUser(null);
  };

  const handleScan = useCallback(() => {
    setScanLoading(true);
    setNetworkList([]);
    setPasswordEntry([]);
    setPasswordEntryValue([]);
    const ip = localStorage.getItem("ip");
    fetch(`http://${ip}/scan`)
      .then((response) => response.json())
      .then((data) => {
        setNetworkList(data);
      })
      .catch((err) => {
        notify("Connection failed to ESP server, " + err, {
          variant: "error",
        });
        throw new Error("Check if you are the same network as ESP");
      })
      .finally(() => {
        setScanLoading(false);
      });
  }, [notify]);

  const handlePasswordEntry = useCallback((ssid) => {
    setPasswordEntry((prev) => ({
      ...prev,
      [ssid]: !prev[ssid],
    }));
  }, []);
  const handlePasswordChange = useCallback((e, ssid) => {
    setPasswordEntryValue((prev) => ({ ...prev, [ssid]: e.target.value }));
  }, []);

  const handleConnectToWifi = (ssid) => {
    setConnectLoading((prev) => ({ ...prev, [ssid]: true }));
    if (!passwordEntryValue[ssid] || passwordEntryValue[ssid].length <= 0) {
      passwordEntryValue[ssid] = "";
    }
    const ip = localStorage.getItem("ip");
    const _connData = {
      ssid: ssid,
      password: passwordEntryValue[ssid],
    };
    fetch(`http://${ip}/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_connData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data.substring(0, 2) === "ok") {
          localStorage.setItem("ip", data.substring(3));
          localStorage.setItem("blackListSSID", ssid);
          passwordEntry[ssid] = false;
          notify(
            `Successfully connected to AP ${ssid}! IP Address: ${data.substring(
              3
            )}`,
            { variant: "success", autoHideDuration: 10000 }
          );
        } else {
          notify("Wrong password provided", { variant: "error" });
        }
      })
      .catch(() => {
        notify("An error occured, try again!", { variant: "error" });
      })
      .finally(() => setConnectLoading((prev) => ({ ...prev, [ssid]: false })));
  };
  const handleDisconnect = () => {
    const ip = localStorage.getItem("ip");
    setDisconnectButton(true);
    fetch(`http://${ip}/disconnect`)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        localStorage.setItem("ip", "192.168.4.1");
        localStorage.setItem("blackListSSID", null);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDisconnectButton(false);
      });
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
        maxWidth: "100%",
        bgcolor: "#ffe500",
        animation:
          scrollTop > window.innerHeight * 0.2 ? "fadein 0.4s forwards" : null,
        animationDirection:
          scrollTop > window.innerHeight * 0.2 ? "reverse" : "normal",
      }}
    >
      <Container maxWidth="xl">
        <CssVarsProvider />

        <Toolbar>
          <a href="/">
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "88%",
                maxHeight: "100px",
                my: 3,
                mr: 3,
                background: location.pathname === "/dashboard" ? "black" : "",
                borderRadius: "5px",
                p: location.pathname === "/dashboard" ? 1 : 0,
              }}
            >
              <img
                src={location.pathname === "/dashboard" ? logo : logoblack}
                width="267.8"
                height="32"
                alt=""
              />
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
                  onClick={() => handleCloseNavMenu(page[4], page[0])}
                >
                  <IconButton
                    sx={{
                      color: "black",
                      backgroundColor: "rgba(0,0,0,0)",
                      "--IconButton-size": "5px",
                    }}
                  >
                    {page[1]}
                  </IconButton>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: 12,
                      fontFamily: "Inter",
                      display: "flex",
                      alignItems: "center",
                    }}
                    textAlign="center"
                  >
                    {page[0]}

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => {
                        setAnchorEl(null);
                        setIsRotated(false);
                      }}
                    >
                      <MenuItem
                        onClick={(e) => e.stopPropagation()}
                        disableRipple
                        sx={{
                          zIndex: 1650,
                        }}
                      >
                        <Autocomplete
                          startDecorator={<SearchIcon />}
                          color="warning"
                          placeholder="Search players"
                          blurOnSelect
                          clearOnEscape
                          selectOnFocus
                          options={[
                            "Call of Duty",
                            "Fortnite",
                            "Overwatch",
                            "Minecraft",
                            "League of Legends",
                          ]}
                          noOptionsText="No players found"
                          slotProps={{
                            listbox: {
                              sx: {
                                maxHeight: "200px",
                                position: "relative",
                                zIndex: 1850,
                              },
                            },
                          }}
                        />
                      </MenuItem>
                    </Menu>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              my: 2,
              ml: 5,
              flexGrow: { xs: 0, sm: 0.75, md: 1 },
            }}
          >
            <a href="/">
              <img src={logo} height="25" alt="" style={{ maxWidth: "100%" }} />
            </a>
          </Box>

          <Box
            sx={{
              flexGrow: 0.1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <MUIButt
                variant={location.pathname === page[4] ? "contained" : "text"}
                color="inherit"
                key={page}
                startIcon={page[1]}
                onClick={() => handleCloseNavMenu(page[4])}
                sx={{
                  fontFamily: "Poppins",
                  my: 2,
                  ml: 3,
                  px: { lg: 1.5 },
                  color: location.pathname === page[4] ? "white" : "black",
                  background: location.pathname === page[4] ? "black" : "",
                  "&:hover": {
                    background:
                      location.pathname === page[4] ? "rgba(0,0,0,0.8)" : "",
                  },
                  fontSize: 16,
                  fontWeight: 500,
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  display:
                    page[0] !== "Getting started" &&
                    page[0] !== "SUPPORT" &&
                    page[0] !== "MORE"
                      ? "flex"
                      : "none",
                }}
              >
                {page[0]}
              </MUIButt>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flexGrow: -5,
                display: { xs: "none", xl: "flex" },
                justifyContent: "center",
                alignItems: "center",
                mx: 1,
              }}
            >
              {pages.map((page) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={page[0]}
                >
                  <MUIButt
                    variant={
                      location.pathname === page[4] ? "contained" : "text"
                    }
                    color="inherit"
                    ref={moreRef}
                    key={page}
                    disabled={page[0] === "MORE" && isRotated}
                    startIcon={page[1]}
                    onClick={() => handleCloseNavMenu(page[4], page[0])}
                    sx={{
                      fontFamily: "Poppins",
                      my: 2,
                      px: { lg: 1.5 },
                      ml: page[0] !== "Getting started" ? 2 : 0,
                      color: location.pathname === page[4] ? "white" : "black",
                      background: location.pathname === page[4] ? "black" : "",
                      "&:hover": {
                        background:
                          location.pathname === page[4]
                            ? "rgba(0,0,0,0.8)"
                            : "rgba(0,0,0,0.1)",
                      },
                      fontWeight: 500,
                      fontSize: 16,
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      display:
                        page[0] === "Getting started" ||
                        page[0] === "SUPPORT" ||
                        page[0] === "MORE"
                          ? "flex"
                          : "none",
                    }}
                  >
                    {page[0]}
                    {page[0] === "MORE" ? (
                      <ArrowBackIcon
                        sx={{
                          transition: "transform 0.2s ease-in-out",
                          transform: isRotated ? "rotate(-90deg)" : "",
                          fontSize: "100%",
                          ml: 0.5,
                        }}
                      />
                    ) : null}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => {
                        setAnchorEl(null);
                        setIsRotated(false);
                      }}
                    >
                      <MenuItem
                        onClick={(e) => e.stopPropagation()}
                        disableRipple
                        sx={{
                          zIndex: 1650,
                        }}
                      >
                        <FormControl>
                          <FormLabel sx={{ fontFamily: "Inter" }}>
                            Seek for new players
                          </FormLabel>
                          <Autocomplete
                            startDecorator={<SearchIcon />}
                            color="warning"
                            placeholder="Search players"
                            blurOnSelect
                            clearOnEscape
                            selectOnFocus
                            options={[
                              "Call of Duty",
                              "Fortnite",
                              "Overwatch",
                              "Minecraft",
                              "League of Legends",
                            ]}
                            noOptionsText="No players found"
                            slotProps={{
                              listbox: {
                                sx: {
                                  maxHeight: "200px",
                                  position: "relative",
                                  zIndex: 1850,
                                },
                              },
                            }}
                          />
                        </FormControl>
                      </MenuItem>
                    </Menu>
                  </MUIButt>
                </Box>
              ))}
            </Box>
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
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Box key={setting[0]}>
                  <MenuItem
                    onClick={() => handleCloseUserMenu(setting[0])}
                    sx={{
                      display: "flex",
                      justifyContent:
                        typeof setting[1] === "string" ? "center" : "start",
                      "&:hover": {
                        backgroundColor:
                          typeof setting[1] === "string" && "rgba(0,0,0,0)",
                      },
                    }}
                  >
                    {typeof setting[1] !== "string" ? (
                      <>
                        <ListItemIcon
                          sx={{
                            color: "black",
                            backgroundColor: "rgba(0,0,0,0)",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0)",
                            },
                          }}
                        >
                          {setting[1]}
                        </ListItemIcon>

                        <Typography
                          textAlign="center"
                          sx={{
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "1.5vh",
                          }}
                        >
                          {setting[0]}
                        </Typography>
                      </>
                    ) : (
                      <Button
                        variant="plain"
                        color="danger"
                        size="sm"
                        startDecorator={<LogoutIcon />}
                      >
                        <Typography
                          textAlign="center"
                          sx={{ fontSize: "1.5vh" }}
                        >
                          {setting[0]}
                        </Typography>
                      </Button>
                    )}
                  </MenuItem>
                  <Divider
                    sx={{
                      display: setting[0] === "ESP Settings" ? "flex" : "none",
                      mx: 2,
                    }}
                  />
                </Box>
              ))}
            </Menu>
            <Tooltip
              variant="outlined"
              sx={{ animation: "fadein 0.5s forwards" }}
              title={
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "Inter",
                  }}
                >
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
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={openModal}
        onClose={() => {
          setopenModal(false);
          setNetworkList([]);
          setPasswordEntry([]);
          setPasswordEntryValue([]);
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          ESP NETWORK CONFIGURATION
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            spacing={{ xs: 1, md: 2 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              {/* <Grid container direction="column" spacing={5}>
                <Grid item>
                  <TextField
                    sx={{ maxWidth: { md: "80%" } }}
                    variant="standard"
                    label="SSID Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SignalWifi4BarIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    label="SSID Password"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, maxWidth: { md: "80%" } }}
                  />
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item>
              {scanLoading ? (
                <LoadingButton
                  loading
                  loadingPosition="end"
                  endIcon={<RadarIcon />}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  disableElevation
                  sx={{ mr: 1 }}
                >
                  Scanning
                </LoadingButton>
              ) : (
                <>
                  <Chip
                    variant="outlined"
                    startDecorator={<CheckIcon />}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "5px",
                      textAlign: "center",
                      mb: 1,
                    }}
                    color="success"
                  >
                    Connected to
                    {localStorage.getItem("blackListSSID") !== null &&
                    localStorage.getItem("blackListSSID") !== "null"
                      ? " " + localStorage.getItem("blackListSSID")
                      : " ESP"}
                    <br />
                    IP Address {localStorage.getItem("ip")}
                  </Chip>
                  <MUIButt
                    fullWidth
                    variant={networkList.length > 0 ? "text" : "outlined"}
                    onClick={handleScan}
                  >
                    SCAN FOR NETWORKS
                  </MUIButt>
                </>
              )}

              <List>
                <IconButton
                  sx={{
                    width: "100%",
                    mb: 1,
                    display: networkList.length > 0 ? "flex" : "none",
                  }}
                  size="sm"
                  variant="outlined"
                >
                  <NetworkPingIcon sx={{ mr: 1 }} />
                  {networkList[0]?.length}
                  {networkList[0]?.length === 1 ? " NETWORK " : " NETWORKS "}
                  FOUND
                </IconButton>
                {networkList.map((data) =>
                  data.map((network) => (
                    <Box key={network.ssid}>
                      <ListItem
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Grid container direction="column">
                          <Grid item>
                            <MUIButt
                              variant={
                                passwordEntry[network.ssid]
                                  ? "contained"
                                  : "outlined"
                              }
                              color="secondary"
                              startIcon={
                                network.encryption === "closed" ? (
                                  <LockIcon />
                                ) : null
                              }
                              endIcon={useSignalStrength(network.rssi)}
                              onClick={() => handlePasswordEntry(network.ssid)}
                              disabled={
                                localStorage.getItem("blackListSSID") ===
                                network.ssid
                              }
                              fullWidth
                            >
                              {network.ssid}
                            </MUIButt>
                          </Grid>
                          <Grid item>
                            {passwordEntry[network.ssid] ? (
                              <Grid container direction="column">
                                {network.encryption === "closed" ? (
                                  <TextField
                                    sx={{
                                      mt: 1,
                                    }}
                                    variant="standard"
                                    size="small"
                                    label={<KeyIcon />}
                                    type="password"
                                    onChange={(e) =>
                                      handlePasswordChange(e, network.ssid)
                                    }
                                  />
                                ) : null}
                                {connectLoading[network.ssid] ? (
                                  <LoadingButton
                                    loading
                                    loadingPosition="end"
                                    endIcon={<RadarIcon />}
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                    disableElevation
                                    sx={{ mt: 1 }}
                                  >
                                    Connecting
                                  </LoadingButton>
                                ) : (
                                  <MUIButt
                                    endIcon={<SensorsIcon />}
                                    sx={{
                                      mt: 1,
                                      display:
                                        localStorage.getItem("ip") ===
                                        network.ssid
                                          ? "none"
                                          : "flex",
                                    }}
                                    size="small"
                                    disableElevation
                                    variant="contained"
                                    color="success"
                                    onClick={() =>
                                      handleConnectToWifi(
                                        network.ssid,
                                        "blabla"
                                      )
                                    }
                                  >
                                    CONNECT
                                  </MUIButt>
                                )}
                              </Grid>
                            ) : null}
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Box>
                  ))
                )}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {disconnectButton ? (
            <LoadingButton
              variant="contained"
              color="error"
              fullWidth
              loading
              loadingPosition="end"
              endIcon={<RadarIcon />}
              disabled
            >
              Disconnecting..
            </LoadingButton>
          ) : (
            <MUIButt
              autoFocus
              variant="contained"
              color="error"
              fullWidth
              disableElevation
              startIcon={<WifiOffIcon />}
              onClick={handleDisconnect}
              disabled={localStorage.getItem("ip") === "192.168.4.1"}
            >
              DISCONNECT
            </MUIButt>
          )}
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
export default Navbar;
