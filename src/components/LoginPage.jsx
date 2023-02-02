import { Button, Divider, Typography } from "@mui/joy";
import { Box, Fade, Grid, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../assets/Global/logo.png";
import { AuthProvider } from "../contexts/AuthLogic";
import SignIn from "./SignIn";

export default function LoginPage() {
  useEffect(() => {
    document.body.classList.add("addbg");
    return () => {
      document.body.classList.remove("addbg");
    };
  }, []);
  const [focus, setFocus] = useState(false);
  return (
    <AuthProvider>
      <Grid
        container
        direction="row-reverse"
        spacing={{ xs: 4, md: 3, lg: 2 }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={0} sx={{ marginTop: 18, width: "500px" }}>
          <Fade in={true}>
            <Box>
              <SignIn focus={focus} />
            </Box>
          </Fade>
        </Grid>
        <Slide direction="left" in={true}>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 10, lg: 50 },
              mr: { lg: 8 },
              ml: { xs: 8, md: 0 },
            }}
          >
            <img
              src={logo}
              width="200"
              height="125"
              alt=""
              id="logo"
              style={{
                animation: "rotationAndZoom 1s forwards",
              }}
            />
            <Divider
              sx={{
                backgroundColor: "white",
                p: 0.1,
                minHeight: "30vmax",
                ml: 11,
                mt: 5,
                display: { xs: "none", md: "flex" },
              }}
              orientation="vertical"
            />
          </Box>
        </Slide>
        <Grid item xs={14} md={8} sm={12} lg={3} sx={{ mt: { lg: 15 } }}>
          <Slide direction="right" in={true}>
            <Typography
              sx={{
                fontFamily: "Anton",
                textAlign: "center",
                fontSize: 82,
                fontWeight: 400,
                color: "#ffe500",
              }}
            >
              LETS GET YOU
            </Typography>
          </Slide>
          <Slide direction="right" in={true}>
            <Typography
              sx={{
                fontFamily: "Anton",
                fontSize: 75,
                fontWeight: 300,
                color: "white",
                textAlign: "center",
              }}
            >
              ON THE ROAD
            </Typography>
          </Slide>
          <Button
            sx={{
              fontFamily: "Montserrat",
              fontSize: 16,
              width: "100%",
              display: "flex",
              borderRadius: "50px",
              color: "black",
              backgroundColor: "rgba(255,228,0)",
              "&:hover": {
                backgroundColor: "rgba(255,228,0,0.9)",
              },
              mb: 4,
            }}
            onClick={() => setFocus((prev) => !prev)}
          >
            SIGN IN NOW
          </Button>
        </Grid>
      </Grid>
    </AuthProvider>
  );
}
