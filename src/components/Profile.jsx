import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Card,
  CardOverflow,
  CssVarsProvider,
  Badge,
  ListItem,
  List,
  ListDivider,
  Tooltip,
  IconButton,
} from "@mui/joy";
import { Stepper, Typography, Box, Step, StepLabel } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./NavBar";
import ListSubheader from "@mui/joy/ListSubheader";
import UploadIcon from "@mui/icons-material/Upload";
import EmailIcon from "@mui/icons-material/Email";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useCallback } from "react";
import { useState } from "react";
import FormDialog from "./FormModal";
import background from "../assets/backgroundProfile.jpg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(getAuth());
  const [updateLoading, setupdateLoading] = useState(false);
  const avatarRef = useRef();
  const steps = [["כניסה למשתמש"], ["לשנות את שם האוטו"], ["לשחק משחק ראשון"]];

  const updateProfile = useCallback(() => {
    setOpen(true);
    setupdateLoading((previous) => !previous);
  }, []);

  useEffect(() => {
    avatarRef.current.src = user.photoURL;
  }, [user.photoURL]);

  const isStepFailed = (step) => {
    return step === 1;
  };
  return (
    <div
      style={{
        backgroundPosition: "center",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <CssVarsProvider />
      <Navbar />

      <Container className="mt-5">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={true}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (index === 1) {
                labelProps.optional = (
                  <Typography
                    variant="outlined"
                    sx={{ color: "green", fontWeight: 500, fontSize: 20 }}
                  >
                    !שלב הבא
                  </Typography>
                );
              }
              if (index === 0) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <Typography
                      sx={{ fontFamily: "Noto Sans Hebrew", color: "white" }}
                    >
                      {label[0]}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Container>
      <Container
        className="mt-5 d-flex align-items-start justify-content-center"
        style={{ minHeight: "77.4vh" }}
      >
        <Card variant="outlined" sx={{ width: 400, p: 3.5, height: 450 }}>
          <CardOverflow dir="rtl">
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
                ></Avatar>
              </Tooltip>
            </Badge>
            {updateLoading && open ? (
              <Button
                variant="contained"
                size="lg"
                color="primary"
                sx={{
                  mr: 9,
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
                size="lg"
                color="primary"
                sx={{
                  mr: 9,
                  fontWeight: "md",
                  fontFamily: "Noto Sans Hebrew",
                  border: 1,
                  borderRadius: "5%",
                }}
                onClick={updateProfile}
              >
                שינוי תמונה <UploadIcon />
              </Button>
            )}
          </CardOverflow>
          <CardOverflow dir="rtl" sx={{ mt: 1 }}>
            <List variant="outlined" size="lg" sx={{ "--List-radius": "20px" }}>
              <ListSubheader>
                <PermIdentityIcon
                  size="sm"
                  variant="plain"
                  sx={{ mb: 1, ml: 1 }}
                />
                <Typography
                  component="h2"
                  mb={1}
                  sx={{
                    letterSpacing: "0.1rem",
                    fontFamily: "Noto Sans Hebrew",
                  }}
                >
                  פרטי משתמש
                </Typography>
              </ListSubheader>
              <ListItem>
                <Typography
                  level="body2"
                  sx={{ fontFamily: "Noto Sans Hebrew" }}
                >
                  <EmailIcon /> מייל:
                  <Tooltip title={user.email} enterDelay={500}>
                    <b className="me-1">{user.email}</b>
                  </Tooltip>
                </Typography>
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <Tooltip title={user.displayName?.split(" ")[0] || "אין"}>
                  <Typography sx={{ fontFamily: "Noto Sans Hebrew" }}>
                    שם פרטי: <b>{user.displayName?.split(" ")[0] || "אין"} </b>
                  </Typography>
                </Tooltip>
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <Tooltip title={user.displayName?.split(" ")[1] || "אין"}>
                  <Typography sx={{ fontFamily: "Noto Sans Hebrew" }}>
                    שם משפחה: <b>{user.displayName?.split(" ")[1] || "אין"}</b>
                  </Typography>
                </Tooltip>
              </ListItem>
            </List>
            <Button
              variant="contained"
              size="lg"
              startIcon={<ManageAccountsIcon className="ms-2" />}
              sx={{
                mr: 11,
                mt: 2,
                fontWeight: "md",
                fontFamily: "Noto Sans Hebrew",
                border: 1,
                borderRadius: "5%",
              }}
            >
              לשנות את השם
            </Button>
          </CardOverflow>
        </Card>
        {
          <FormDialog
            open={open}
            setOpen={setOpen}
            setupdateLoading={setupdateLoading}
          />
        }
      </Container>
    </div>
  );
}
