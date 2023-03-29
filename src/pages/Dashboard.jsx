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
import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import background from "../assets/Dashboard/background.png";
import "../css/Dashboard.css";
import { CustomButton } from "../features/CustomButton";
import LoadingModal from "../features/LoadingModal";
import { useNotification } from "../hooks/useNotification";
import NavBar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";

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
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user?.uid}/data`;
  const query = ref(db);
  const notify = useNotification();
  const [userName, setUserName] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    document.body.classList.add("addbgdashboard");
    return () => {
      document.body.classList.remove("addbgdashboard");
    };
  }, []);
  useEffect(() => {
    setDataLoading(true);
    get(child(query, userRefDB))
      .then((snapshot) => {
        setUserName(snapshot.val().name ? snapshot.val().name : null);
      })
      .catch(() => {
        notify("Couldn't connect to database");
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [notify]);
  const navigate = useNavigate();

  return (
    <Box>
      <NavBar />
      <CssVarsProvider />
      <Box>
        <LoadingModal isLoading={dataLoading} />
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
          {userName ? (
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
                Welcome Back, {userName}
              </Typography>
            </Grid>
          ) : null}

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
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ mt: 1 }}
          >
            <Grid item>
              <CustomButton
                variant="contained"
                text="PLAY NOW"
                sx={{
                  fontFamily: "Inter",
                  fontSize: "1vmax",
                  border: "2px solid white",
                  background: "black",
                  color: "white",
                  "&:hover": {
                    color: "orange",
                    background: "rgba(0,0,0,0)",
                  },
                }}
                startIcon={<VideogameAssetIcon />}
                onClickFunc={() => navigate("/game")}
              />
            </Grid>
            <Grid item>
              <CustomButton
                variant="contained"
                text="ABOUT THE WEBSITE"
                sx={{
                  fontFamily: "Inter",
                  fontSize: "1vmax",
                  border: "2px solid white",
                  background: "black",
                  color: "white",
                  "&:hover": {
                    color: "orange",
                    background: "rgba(0,0,0,0)",
                  },
                }}
                startIcon={<InfoIcon />}
                onClickFunc={() => {
                  navigate("/about");
                  window.scrollTo(0, 0);
                }}
              />
            </Grid>
          </Grid>
          <Typography
            fontFamily="Poppins"
            sx={{ color: "white", fontSize: "1.5vmax", mt: 2 }}
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
                    color: "white",
                    "&:hover": {
                      border: `2px ${cont.color} solid`,
                    },
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
