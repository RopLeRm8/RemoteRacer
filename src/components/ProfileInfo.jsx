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
          pt: 4,
        }}
        dir="rtl"
      >
        <Card
          className="Card"
          sx={{
            border: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 10,
            boxShadow: "0px 0px 10px 1px rgba(255,255,255,0.3)",
          }}
          variant="outlined"
          ref={mainbox}
        >
          <Tooltip title="שינוי תמונת פרופיל" color="primary" size="sm" arrow>
            {updateLoading && open ? (
              <Avatar
                className="onhoverZoom"
                src={user.photoURL}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  opacity: "70%",
                  "&:hover": {
                    animation: "zoomIn .3s forwards",
                    cursor: "pointer",
                  },
                }}
                ref={avatarRef}
                data-state={stam}
              />
            ) : (
              <Avatar
                className="onhoverZoom"
                src={user.photoURL}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  "&:hover": {
                    animation: "zoomIn .3s forwards",
                    cursor: "pointer",
                  },
                }}
                ref={avatarRef}
                data-state={stam}
                onClick={updateProfileLoad}
              />
            )}
          </Tooltip>

          <Box sx={{ fontFamily: "Noto Sans Hebrew", mr: 2, m: 1 }}>
            {user.displayName && (
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
                  sx={{ color: "white" }}
                  startDecorator={
                    <BadgeIcon sx={{ ml: 0.5, my: 0.2, color: "white" }} />
                  }
                >
                  {user.displayName}
                </Typography>
              </Tooltip>
            )}

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
                  sx={{
                    fontFamily: "Noto Sans Hebrew",
                    my: 0.2,
                    color: "white",
                  }}
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
                    startDecorator={
                      <AccessTimeFilledIcon sx={{ color: "white" }} />
                    }
                  >
                    <Typography sx={{ color: "white" }}>
                      כניסה אחרונה:
                    </Typography>
                  </Typography>
                }
                sx={{ fontFamily: "Noto Sans Hebrew", color: "white" }}
              >
                {timeValue}
              </Typography>
            </Grid>
          </Box>

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
