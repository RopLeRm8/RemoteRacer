import { getAuth } from "@firebase/auth";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import { CssVarsProvider, Stack } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, Rating } from "@mui/material";
import { child, get, ref, update } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import blackback from "../assets/Profile/blackback.png";
import blackback2 from "../assets/Profile/blackback2.png";
import dices from "../assets/Profile/dices.png";
import points from "../assets/Profile/points.png";
import Medals from "../components/Medals";
import ProfileInfo from "../components/ProfileInfo";
import "../css/SmoothSlide.css";
import ScrollAnimation from "../features/ScrollAnimation";
import { useNotification } from "../hooks/useNotification";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";

const rateToText = [
  "Didn't Like At All",
  "Meh",
  "Neutral",
  "Good",
  "Very Good",
];
const query = ref(db);
export default function Profile() {
  const [stamProfile, setstamProfile] = useState(false);
  const [user] = useAuthState(getAuth());
  const [value, setValue] = useState(0);
  const userRefData = ref(db, `users/${user.uid}/data`);
  const userData = `users/${user.uid}/data`;
  const notify = useNotification();

  useEffect(() => {
    get(child(query, userData))
      .then((snapshot) => {
        snapshot && snapshot.val().rating && setValue(snapshot.val().rating);
      })
      .catch(() => {
        useNotification("Couldnt load player's data!", { variant: "error" });
      });

    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, [userData]);

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

  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${blackback})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <ProfileInfo setstamProfile={setstamProfile} /> {/*מידע על המשתמש*/}
        <Medals stamProfile={stamProfile} />
      </Box>

      {/* {fbvalue.map((val) => (
        <Box key={val.value}>
          כאן יש תמונת ESP
          {val.value === "ip" && (
            <img
              src={"http://" + val.data + "/capture"}
              alt=""
              width="128"
              height="128"
            />
          )}
        </Box>
      ))} */}

      <Box
        sx={{
          backgroundImage: `url(${blackback2})`,
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
              direction={{ xs: "column", sm: "column", md: "row-reverse" }}
              spacing={{ xs: 1, sm: 3, md: 0 }}
            >
              <Box
                sx={{
                  "@media screen and (min-width: 90em)": {
                    mt: 10,
                  },

                  borderRadius: "50%",
                  background: "linear-gradient(145deg, #cacaca, #ffffff)",
                  boxShadow: "8px 8px 30px #ffffff,-8px -8px 30px #ffffff",
                }}
              >
                <img src={dices} width="166" height="166" alt="" />
              </Box>
              <Box>
                <Typography
                  level="h2"
                  sx={{
                    color: "#ffe500",
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
            height: "5vh",
            display: "flex",
            background: "linear-gradient(to bottom, black, transparent)",
            "&::before": {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100px",
            },
          }}
        />
        <Box>
          <Box
            sx={{
              mt: 10,
              height: "20vh",
              display: "flex",
              background: "linear-gradient(to top, black, transparent)",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "45vh",
            background: "black",
            opacity: 0.9,
          }}
        >
          <ScrollAnimation animationName="animate__fadeInUp">
            <Stack
              justifyContent="space-around"
              alignItems="center"
              direction={{ xs: "column", sm: "column", md: "row-reverse" }}
              spacing={{ xs: 1, sm: 3, md: 5 }}
            >
              <Box
                sx={{
                  "@media screen and (min-width: 90em)": {
                    mt: 10,
                  },
                  borderRadius: "50%",
                  background: "linear-gradient(145deg, #cacaca, #ffe500)",
                  boxShadow: "8px 8px 30px #ffe500,-8px -8px 30px #ffe500",
                }}
              >
                <img src={points} width="166" height="166" alt="" />
              </Box>
              <Box>
                <Typography
                  level="h2"
                  sx={{
                    color: "#ffe500",
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
        <Box
          sx={{
            width: "100%",
            height: "5vh",
            display: "flex",
            background: "linear-gradient(to bottom, black, transparent)",
            opacity: "80%",
            "&::before": {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100px",
            },
          }}
        />
        <ScrollAnimation animationName="animate__flipInX" duration={0.6}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{ mt: 3, background: "#ffe500" }}
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
        </ScrollAnimation>
      </Box>
      <Footer />
    </Box>
  );
}
