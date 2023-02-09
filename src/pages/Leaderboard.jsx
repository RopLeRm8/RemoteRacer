import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Badge,
  Box,
  CssVarsProvider,
  Grid,
  Typography,
} from "@mui/joy";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import trophy from "../assets/Leaderboard/trophy.png";
import BadgeIcon from "@mui/icons-material/Badge";
import CasinoIcon from "@mui/icons-material/Casino";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmailIcon from "@mui/icons-material/Email";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Centered from "../features/Centered";
import ScrollAnimation from "../features/ScrollAnimation";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";
const backColor = "black";
const secondaryColor = "#ffe500";
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
  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      for (const key in data) {
        arr.push(data[key].data);
      }
      arr = arr.sort((a, b) => b.points - a.points);
      arr = arr.slice(0, 3);
      setusersData(arr.map((val, ind) => ({ ...val, index: ind })));
    });
  }, [user]);

  return (
    <Box sx={{ background: backColor }}>
      <Navbar />
      <CssVarsProvider />
      <ScrollAnimation animationName="animate__fadeInTopLeft">
        <Centered
          style={{ border: "1px white solid", p: 2, borderRadius: "8px" }}
        >
          <Typography
            fontFamily="Anton"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "white",
              fontSize: "3vmax",
            }}
          >
            LEADERBOARD
          </Typography>
          <Typography
            fontFamily="Inter"
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              fontSize: "2vmax",
            }}
          >
            See who leads know on our webiste
          </Typography>
          <Grid container direction="column" alignItems="center">
            {usersData &&
              arr.map((userData) => (
                <Box
                  sx={{
                    backgroundColor: secondaryColor,
                    p: 2,
                    borderRadius: "10px",
                    mb: 2,
                  }}
                  key={userData.name}
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
                      3 points
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
                        startDecorator={<BadgeIcon />}
                      >
                        {userData.name || "[No name]"}
                      </Typography>
                      <Typography
                        sx={{
                          color: backColor,
                          ml: 3,
                          fontFamily: "Inter",
                          fontWeight: 500,
                        }}
                        startDecorator={<EmailIcon />}
                      >
                        {userData.mail || "[No email]"}
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
              ))}
          </Grid>
          <Box>
            <Typography fontSize="Anton">
              {user.points ? "Your current points are " + user.points : null}
            </Typography>
          </Box>
        </Centered>
      </ScrollAnimation>
    </Box>
  );
}
