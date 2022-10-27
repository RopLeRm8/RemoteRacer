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
  Button,
} from "@mui/joy";
import { Typography } from "@mui/material";
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

export default function Profile() {
  const [user] = useAuthState(getAuth());

  const [updateLoading, setupdateLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const updateProfile = useCallback(() => {
    setOpenDialog(true);
    setupdateLoading((previous) => !previous);
  }, []);
  return (
    <div>
      <CssVarsProvider />
      <Navbar />

      <Container
        className="mt-5 d-flex align-items-start justify-content-end"
        style={{ minHeight: "85vh" }}
      >
        <Card variant="outlined" sx={{ width: 320, p: 3.5 }}>
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
              <Avatar
                src={user.photoURL}
                sx={{ width: 80, height: 80, mb: 1 }}
              ></Avatar>
            </Badge>
            {updateLoading ? (
              <Button
                variant="soft"
                size="lg"
                color="primary"
                sx={{ mr: 4 }}
                loading
              >
                העלאה <UploadIcon />
              </Button>
            ) : (
              <Button
                variant="soft"
                size="lg"
                color="primary"
                sx={{ mr: 4 }}
                onClick={updateProfile}
              >
                העלאה <UploadIcon />
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
                  מייל: <b>{user.email}</b>
                </Typography>
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <Typography sx={{ fontFamily: "Noto Sans Hebrew" }}>
                  שם פרטי: <b>{user.displayName?.split(" ")[0] || "אין"} </b>
                </Typography>
              </ListItem>
              <ListDivider inset={"gutter"} />
              <ListItem>
                <Typography sx={{ fontFamily: "Noto Sans Hebrew" }}>
                  שם משפחה: <b>{user.displayName?.split(" ")[1] || "אין"}</b>
                </Typography>
              </ListItem>
            </List>
          </CardOverflow>
        </Card>
        {openDialog && <FormDialog />}
      </Container>
    </div>
  );
}
