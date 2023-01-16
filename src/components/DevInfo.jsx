import { Grid, Box, Badge, Avatar, Typography } from "@mui/joy";
import CodeIcon from "@mui/icons-material/Code";
import Ronaldo from "../assets/AboutUs/ronaldo.jpg";
export default function DevInfo() {
  return (
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
          Our first and the only guy that works hard on the project to give you
          the best experience
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
  );
}
