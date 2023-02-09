import { Box } from "@mui/joy";
import "animate.css/animate.min.css";
import React, { createContext } from "react";
import ProfileCenter from "../assets/AboutUs/ProfileCenter.png";
import AboutUsBenefits from "../components/AboutUsBenefits";
import AboutUsDevInfo from "../components/AboutUsDevInfo";
import AboutUsHeader from "../components/AboutUsHeader";
import AboutUsInfo from "../components/AboutUsInfo";
import AboutUsVideo from "../components/AboutUsVideo";
import "../css/About.css";
import "../css/SmoothSlide.css";
import ScrollAnimation from "../features/ScrollAnimation";
import Footer from "../layouts/Footer";

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
