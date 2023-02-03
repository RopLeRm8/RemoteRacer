import { Box } from "@mui/joy";
import "animate.css/animate.min.css";
import React, { createContext } from "react";
import ProfileCenter from "../assets/AboutUs/ProfileCenter.png";
import "../css/About.css";
import "../css/SmoothSlide.css";
import ScrollAnimation from "../features/ScrollAnimation";
import Footer from "../layouts/Footer";
import AboutUsBenefits from "./AboutUsBenefits";
import AboutUsDevInfo from "./AboutUsDevInfo";
import AboutUsHeader from "./AboutUsHeader";
import AboutUsInfo from "./AboutUsInfo";
import AboutUsVideo from "./AboutUsVideo";

export const AboutContext = createContext();

export default function AboutUs() {
  return (
    <Box>
      <AboutUsHeader />
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
      <AboutContext.Provider value={ScrollAnimation}>
        <AboutUsInfo />
        <AboutUsBenefits />
        <AboutUsVideo />
        <AboutUsDevInfo />
      </AboutContext.Provider>
      <Footer />
    </Box>
  );
}
