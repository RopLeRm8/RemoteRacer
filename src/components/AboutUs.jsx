import {
  Avatar,
  Badge,
  Box,
  Button,
  CssVarsProvider,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
// import Navbar from "./NavBar";
import React, { useEffect } from "react";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useNavigate } from "react-router-dom";
import ProfileCenter from "../assets/ProfileCenter.png";
import HeightBanner from "../assets/HeightBanner.png";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import FlagIcon from "@mui/icons-material/Flag";
import CodeIcon from "@mui/icons-material/Code";
import "../css/About.css";
import Ronaldo from "../assets/ronaldo.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import honkkong from "../assets/honkkong.webp";
import maelbourne from "../assets/1287671.webp";
import moscow from "../assets/moscow.jpg";
const listOfServices = [
  [
    "Branch #1 - Asia",
    "Honk Kong",
    <MiscellaneousServicesRoundedIcon
      sx={{
        color: "black",
        fontSize: 50,
        display: "flex",
        justifyContent: "center",
      }}
    />,
    "China",
    honkkong,
  ],
  [
    "Branch #2 - Oceania",
    "MaelBourne",
    <AccountBalanceIcon
      sx={{
        color: "black",
        fontSize: 50,
        display: "flex",
        justifyContent: "center",
      }}
    />,
    "Australia",
    maelbourne,
  ],
  [
    "Branch #3 - Europe",
    "Moscow",
    <AirlineSeatFlatIcon
      sx={{
        color: "black",
        fontSize: 50,
        display: "flex",
        justifyContent: "center",
      }}
    />,
    "Russia",
    moscow,
  ],
];

export default function AboutUs() {
  useEffect(() => {
    AOS.init();
  }, []);
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#ffe500",
          justifyContent: "center",
          py: 10,
          px: { xs: 4 },
        }}
      >
        <CssVarsProvider />
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Typography
              dir="rtl"
              fontWeight={400}
              sx={{ fontSize: { xs: 45, sm: 50 }, fontFamily: "Anton" }}
            >
              REMOTE RACER
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontFamily: "Anton" }} fontSize={20}>
              We help you to do the first step into the new era that includes
              innovative and fun technologies
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontFamily: "Anton" }}>
              The company provides fun and innovative technologies for free
            </Typography>
          </Grid>

          <Grid item display="flex">
            <Button
              onClick={() => navigate("/profile")}
              startDecorator={<Person2RoundedIcon />}
              variant="solid"
              color="neutral"
              sx={{
                mt: 2,
                fontSize: 15,
                fontFamily: "Anton",
                backgroundColor: "black",
                letterSpacing: 1,
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              My Profile
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={ProfileCenter}
          width="100%"
          style={{ backgroundSize: "cover" }}
          alt=""
        />
      </Box>
      <Stack
        sx={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",

          // maxHeight: "63em",
        }}
        direction={{ xs: "column", lg: "row" }}
        spacing={{ lg: 20 }}
      >
        <Box sx={{ width: { lg: "60%" }, mt: 10 }}>
          <Typography
            data-aos="slide-right"
            fontWeight={200}
            fontSize={35}
            sx={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Anton",
              color: "#ffe500",
              mb: 2,
            }}
          >
            Our branches:
          </Typography>
          {/* STARTING FROM SMALL SCREENS GRID*/}
          <Grid
            data-aos="slide-right"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 15, display: { xs: "none", sm: "flex" } }}
          >
            {listOfServices.map((service) => (
              <Box
                key={service[0]}
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                    transition: "all 0.4s ease-in-out",
                  },
                  transform: "translate(0px,0px)",
                  transition: "all 0.4s ease-in-out",
                  p: 11,
                  mx: 3,
                  mb: { xs: 4 },
                  borderRadius: 20,
                  background: "#f9f9f9",
                  width: "45%",
                  backgroundImage: `url(${service[4]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 36,
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontFamily: "Anton",
                    color: "white",
                    WebkitTextStroke: "1px black",
                  }}
                >
                  {service[0]}
                </Typography>

                <Typography
                  sx={{
                    color: "#777",
                    fontSize: 30,
                    lineHeight: 2,
                    letterSpacing: 0.5,
                    m: 0,
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Anton",
                    WebkitTextStroke: "0.3px black",
                  }}
                >
                  {service[1]}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#777",
                    fontSize: 25,
                    lineHeight: 2,
                    letterSpacing: 0.5,
                    m: 0,
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Anton",
                  }}
                  startDecorator={<FlagIcon />}
                >
                  {service[3]}
                </Typography>
              </Box>
            ))}
          </Grid>
          {/* STARTING FROM PHONE SCREENS GRID*/}
          <Grid
            data-aos="slide-right"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 15, display: { xs: "flex", sm: "none" } }}
          >
            {listOfServices.map((service) => (
              <Box
                key={service[0]}
                sx={{
                  p: 5,
                  py: 20,
                  mb: { xs: 4 },
                  borderRadius: 20,
                  width: "95%",
                  backgroundImage: `url(${service[4]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 26,
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontFamily: "Anton",
                    color: "white",
                    WebkitTextStroke: "1px black",
                  }}
                >
                  {service[0]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 26,
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontFamily: "Anton",
                    color: "white",
                    WebkitTextStroke: "1px black",
                  }}
                >
                  {service[3]}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            width: "60%",
            display: { xs: "none", sm: "block" },
            py: { lg: 25 },
          }}
          data-aos="zoom-in-left"
        >
          <img src={HeightBanner} />
        </Box>
      </Stack>
      <Grid
        container
        alignItems="center"
        direction="column"
        sx={{ px: { xs: 5, sm: 10, md: 0, backgroundColor: "#ffe500" } }}
      >
        <Grid item>
          <Box
            sx={{ display: "flex", justifyContent: "center", mb: 3 }}
            data-aos="zoom-in-up"
          >
            <Badge
              badgeInset="20px 30px 0px 0px"
              color="warning"
              badgeContent={<CodeIcon />}
              size="lg"
              sx={{ mt: 5 }}
            >
              <Avatar sx={{ "--Avatar-size": "170px" }} src={Ronaldo} />
            </Badge>
          </Box>
        </Grid>
        <Grid item>
          <Typography
            fontSize={{ xs: 12, sm: 20 }}
            fontFamily="Anton"
            data-aos="zoom-out-up"
          >
            Our first and the only guy that works hard on the project to give
            you the best experience
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 3, mt: { xs: 1 } }}>
          <Typography
            fontFamily="Anton"
            fontSize={{ xs: 12, sm: 18 }}
            data-aos="zoom-out-up"
          >
            Props to this guy for updating the website very frequently
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 2 }}>
          <Typography
            fontFamily="Anton"
            fontWeight={800}
            fontSize={28}
            data-aos="zoom-out-up"
            sx={{ letterSpacing: 2 }}
          >
            ilya
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 6 }}>
          <Typography
            fontFamily="Anton"
            fontSize={25}
            fontWeight={300}
            sx={{ letterSpacing: 6 }}
            data-aos="zoom-out-up"
          >
            DEVELOPER
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
