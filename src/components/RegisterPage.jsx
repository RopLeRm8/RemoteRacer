import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthLogic";
import { Typography } from "@mui/joy";
import { Divider, Grid, Box, Fade, Slide } from "@mui/material";
import registerLogo from "../assets/services.png";
import logo from "../assets/logoblack.svg";
import "../css/RegisterAndLogin.css";
import { useEffect } from "react";

export default function RegisterPage() {
  useEffect(() => {
    document.body.classList.add("addbg");
    return () => {
      document.body.classList.remove("addbg");
    };
  }, []);

  return (
    <AuthProvider>
      <Container>
        <Container>
          <Box
            sx={{
              mb: 12,
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
                      "@media screen and (max-width: 90em)": {
                        px: 3.5,
                      },
                    }}
                  >
                    <SignUp />
                  </Box>
                </Fade>
              </Grid>
              <Slide direction="right" in={true}>
                <Box sx={{ position: "absolute", top: 50, mr: 8 }}>
                  <img
                    src={logo}
                    width="140"
                    height="140"
                    alt=""
                    id="logo"
                    style={{ animation: "rotationAndZoom 1s forwards" }}
                  />
                </Box>
              </Slide>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: "black",
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
                    dir="rtl"
                    sx={{
                      fontFamily: "Noto Sans Hebrew",
                      textAlign: "justify",
                      fontSize: 25,
                      fontWeight: 600,
                    }}
                  >
                    תהנה מהשירותים שלנו, הירשם כעת! השירותים שלנו חינמיים
                  </Typography>
                </Slide>
                <Slide direction="right" in={true}>
                  <Typography
                    dir="rtl"
                    sx={{
                      fontFamily: "Noto Sans Hebrew",
                      fontSize: 25,
                      fontWeight: 300,
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    למידע נוסף, גש לעמוד "עלינו"
                  </Typography>
                </Slide>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    ml: 8,
                  }}
                >
                  <img src={registerLogo} alt="" className="regLogo" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </AuthProvider>
  );
}
