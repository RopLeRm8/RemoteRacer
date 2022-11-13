import { getAuth } from "@firebase/auth";
import { Avatar, CssVarsProvider, Badge, Tooltip, Grid, Stack } from "@mui/joy";
import { Box } from "@mui/material";
import Typography from "@mui/joy/Typography";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./NavBar";
import UploadIcon from "@mui/icons-material/Upload";
import { useCallback } from "react";
import { useState } from "react";
import FormDialog from "./FormModal";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import place1 from "../assets/place1.png";
import place2 from "../assets/place2.png";
import place3 from "../assets/place3.png";
import firstSetup from "../assets/firstSetup.png";
import playFirstGame from "../assets/playFirstGame.png";
import scoreMoreThan100 from "../assets/scoreMoreThan100.png";
import LinearProgress from "@mui/material/LinearProgress";
import { ref, child, get } from "firebase/database";
import { db } from "../providers/FirebaseProvider";

export default function Profile() {
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

  const [open, setOpen] = useState(false);
  const [user] = useAuthState(getAuth());
  const [updateLoading, setupdateLoading] = useState(false);
  const avatarRef = useRef();
  const totalMedals = medalsList.length;
  const [medalsahuz, setmedalsAhuz] = useState(0);
  const [stam, setStam] = useState(false);

  const query = ref(db);
  const userRefDB = `users/${user.uid}/achievements`;

  const updateProfileLoad = useCallback(() => {
    setOpen(true);
    setupdateLoading((previous) => !previous);
  }, []);

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
  });

  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <Grid
        container
        spacing={{ xs: -8, md: -15, lg: -35 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
        dir="rtl"
      >
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          badgeInset="17%"
          color="success"
          size="lg"
        >
          <Tooltip title="תמונת פרופיל">
            <Avatar
              src={user.photoURL}
              sx={{ width: 80, height: 80, mb: 1 }}
              ref={avatarRef}
              data-state={stam}
            ></Avatar>
          </Tooltip>
        </Badge>

        <Typography sx={{ fontFamily: "Noto Sans Hebrew", mr: 2 }}>
          {user.displayName}
          <Grid item lg={6}>
            <Typography sx={{ fontFamily: "Noto Sans Hebrew", opacity: "80%" }}>
              {user.email}
            </Typography>
          </Grid>
        </Typography>

        <Grid item xs={5} lg={15} md={15}>
          {updateLoading && open ? (
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "md",
                fontFamily: "Noto Sans Hebrew",
                border: 1,
                borderRadius: "5%",
              }}
              disabled
            >
              שינוי תמונה <UploadIcon />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "md",
                fontFamily: "Noto Sans Hebrew",
                border: 1,
                borderRadius: "5%",
              }}
              onClick={updateProfileLoad}
            >
              שינוי תמונה <UploadIcon />
            </Button>
          )}
        </Grid>

        {/* <Button
            variant="contained"
            size="lg"
            startIcon={<ManageAccountsIcon sx={{ ml: 2 }} />}
            sx={{
              fontWeight: "md",
              fontFamily: "Noto Sans Hebrew",
              border: 1,
              borderRadius: "5%",
            }}
          >
            לשנות את השם
          </Button> */}
        {
          <FormDialog
            open={open}
            setOpen={setOpen}
            setupdateLoading={setupdateLoading}
            avatarRefer={avatarRef}
            setStam={setStam}
          />
        }
      </Grid>
      <Stack sx={{ p: 5 }}>
        <Typography
          dir="rtl"
          sx={{ p: 3, fontFamily: "Noto Sans Hebrew", fontSize: 30 }}
        >
          השגים שלך:
        </Typography>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 0 }}
          dir="rtl"
          justifyContent="start"
          alignItems="start"
          sx={{
            "@media screen and (max-width: 90em)": {
              mr: 2,
            },
            mr: 14,
          }}
        >
          <Grid item xs={3} sm={4} md={5} lg={3.3}>
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
                  alt=""
                  style={{ opacity: medal[2] ? "100%" : "20%" }}
                />
              </Tooltip>
            ))}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 3, mr: 3 }}>
          <LinearProgress
            value={medalsahuz}
            variant="determinate"
            sx={{ width: "40rem", mt: 1, mr: 1, p: 0.8 }}
          />
          <Typography>{medalsahuz + "%"}</Typography>
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
    </Box>
  );
}
