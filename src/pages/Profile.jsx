import { getAuth } from "@firebase/auth";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import { CssVarsProvider, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, Rating } from "@mui/material";
import { child, get, ref, update } from "firebase/database";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import blackback from "../assets/Profile/blackback.svg";
// import blackback2 from "../assets/Profile/blackback2.svg";
import dices from "../assets/Profile/dices.png";
import points from "../assets/Profile/points.png";
import Medals from "../components/Medals";
import ProfileInfo from "../components/ProfileInfo";
import "../css/SmoothSlide.css";
import ScrollAnimation from "../features/ScrollAnimation";
import { useNotification } from "../hooks/useNotification";
// import Footer from "../layouts/Footer";
import LazyLoad from "react-lazyload";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";

const rateToText = [
  "Didn't Like At All",
  "Meh",
  "Neutral",
  "Good",
  "Very Good",
];

export default function Profile() {
  const [stamProfile, setstamProfile] = useState(false);
  const [user] = useAuthState(getAuth());
  const [value, setValue] = useState(0);
  const userRefData = ref(db, `users/${user.uid}/data`);
  const userData = `users/${user.uid}/data`;
  const notify = useNotification();

  const bodyRef = useRef(document.body);

  useEffect(() => {
    bodyRef.current.style.backgroundColor = "black";
  }, []);

  const handleValueChange = useCallback(
    (_, nValue) => {
      notify("Thank you!", {
        variant: "info",
      });
      setValue(nValue);
      update(userRefData, {
        rating: nValue,
      });
    },
    [userRefData, notify]
  );

  useEffect(() => {
    const ratingRef = child(ref(db, userData), "rating");
    get(ratingRef)
      .then((snapshot) => {
        snapshot.exists() && setValue(snapshot.val());
      })
      .catch(() => {
        notify("Couldnt load player's data!", { variant: "error" });
      });
  }, [userData, notify]);

  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <LazyLoad>
        <Box
          sx={{
            backgroundImage: `url(${blackback})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <ProfileInfo setstamProfile={setstamProfile} /> {/*מידע על המשתמש*/}
          <Medals stamProfile={stamProfile} />
        </Box>
      </LazyLoad>
      <Box
        sx={{
          // backgroundImage: `url(${blackback2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            background: "linear-gradient(to top, black, transparent)",
          }}
        />

        <Box
          sx={{
            width: "100%",
            height: "45vh",
            background: "black",
          }}
        >
          <ScrollAnimation animationName="animate__fadeInUp">
            <Stack
              justifyContent="space-around"
              alignItems="center"
              direction={{ xs: "column", md: "row-reverse" }}
              spacing={{ xs: 3, sm: 3, md: 0 }}
              sx={{ mt: { xs: 5, md: 10 } }}
            >
              <LazyLoad>
                <Box
                  sx={{
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #cacaca, #ffffff)",
                    boxShadow: "8px 8px 30px #ffffff,-8px -8px 30px #ffffff",
                  }}
                >
                  <img src={dices} width="166" height="166" alt="" />
                </Box>
              </LazyLoad>
              <Box>
                <Typography
                  level="h2"
                  sx={{
                    color: "orange",
                    fontFamily: "Anton",
                    textAlign: "center",
                  }}
                >
                  Games Played : 5
                </Typography>
                <Typography
                  level="h6"
                  sx={{
                    color: "white",
                    mt: 0.3,
                  }}
                >
                  Amount of games you participated in
                </Typography>
              </Box>
            </Stack>
          </ScrollAnimation>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "30vh",
            background: "black",
            opacity: 0.9,
          }}
        >
          <ScrollAnimation animationName="animate__fadeInUp">
            <Stack
              justifyContent="space-around"
              alignItems="center"
              direction={{ xs: "column", md: "row-reverse" }}
              spacing={{ xs: 3, sm: 3, md: 5 }}
            >
              <LazyLoad>
                <Box
                  sx={{
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #cacaca, orange)",
                    boxShadow: "8px 8px 30px orange,-8px -8px 30px orange",
                  }}
                >
                  <img src={points} width="166" height="166" alt="" />
                </Box>
              </LazyLoad>
              <Box>
                <Typography
                  level="h2"
                  sx={{
                    color: "orange",
                    fontFamily: "Anton",
                    textAlign: "center",
                  }}
                >
                  Points Count : 600
                </Typography>
                <Typography
                  level="h6"
                  sx={{ color: "white", mt: 0.3, textAlign: "center" }}
                >
                  Amount of points earned since your first game
                </Typography>
              </Box>
            </Stack>
          </ScrollAnimation>
        </Box>

        <Stack
          direction="column"
          alignItems="center"
          sx={{ mt: 3, background: "orange" }}
        >
          <Typography
            sx={{
              color: "black",
              fontFamily: "Montserrat",
              fontSize: 25,
            }}
          >
            Let us know your opinion
          </Typography>
          <Rating
            value={value}
            onChange={handleValueChange}
            readOnly={value > 0}
            sx={{
              borderRadius: "5px",
              color: "black",
            }}
            icon={<DirectionsCarIcon />}
            emptyIcon={<DirectionsCarFilledOutlinedIcon />}
          />
          <Typography
            level="h5"
            sx={{ color: "black", fontFamily: "Montserrat" }}
          >
            {value > 0 && rateToText[value - 1]}
          </Typography>
        </Stack>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
