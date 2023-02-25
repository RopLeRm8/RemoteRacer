import { getAuth } from "@firebase/auth";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FacebookIcon from "@mui/icons-material/Facebook";
import InfoIcon from "@mui/icons-material/Info";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  CssVarsProvider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { Button as MUIButton } from "@mui/material";
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
          <Grid item>
            <Typography
              fontFamily="Poppins"
              sx={{
                color: "white",
                fontSize: "2vmax",
              }}
            >
              REMOTE RACER
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              startDecorator={<EmojiPeopleIcon />}
              fontFamily="Poppins"
              sx={{
                color: "white",
                fontSize: "1vmax",
                mb: { md: 7 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              Welcome Back, {user?.displayName.split(" ")[0]}
            </Typography>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 3, md: 0 },
            }}
          >
            <img
              src={background}
              alt=""
              style={{
                maxWidth: "100%",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
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
              <MUIButton
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
              </MUIButton>
            </Grid>
            <Grid item>
              <MUIButton
                variant="contained"
                sx={{ fontFamily: "Inter", fontSize: "2vh" }}
                startIcon={<InfoIcon />}
                onClick={() => {
                  navigate("/about");
                  window.scrollTo(0, 0);
                }}
              >
                LEARN ABOUT THE WEBSITE
              </MUIButton>
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
                  variant="plain"
                  color="neutral"
                  sx={{
                    color: cont.color,
                  }}
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
