import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Box,
  LinearProgress,
  Stack,
  Grow,
} from "@mui/material";
import place1 from "../assets/place1.png";
import place2 from "../assets/place2.png";
import place3 from "../assets/place3.png";
import firstSetup from "../assets/firstSetup.png";
import playFirstGame from "../assets/playFirstGame.png";
import scoreMoreThan100 from "../assets/scoreMoreThan100.png";
import { ref, child, get } from "firebase/database";
import { db } from "../providers/FirebaseProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Card from "@mui/joy/Card";
import { CardOverflow, Tooltip } from "@mui/joy";
import "../css/Medals.css";

const query = ref(db);

export default function Medals() {
  const [medalsList, setmedalsList] = useState([
    [place1, "תשיג מקום ראשון בטבלת לידרים", false, "place1"],
    [place2, "תשיג מקום שני בטבלת לידרים", false, "place2"],
    [place3, "תשיג מקום שלישי בטבלת לידרים", false, "place3"],
    [firstSetup, "שינוי ראשוני של תמונת פרופיל", false, "firstSetup"],
    [playFirstGame, "תשחק משחק ראשון", false, "playFirstGame"],
    [
      scoreMoreThan100,
      "תשיג יותר מ-100 נקודות במשחק אחד",
      false,
      "scoreMoreThan100",
    ],
  ]);
  const [medalsahuz, setmedalsAhuz] = useState(0);
  const totalMedals = medalsList.length;
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user.uid}/achievements`;
  const mainbox = useRef();

  useEffect(() => {
    get(child(query, userRefDB)).then(
      (snapshot) => {
        const list = snapshot.val();
        let count = 0;
        medalsList.forEach((medal, i) => {
          medalsList[i][2] = list[medal[3]];
          medal[2] && count++;
        });
        setmedalsList(medalsList);
        setmedalsAhuz(Math.round(100 * (count / totalMedals)));
      },
      [totalMedals, medalsList]
    );
    const handleScroll = () => {
      let value = window.scrollY;
      if (window.screen.height * window.devicePixelRatio < 1000) {
        mainbox.current.style.right = value * 2 + "px";
      }

      // mainbox.current.style.right = value * 1.5 + "px";
      // mainbox.current.style.opacity =
      //   (value > 0 && 100 - value / 4 + "%") || "100%";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [medalsList, totalMedals, userRefDB]);
  return (
    <Grow in={true}>
      <Card
        sx={{
          backgroundColor: "inherit",
        }}
        ref={mainbox}
      >
        <CardOverflow
          sx={{
            border: 0,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              color: "black",
              div: { opacity: "100%" },
              opacity: "90%",
              p: 10,
              mt: mainbox.current?.style.opacity !== "none" && 6,
              mb: mainbox.current?.style.opacity !== "none" && 10,
              "@media screen and (max-width: 90em)": {
                mx: 0,
              },
              mx: 50,
              borderRadius: "15px",
              backgroundColor: "#f2f0f6",
            }}
          >
            <Card
              sx={{
                ml: 1,
                border: "0",
                mb: 3.5,
                opacity: "80%",
                boxShadow: "inset 0em 0 0 0 white",
                "&:hover": {
                  boxShadow: "inset 21em 0 0 0 black",
                  color: "white",
                },
              }}
            >
              <Typography
                dir="rtl"
                sx={{
                  fontFamily: "Noto Sans Hebrew",
                  fontSize: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmojiEventsIcon sx={{ ml: 1, mt: 1.7, fontSize: 45 }} />
                הישגים שלך
              </Typography>
            </Card>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
              dir="rtl"
              justifyContent="center"
              alignItems="end"
              sx={{}}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 60,
                  opacity: "100%",
                }}
              >
                <Grid item xs={5} sm={10} md={12} lg={7}>
                  {medalsList.map((medal) => (
                    <Tooltip
                      title={medal[1] + (medal[2] ? " (הושלם)" : "")}
                      key={medal[1]}
                      color={medal[2] ? "success" : "neutral"}
                      enterDelay={500}
                    >
                      <img
                        key={medal[0]}
                        src={medal[0]}
                        width="80"
                        height="80"
                        className="medalImg"
                        alt=""
                        style={{
                          opacity: medal[2] ? "100%" : "20%",
                        }}
                      />
                    </Tooltip>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <LinearProgress
                value={medalsahuz}
                variant="determinate"
                sx={{
                  width: "200px",
                  mt: 1.5,
                  ml: 5,
                  p: 0.8,
                  borderRadius: 20,
                }}
              />
              <Typography sx={{ ml: 1, fontSize: 25 }}>
                {medalsahuz + "%"}
              </Typography>
            </Box>
            {medalsahuz === 100 && (
              <Box>
                <Typography
                  dir="rtl"
                  sx={{
                    fontFamily: "Noto Sans Hebrew",
                    fontSize: 30,
                    mt: 2,
                    mr: 3,
                  }}
                >
                  כל הכבוד, השגת את כל המדליות עד כה!
                </Typography>
              </Box>
            )}
          </Stack>
        </CardOverflow>
      </Card>
    </Grow>
  );
}
