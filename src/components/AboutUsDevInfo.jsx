import CodeIcon from "@mui/icons-material/Code";
import { Avatar, Badge, Box, Grid, Typography } from "@mui/joy";
import { useContext } from "react";
import Ronaldo from "../assets/AboutUs/ronaldo.jpg";
import { AboutContext } from "./AboutUs";
export default function DevInfo() {
  const AnimationContext = useContext(AboutContext);
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      sx={{ px: { xs: 5, sm: 10, md: 0, backgroundColor: "#ffe500" } }}
    >
      <AnimationContext animationName="animate__zoomIn">
        <Grid item>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
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
      </AnimationContext>
      <AnimationContext animationName="animate__zoomIn">
        <Grid item>
          <Typography fontSize={{ xs: 12, sm: 20 }} fontFamily="Anton">
            Our first and the only guy that works hard on the project to give
            you the best experience
          </Typography>
        </Grid>
      </AnimationContext>
      <AnimationContext animationName="animate__zoomIn">
        <Grid item sx={{ mb: 3, mt: { xs: 1 } }}>
          <Typography fontFamily="Anton" fontSize={{ xs: 12, sm: 18 }}>
            Props to this guy for updating the website very frequently
          </Typography>
        </Grid>
      </AnimationContext>
      <AnimationContext animationName="animate__zoomIn">
        <Grid item sx={{ mb: 2 }}>
          <Typography
            fontFamily="Anton"
            fontWeight={800}
            fontSize={28}
            sx={{ letterSpacing: 2 }}
          >
            ilya
          </Typography>
        </Grid>
      </AnimationContext>
      <AnimationContext animationName="animate__zoomIn">
        <Grid item sx={{ mb: 6 }}>
          <Typography
            fontFamily="Anton"
            fontSize={25}
            fontWeight={300}
            sx={{ letterSpacing: 6 }}
          >
            DEVELOPER
          </Typography>
        </Grid>
      </AnimationContext>
    </Grid>
  );
}
