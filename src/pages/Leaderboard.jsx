import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  CssVarsProvider,
  Grid,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import trophy from "../assets/Leaderboard/trophy.png";
import CasinoIcon from "@mui/icons-material/Casino";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import "../css/Leaderboard.css";
import LogoMaker from "../features/LogoMaker";
import ScrollAnimation from "../features/ScrollAnimation";
import { useNotification } from "../hooks/useNotification";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";
const backColor = "black";
const secondaryColor = "orange";
const usersRef = ref(db, "users/");
let arr = [];

// const ENUM = {
//   0: "hello",
//   1: "Yo",
//   2: "Sexy",
// };
export default function Leaderboard() {
  const [user] = useAuthState(getAuth());
  const [usersData, setusersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = useNotification();
  useEffect(() => {
    setIsLoading(true);
    get(usersRef)
      .then((snapshot) => {
        const data = snapshot.val();
        arr = [];
        for (const key in data) {
          arr.push(data[key].data);
        }
        arr.sort((a, b) => b.points - a.points);
        arr = arr.slice(0, 3);
        setusersData(arr.map((val) => ({ ...val })));
      })
      .catch(() => {
        notify("An error happened, try to reload the page");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, notify]);

  useEffect(() => {
    document.body.classList.add("addbgleaderboard");
    return () => {
      document.body.classList.remove("addbgleaderboard");
    };
  }, []);
  return (
    <>
      <Navbar />
      <CssVarsProvider />
      <Box sx={{ backgroundColor: "rgba(0,0,0,0)", py: 6 }}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontFamily: "Anton",
            mb: 2,
            textAlign: "center",
            fontSize: { xs: "180%", lg: "280%" },
            ml: { xs: 2, lg: 0 },
          }}
          endDecorator={<LogoMaker />}
        >
          Leaderboard
        </Typography>
        <Typography
          level="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontFamily: "Inter",
            textAlign: "center",
            mb: 1,
          }}
        >
          A place where you can tell your friends you are place number 1
        </Typography>
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          py: 2,
          mx: { xs: 2, sm: 5 },
          display: isLoading ? "none" : "flex",
        }}
      >
        <Modal open={isLoading}>
          <ModalDialog>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ mr: 1 }} size="sm" color="warning" />
              <Typography
                sx={{
                  color: "black",
                  fontSize: "130%",
                  fontFamily: "Poppins",
                }}
              >
                Loading data...
              </Typography>
            </Box>
          </ModalDialog>
        </Modal>
        {usersData?.map((userData) => (
          <ScrollAnimation animationName="animate__fadeIn" key={userData.name}>
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="center"
              sx={{
                mb: { xs: 1, sm: usersData.indexOf(userData) === 2 ? 0 : 3 },
                mr: { sm: 5 },
              }}
            >
              <Typography
                fontFamily="Poppins"
                sx={{ color: "white", mr: 2, fontSize: "150%" }}
              >
                {usersData.indexOf(userData) + 1}
              </Typography>
              <Box
                sx={{
                  backgroundColor: secondaryColor,
                  p: 2,
                  borderRadius: "10px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      color: backColor,
                      mr: 3,
                      fontFamily: "Poppins",
                      fontWeight: 500,
                    }}
                    startDecorator={<CasinoIcon />}
                  >
                    {Math.round(userData.points)}
                  </Typography>
                  <Badge
                    badgeContent={<PersonPinIcon />}
                    size="sm"
                    color="warning"
                    variant="outlined"
                  >
                    <Avatar
                      src={userData.photoURL}
                      sx={{
                        "--Avatar-ringSize": "4px",
                        "--Avatar-size": "52px",
                      }}
                    />
                  </Badge>
                  <Grid container direction="column">
                    <Typography
                      key={userData.name}
                      sx={{
                        color: backColor,
                        ml: 3,
                        fontFamily: "Inter",
                        fontWeight: 500,
                      }}
                      startDecorator={<PersonPinIcon />}
                    >
                      {userData.name || "[No name]"}
                    </Typography>
                    <Typography
                      sx={{
                        color: userData.carColor
                          ? userData.carColor
                          : backColor,
                        ml: 3,
                        fontFamily: "Inter",
                        fontWeight: 500,
                        display: userData.carName ? "flex" : "none",
                        WebkitTextStroke: "0.2px black",
                      }}
                      startDecorator={
                        <DirectionsCarIcon sx={{ color: backColor }} />
                      }
                    >
                      {userData.carName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </ScrollAnimation>
        ))}
      </Grid>

      <Box>
        <Typography fontSize="Anton">
          {user.points ? "Your current points are " + user.points : null}
        </Typography>
      </Box>
    </>
  );
}
