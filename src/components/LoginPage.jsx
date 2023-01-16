import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import SignIn from "./SignIn";
import { AuthProvider } from "../contexts/AuthLogic";
import { Typography, Button } from "@mui/joy";
import { Divider, Grid, Box, Fade, Slide } from "@mui/material";
import logo from "../assets/Global/logo.png";
import { useState } from "react";

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
      <Container>
        <Container>
          <Grid
            container
            direction="row-reverse"
            spacing={{ xs: 4, md: 3, lg: 5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={0} sx={{ marginTop: 18, width: "500px" }}>
              <Fade in={true}>
                <Box
                  sx={{
                    px: { xs: 3, md: 0 },
                    ml: { xs: 4, md: 0 },
                  }}
                >
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
                  ml: { xs: 7, md: 0 },
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
              </Box>
            </Slide>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "white",
                mx: 8,
                mt: 30,
                "@media screen and (max-width: 90em)": {
                  display: "none",
                },
              }}
            />

            <Grid item xs={14} md={8} sm={12} lg={4}>
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
        </Container>
      </Container>
    </AuthProvider>
  );
}
