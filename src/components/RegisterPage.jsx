import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthLogic";
import { Typography } from "@mui/joy";
import { Divider, Grid, Box, Fade, Slide } from "@mui/material";
import registerLogo from "../assets/register.png";
import logo from "../assets/logo.gif";
import backRegister from "../assets/backRegister.jpg";
import "../css/RegisterAndLogin.css";

export default function LoginPage() {
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
                <Box>
                  <SignUp />
                </Box>
              </Fade>
            </Grid>
            <Slide direction="down" in={true}>
              <Box sx={{ position: "absolute", top: 50, mr: 8 }}>
                <img src={logo} width="140" height="140" alt="" id="logo" />
              </Box>
            </Slide>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "black",
                mx: 8,
                mt: 25,
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

              <Box sx={{ marginLeft: 8 }}>
                <img src={registerLogo} alt="" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </AuthProvider>
  );
}
