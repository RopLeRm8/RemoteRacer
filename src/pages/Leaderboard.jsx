import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Badge,
  Box,
  CssVarsProvider,
  Grid,
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
import LoadingModal from "../features/LoadingModal";
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
  const [dataLoading, setDataLoading] = useState(true);
  const notify = useNotification();
  useEffect(() => {
    setDataLoading(true);
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
        setDataLoading(false);
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
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0)",
          pb: { xs: 5, md: 4 },
          pt: { xs: 5, md: 10 },
        }}
      >
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
          LEADERBOARD
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontFamily: "Inter",
            textAlign: "center",
            mb: 1,
            fontSize: "140%",
            mx: 2,
          }}
        >
          A place where you can tell your friends you are place number one
        </Typography>
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          py: 2,
          mx: { xs: 2, sm: 5 },
          display: dataLoading ? "none" : "flex",
        }}
      >
        <LoadingModal isLoading={dataLoading} />
        {usersData?.map((userData) => (
          <ScrollAnimation
            animationName="animate__fadeIn"
            key={userData.carName + userData.name}
            sx={{ width: "100%" }}
          >
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="center"
              sx={{
                mb: { xs: 1, sm: usersData.indexOf(userData) === 2 ? 0 : 3 },
              }}
            >
              <Box
                sx={{
                  backgroundColor: secondaryColor,
                  p: 2,
                  borderRadius: "10px",
                  width: "35vmax",
                }}
              >
                <Grid
                  container
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent={{ xs: "center", sm: "space-between" }}
                  alignItems="center"
                  spacing={-1}
                >
                  <Grid
                    container
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                  >
                    <Typography
                      fontFamily="Poppins"
                      sx={{ color: "black", fontSize: "150%" }}
                    >
                      {usersData.indexOf(userData) + 1}
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
                    <Grid container direction="column" justifyContent="center">
                      <Typography
                        key={userData.name}
                        sx={{
                          color: backColor,
                          ml: { sm: 3 },
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
                          ml: { sm: 3 },
                          fontFamily: "Inter",
                          fontWeight: 500,
                          // display: userData.carName ? "flex" : "none",
                          WebkitTextStroke: "0.2px black",
                        }}
                        startDecorator={
                          <DirectionsCarIcon sx={{ color: backColor }} />
                        }
                      >
                        {userData.carName ? userData.carName : "[NONE]"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{
                      color: backColor,
                      mr: 3,
                      fontFamily: "Poppins",
                      fontWeight: 500,
                    }}
                    startDecorator={<CasinoIcon />}
                  >
                    {Math.round(userData.points * 1000)}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </ScrollAnimation>
        ))}
      </Grid>

      {/* <Box>
        <Typography fontSize="Anton">
          {user.points ? "Your current points are " + user.points : null}
        </Typography>
      </Box> */}
    </>
  );
}
