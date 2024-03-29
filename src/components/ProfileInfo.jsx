import { getAuth } from "@firebase/auth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PortraitIcon from "@mui/icons-material/Portrait";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Avatar, Grid, Zoom } from "@mui/material";
import { child, get, ref } from "firebase/database";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/ProfileInfo.css";
import LoadingModal from "../features/LoadingModal";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";
import FormModal from "./FormModal";
import FormModalSecond from "./FormModalSecond";

export default function ProfileInfo({ setstamProfile }) {
  const [updateLoading, setupdateLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [stam, setStam] = useState(false);
  const [timeValue, settimeValue] = useState(0);
  const [openEditValues, setopenEditValue] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [user] = useAuthState(getAuth());
  const userRefDB = `users/${user.uid}/data`;
  const query = ref(db);
  const mainbox = useRef();

  const avatarRef = useRef();

  const notify = useNotification();

  const updateProfileLoad = useCallback(() => {
    setOpen(true);
    setupdateLoading((previous) => !previous);
  }, []);

  useEffect(() => {
    setDataLoading(true);
    get(child(query, userRefDB))
      .then((snapshot) => {
        snapshot.val().lastTime
          ? settimeValue(snapshot.val().lastTime)
          : settimeValue(snapshot.val().newTime + " - First Entry!");
        setUserName(snapshot.val().name ?? null);
      })
      .catch(() => {
        notify("An error happened while loading player's data", {
          variant: "error",
        });
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [query, userRefDB, notify]);
  return (
    <Zoom in={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          pb: 2,
        }}
      >
        <LoadingModal isLoading={dataLoading} />
        <Card
          className="Card"
          sx={{
            border: "5",
            borderColor: "orange",
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 7,
            boxShadow: "0px 0px 10px 1px orange",
          }}
          variant="outlined"
          ref={mainbox}
        >
          <Box sx={{ display: "flex" }}>
            <Tooltip
              title="Upload New Photo"
              color="warning"
              size="md"
              variant="outlined"
            >
              <Box>
                {updateLoading && open ? (
                  <Avatar
                    className="onhoverZoom"
                    src={user?.photoURL}
                    alt="Remy Sharp"
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      opacity: "70%",
                      transition: "all 0.4s ease-in-out",
                      "&:hover": {
                        animation: "zoomIn .3s forwards",
                        transition: "all 0.4s ease-in-out",
                        cursor: "pointer",
                      },
                    }}
                    ref={avatarRef}
                    data-state={stam}
                  />
                ) : (
                  <Avatar
                    className="onhoverZoom"
                    src={user?.photoURL}
                    alt="Remy Sharp"
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 1,
                      transition: "all 0.1s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "all 0.1s ease-in-out",
                        cursor: "pointer",
                      },
                    }}
                    ref={avatarRef}
                    data-state={stam}
                    onClick={updateProfileLoad}
                  />
                )}
              </Box>
            </Tooltip>
            <Grid container direction="row">
              <Grid item>
                <Stack sx={{ mt: userName ? 2 : 3, ml: 1 }}>
                  {userName && (
                    <Tooltip
                      title={userName}
                      color="warning"
                      size="md"
                      variant="outlined"
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: "Montserrat",
                        }}
                        startDecorator={
                          <PortraitIcon sx={{ my: 0.2, color: "white" }} />
                        }
                      >
                        {userName}
                      </Typography>
                    </Tooltip>
                  )}

                  <Tooltip
                    title={user.email}
                    color="warning"
                    size="md"
                    variant="outlined"
                  >
                    <Typography
                      startDecorator={<EmailIcon sx={{ opacity: "100%" }} />}
                      sx={{
                        fontFamily: "Montserrat",
                        my: 0.2,
                        color: "white",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <IconButton
                  onClick={() => setopenEditValue(true)}
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                      color: "black",
                      backgroundColor: "orange",
                      "&:hover": {
                        color: "orange",
                        backgroundColor: "rgba(0,0,0,0)",
                      },
                      borderRadius: "20px",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{ display: "flex", alignItems: "center", ml: { md: 1 } }}
              >
                <Button
                  variant="solid"
                  color="warning"
                  onClick={() => setopenEditValue(true)}
                  sx={{ display: { xs: "flex", md: "none" }, mb: 1 }}
                  size="sm"
                >
                  Update profile
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Typography
            startDecorator={
              <Typography
                sx={{
                  fontSize: 15,
                  fontFamily: "Montserrat",
                  my: 0.2,
                }}
                startDecorator={
                  <AccessTimeFilledIcon sx={{ color: "white" }} />
                }
              >
                <Typography sx={{ color: "white" }}>Last Login -</Typography>
              </Typography>
            }
            sx={{ fontFamily: "Montserrat", color: "white" }}
          >
            {timeValue}
          </Typography>

          {/* <Button
        variant="contained"
        size="lg"
        startIcon={<ManageAccountsIcon sx={{ ml: 2 }} />}
        sx={{
          fontWeight: "md",
          fontFamily: "Montserrat",
          border: 1,
          borderRadius: "5%",
        }}
      >
        לשנות את השם
      </Button> */}

          <FormModal
            open={open}
            setOpen={setOpen}
            setupdateLoading={setupdateLoading}
            avatarRefer={avatarRef}
            setStam={setStam}
            setstamProfile={setstamProfile}
          />
          <FormModalSecond
            open={openEditValues}
            setOpen={setopenEditValue}
            setStam={setStam}
            setUserName={setUserName}
          />
        </Card>
      </Box>
    </Zoom>
  );
}
