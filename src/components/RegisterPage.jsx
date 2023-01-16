import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthLogic";
import { Typography, Button } from "@mui/joy";
import { Divider, Grid, Box, Fade, Slide } from "@mui/material";
import logo from "../assets/Global/logo.png";
import "../css/RegisterAndLogin.css";
import { useEffect } from "react";
import { useState } from "react";

export default function RegisterPage() {
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
          <Box
            sx={{
              mb: { xs: 3, md: 12 },
              // backgroundImage: `url(${back})`,
            }}
          >
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
              <Grid item xs={0} sx={{ marginTop: 20, width: "500px" }}>
                <Fade in={true}>
                  <Box
                    sx={{
                      px: { xs: 4, md: 0 },
                      ml: { xs: 4, md: 0 },
                    }}
                  >
                    <SignUp focus={focus} />
                  </Box>
                </Fade>
              </Grid>
              <Slide direction="right" in={true}>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 15, lg: 50 },
                    mr: { lg: 8 },
                    ml: { xs: 6, md: 0 },
                    // display: { xs: "none", lg: "flex" },
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
                      display: "flex",
                      justifyContent: "center",
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

              <Grid item xs={14} md={8} sm={12} lg={4} sx={{ mt: { lg: 15 } }}>
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
                    mb: 2,
                  }}
                  onClick={() => setFocus((prev) => !prev)}
                >
                  SIGN UP NOW
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </AuthProvider>
  );
}
