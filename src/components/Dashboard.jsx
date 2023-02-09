import { getAuth } from "@firebase/auth";
import FacebookIcon from "@mui/icons-material/Facebook";
import InfoIcon from "@mui/icons-material/Info";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, CssVarsProvider, Grid, Typography } from "@mui/joy";
import { Button, List, ListItem } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import background from "../assets/Dashboard/background.png";
import "../css/Dashboard.css";
import NavBar from "../layouts/NavBar";

const contacts = [
  {
    Name: "Facebook",
    logo: <FacebookIcon />,
    color: "rgba(59,89,152)",
    link: "https://www.facebook.com",
  },
  {
    Name: "Instagram",
    logo: <InstagramIcon />,
    color: "rgba(193, 53, 132)",
    link: "https://www.instagram.com",
  },
  {
    Name: "Twitter",
    logo: <TwitterIcon />,
    color: "rgb(29, 161, 242)",
    link: "https://www.twitter.com",
  },
  {
    Name: "WhatsApp",
    logo: <WhatsAppIcon />,
    color: "rgba(7 ,94 ,84)",
    link: "https://web.whatsapp.com",
  },
];
export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("addbgdashboard");
    return () => {
      document.body.classList.remove("addbgdashboard");
    };
  }, []);
  const navigate = useNavigate();
  const [user] = useAuthState(getAuth());
  return (
    <Box>
      <NavBar />
      <CssVarsProvider />
      <Box>
        <Grid container alignItems="center" direction="column" spacing={-8}>
          <Typography
            fontFamily="Poppins"
            sx={{
              color: "white",
              fontSize: "3.3vmax",
            }}
          >
            REMOTE RACER
          </Typography>
          <Typography
            fontFamily="Poppins"
            sx={{
              color: "#ffe500",
              fontSize: "2vmax",
              mb: { md: 7 },
            }}
          >
            Welcome Back, {user?.displayName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 3, md: 0 },
            }}
          >
            <img src={background} alt="" style={{ maxWidth: "100%" }} />
          </Box>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              opacity: "70%",
              fontFamily: "Inter",
              fontSize: "1.3vmax",
            }}
          >
            Play online - for free
          </Typography>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "1.5vmax",
            }}
          >
            FREE FOR ALL IN ALL COUNTRIES
          </Typography>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
          >
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Inter",
                  fontSize: "2vh",
                  mr: { md: 4 },
                  mb: { xs: 4, md: 0 },
                }}
                color="success"
                startIcon={<VideogameAssetIcon />}
                onClick={() => navigate("/game")}
              >
                PLAY NOW
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ fontFamily: "Inter", fontSize: "2vh" }}
                startIcon={<InfoIcon />}
                onClick={() => {
                  navigate("/about");
                  window.scrollTo(0, 0);
                }}
              >
                LEARN ABOUT THE WEBSITE
              </Button>
            </Grid>
          </Grid>
          <Typography
            fontFamily="Poppins"
            sx={{ color: "white", fontSize: "1.5vmax" }}
          >
            OUR SOCIALS
          </Typography>
          <List
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            {contacts.map((cont) => (
              <ListItem key={cont.Name} sx={{ mx: { md: 2 } }}>
                <Button
                  variant="text"
                  sx={{ color: cont.color }}
                  onClick={() => window.open(cont.link)}
                >
                  {cont.logo}
                </Button>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Box>
    </Box>
  );
}
