import { Box } from "@mui/joy";
import { Skeleton } from "@mui/material";
import "animate.css/animate.min.css";
import React, { createContext, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import ProfileCenter from "../assets/AboutUs/ProfileCenter.png";
import AboutUsBenefits from "../components/AboutUsBenefits";
import AboutUsDevInfo from "../components/AboutUsDevInfo";
import AboutUsHeader from "../components/AboutUsHeader";
import AboutUsInfo from "../components/AboutUsInfo";
import AboutUsVideo from "../components/AboutUsVideo";
import "../css/About.css";
import "../css/SmoothSlide.css";
import ScrollAnimation from "../features/ScrollAnimation";
// import Footer from "../layouts/Footer";
import Navbar from "../layouts/NavBar";
export const AboutContext = createContext();

export default function AboutUs() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);
  const [imgLoaded, setimgLoaded] = useState(false);
  return (
    <Box>
      <Navbar />
      <AboutUsHeader />
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LazyLoad>
            <img
              src={ProfileCenter}
              width="100%"
              style={{
                backgroundSize: "cover",
                display: imgLoaded ? "flex" : "none",
              }}
              alt=""
              onLoad={() => setimgLoaded(true)}
            />
          </LazyLoad>
          <Skeleton
            variant="rounded"
            width="100%"
            height={300}
            sx={{ mb: 3, display: imgLoaded ? "none" : "flex" }}
          />
        </Box>
      </Box>
      <AboutContext.Provider value={ScrollAnimation}>
        <AboutUsInfo />
        <AboutUsBenefits />
        <AboutUsVideo />
        <AboutUsDevInfo />
      </AboutContext.Provider>
      {/* <Footer /> */}
    </Box>
  );
}
