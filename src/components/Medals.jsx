import { getAuth } from "@firebase/auth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { CardOverflow, Tooltip } from "@mui/joy";
import Card from "@mui/joy/Card";
import {
  Box,
  Grid,
  Grow,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { child, get, ref } from "firebase/database";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firstSetup from "../assets/Medals/firstSetup.png";
import place1 from "../assets/Medals/place1.png";
import place2 from "../assets/Medals/place2.png";
import place3 from "../assets/Medals/place3.png";
import playFirstGame from "../assets/Medals/playFirstGame.png";
import scoreMoreThan100 from "../assets/Medals/scoreMoreThan100.png";
import "../css/Medals.css";
import { db } from "../providers/FirebaseProvider";

const query = ref(db);

export default function Medals({ stamProfile }) {
  const [medalsList, setmedalsList] = useState([
    [place1, "Has earned first place", false, "place1", "Winner"],
    [place2, "Has earned second place", false, "place2", "Competitor"],
    [place3, "Has earned third place", false, "place3", "Challenger"],
    [firstSetup, "Has changed profile picture", false, "firstSetup", "Stylist"],
    [playFirstGame, "Has played first game", false, "playFirstGame", "Newbie"],
    [
      scoreMoreThan100,
      "Earned more than 100 points in 1 game",
      false,
      "scoreMoreThan100",
      "Tryhard",
    ],
  ]);
  const [medalsahuz, setmedalsAhuz] = useState(0);
  const [medalsLoaded, setmedalsLoaded] = useState(false);
  const totalMedals = medalsList.length;
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user.uid}/achievements`;
  const mainbox = useRef();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    get(child(query, userRefDB))
      .then(
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
      )
      .catch(() => {
        enqueueSnackbar("Couldn't load medals!", { variant: "error" });
      });
  }, [medalsList, totalMedals, userRefDB, stamProfile, enqueueSnackbar]);

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
              p: 10,
              mt: mainbox.current?.style.opacity !== "none" && 6,
              mb: mainbox.current?.style.opacity !== "none" && 10,
              "@media screen and (max-width: 90em)": {
                mx: 0,
              },
              mx: 50,
              border: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              boxShadow: "0px 0px 25px 1px orange",
            }}
          >
            <Card
              sx={{
                mr: { sm: 3 },
                mb: 3.5,
                background: "black",
              }}
            >
              <Typography
                dir="rtl"
                sx={{
                  fontFamily: "Anton",
                  fontSize: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  letterSpacing: { sm: 5 },
                  animation:
                    "tracking-in-expand 1s cubic-bezier(.215,.61,.355,1.000) both",
                }}
              >
                <EmojiEventsIcon
                  sx={{ ml: 1, fontSize: 45, color: "orange" }}
                />
                ACHIEVEMENTS
              </Typography>
            </Card>

            <Grid
              container
              rowSpacing={-5}
              columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  display: { sm: "flex" },
                  justifyContent: { sm: "center" },
                  fontSize: 60,
                  opacity: "100%",
                }}
              >
                {medalsList.map((medal) => (
                  <Grid
                    item
                    sx={{
                      mx: 0.5,
                      my: { xs: 5, sm: 0 },
                      animation:
                        "swing-in-top-fwd 3s cubic-bezier(.175,.885,.32,1.275) both",
                    }}
                    key={medal[4]}
                  >
                    <Grid container direction="column" key="GridContainerKey">
                      <Tooltip
                        color="warning"
                        size="lg"
                        variant="outlined"
                        title={medal[2] ? medal[1] : ""}
                        key={medal[1]}
                      >
                        <Box>
                          <img
                            key={medal[0]}
                            src={medal[0]}
                            width="80"
                            height="80"
                            className="medalImg"
                            alt=""
                            style={{
                              borderRadius: 10,
                              filter: !medal[2] && "blur(8px)",
                              display: medalsLoaded ? "flex" : "none",
                            }}
                            onLoad={() => setmedalsLoaded(true)}
                          />
                          <Skeleton
                            variant="rounded"
                            width={80}
                            height={80}
                            sx={{ display: medalsLoaded ? "none" : "flex" }}
                          />
                        </Box>
                      </Tooltip>
                      {!medal[2] && (
                        <LockRoundedIcon
                          key="lockkey"
                          sx={{
                            color: "white",
                            ml: 3.5,
                            mt: 2,
                          }}
                        />
                      )}
                      {medal[2] && (
                        <Typography
                          key="TitleText"
                          sx={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: "Montserrat",
                            mt: { sm: 2 },
                          }}
                        >
                          {medal[4]}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <LinearProgress
                value={medalsahuz}
                variant="determinate"
                color="warning"
                sx={{
                  width: { sm: "29rem", xs: "200px" },
                  mt: 1.5,
                  ml: { xs: 5 },
                  p: 0.8,
                  borderRadius: 20,
                }}
              />
              <Typography
                sx={{
                  ml: 3,
                  fontSize: 25,
                  color: "white",
                  fontFamily: "Poppins",
                }}
              >
                {medalsahuz + "%"}
              </Typography>
            </Box>
            {medalsahuz === 100 && (
              <Box>
                <Typography
                  dir="rtl"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "150%",
                    mt: 2,
                    mr: 3,
                    color: "orange",
                    textAlign: "center",
                  }}
                >
                  Good job! You've earned all the achievements so far
                </Typography>
              </Box>
            )}
          </Stack>
        </CardOverflow>
      </Card>
    </Grow>
  );
}
