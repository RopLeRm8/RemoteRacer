import { Box, Grid, Typography } from "@mui/joy";
import videoshowcase from "../assets/AboutUs/video.mp4";
import Poster from "../assets/AboutUs/Poster.png";
import "../css/About.css";
export default function AboutUsVideo() {
  return (
    <Box sx={{ backgroundColor: "black", my: 5 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        sx={{ pt: 5 }}
        data-aos="slide-up"
      >
        <Typography fontFamily="Anton" fontSize={70} sx={{ color: "white" }}>
          Be Amazed
        </Typography>
        <Grid container direction="column">
          <Typography
            fontFamily="Montserrat"
            fontSize={20}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            Use your car without phisycally touching it
          </Typography>
          <Typography
            fontFamily="Montserrat"
            fontSize={20}
            sx={{ color: "white", display: "flex", justifyContent: "center" }}
          >
            Move silent - move fast
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", py: 5, px: 2 }}
        data-aos="slide-right"
      >
        <video
          src={videoshowcase}
          controls
          style={{ maxWidth: "100%" }}
          poster={Poster}
        />
      </Box>
    </Box>
  );
}
