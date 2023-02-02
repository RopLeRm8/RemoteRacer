import { Box } from "@mui/joy";
import React, { useEffect } from "react";
import ProfileCenter from "../assets/AboutUs/ProfileCenter.png";
import "../css/About.css";
import "../css/SmoothSlide.css";
import useInitializeAOS from "../hooks/useInitializeAOS";
import Footer from "../layouts/Footer";
import AboutUsBenefits from "./AboutUsBenefits";
import AboutUsHeader from "./AboutUsHeader";
import AboutUsInfo from "./AboutUsInfo";
import AboutUsVideo from "./AboutUsVideo";
import DevInfo from "./DevInfo";

export default function AboutUs() {
  const initializeAOS = useInitializeAOS();
  useEffect(() => {
    initializeAOS;
  }, [initializeAOS]);

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
      <AboutUsInfo />
      <AboutUsBenefits />
      <AboutUsVideo />
      <DevInfo />
      <Footer />
    </Box>
  );
}
