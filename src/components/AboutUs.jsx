import { Box } from "@mui/joy";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import ProfileCenter from "../assets/AboutUs/ProfileCenter.png";
import "../css/About.css";
import "../css/SmoothSlide.css";
import Footer from "../layouts/Footer";
import AboutUsBenefits from "./AboutUsBenefits";
import AboutUsInfo from "./AboutUsInfo";
import AboutUsVideo from "./AboutUsVideo";
import DevInfo from "./DevInfo";
import HeeaderAboutUs from "./HeaderAboutUs";

export default function AboutUs() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Box>
      <HeeaderAboutUs />
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
