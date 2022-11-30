import React, { useState, useRef, useCallback, useEffect } from "react";
import { Avatar, Box, Grid, Zoom } from "@mui/material";
import { Button, Card, Typography, Stack, Tooltip } from "@mui/joy";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import UploadIcon from "@mui/icons-material/Upload";
import FormDialog from "./FormModal";
import "../css/ProfileInfo.css";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import { ref, child, get } from "firebase/database";
import { db } from "../providers/FirebaseProvider";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export default function ProfileInfo() {
  const [updateLoading, setupdateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [stam, setStam] = useState(false);
  const [timeValue, settimeValue] = useState(0);
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user.uid}/data`;
  const query = ref(db);
  const mainbox = useRef();

  const avatarRef = useRef();
  const updateProfileLoad = useCallback(() => {
    setOpen(true);
    setupdateLoading((previous) => !previous);
  }, []);

  useEffect(() => {
    get(child(query, userRefDB)).then((snapshot) => {
      snapshot.val().lastTime
        ? settimeValue(snapshot.val().lastTime)
        : settimeValue(snapshot.val().newTime + " - כניסה ראשונה!");
    });

    const handleScroll = () => {
      let value = window.scrollY;
      mainbox.current.style.bottom = value * 0.3 + "px";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [query, userRefDB]);
  return (
    <Zoom in={true}>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 10,
        }}
        dir="rtl"
      >
        <Card className="Card" variant="outlined" sx={{}} ref={mainbox}>
          <Stack direction="row" alignItems="center">
            <Tooltip title="תמונת פרופיל" color="primary" size="sm" arrow>
              <Avatar
                className="onhoverZoom"
                src={user.photoURL}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  "&:hover": {
                    animation: "zoomIn .3s forwards",
                  },
                }}
                ref={avatarRef}
                data-state={stam}
              ></Avatar>
            </Tooltip>
            {updateLoading && open ? (
              <Button
                variant="soft"
                color="success"
                sx={{
                  mr: 5,
                  fontWeight: "md",
                  fontFamily: "Noto Sans Hebrew",
                  border: 2,
                  borderRadius: "0%",
                }}
                disabled
              >
                שינוי תמונה <UploadIcon />
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="info"
                className="pulse"
                sx={{
                  mr: 5,
                  fontWeight: "md",
                  fontFamily: "Noto Sans Hebrew",
                  border: 2,
                  borderRadius: "0%",
                }}
                onClick={updateProfileLoad}
              >
                שינוי תמונה <UploadIcon />
              </Button>
            )}
          </Stack>
          <Box sx={{ fontFamily: "Noto Sans Hebrew", mr: 2, m: 1 }}>
            <Tooltip
              title={user.displayName + " - שם פרטי"}
              enterDelay={1000}
              arrow
              variant="solid"
              size="md"
              color="info"
              placement="right"
            >
              <Typography
                startDecorator={<BadgeIcon sx={{ ml: 0.5, my: 0.2 }} />}
              >
                {user.displayName}
              </Typography>
            </Tooltip>
            <Grid item lg={15}>
              <Tooltip
                title={user.email + " - כתובת מייל"}
                enterDelay={1000}
                arrow
                variant="solid"
                size="md"
                color="info"
                placement="right"
              >
                <Typography
                  startDecorator={<EmailIcon sx={{ opacity: "100%" }} />}
                  sx={{ fontFamily: "Noto Sans Hebrew", my: 0.2 }}
                >
                  {user.email}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item lg={15}>
              <Typography
                startDecorator={
                  <Typography
                    dir="rtl"
                    sx={{
                      fontSize: 15,
                      fontFamily: "Noto Sans Hebrew",
                      my: 0.2,
                    }}
                    startDecorator={<AccessTimeFilledIcon />}
                  >
                    {" "}
                    כניסה אחרונה:{" "}
                  </Typography>
                }
                sx={{ fontFamily: "Noto Sans Hebrew" }}
              >
                {timeValue}
              </Typography>
            </Grid>
          </Box>

          <Grid item xs={15} sm={15} md={15} lg={15}></Grid>
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
        </Card>
      </Grid>
    </Zoom>
  );
}
