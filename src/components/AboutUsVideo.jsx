import { Box, Grid, Typography } from "@mui/joy";
import { useContext } from "react";
import Poster from "../assets/AboutUs/Poster.png";
import videoshowcase from "../assets/AboutUs/video.mp4";
import "../css/About.css";
import { AboutContext } from "../pages/AboutUs";
export default function AboutUsVideo() {
  const AnimationContext = useContext(AboutContext);
  return (
    <Box sx={{ backgroundColor: "black", my: 5 }}>
      <AnimationContext animationName="animate__fadeInUp">
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          sx={{ pt: 5 }}
        >
          <Typography
            fontFamily="Anton"
            sx={{ color: "white", fontSize: "3vmax" }}
          >
            Be Amazed
          </Typography>
          <Grid container direction="column">
            <Typography
              fontFamily="Montserrat"
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                px: { xs: 2, sm: 0 },
                fontSize: "100%",
              }}
            >
              Use your car without phisycally touching it
            </Typography>
            <Typography
              fontFamily="Montserrat"
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                fontSize: "100%",
              }}
            >
              Move silent - move fast
            </Typography>
          </Grid>
        </Grid>
      </AnimationContext>
      <AnimationContext animationName="animate__slideInUp" duration={0.5}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 5, px: 2 }}>
          <video
            src={videoshowcase}
            controls
            style={{ maxWidth: "100%" }}
            poster={Poster}
          />
        </Box>
      </AnimationContext>
    </Box>
  );
}
