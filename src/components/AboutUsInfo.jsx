import { Box, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
// import { AnimationOnScroll } from "react-animation-on-scroll";
import aboutimg from "../assets/AboutUs/aboutimg.png";
import { AboutContext } from "../pages/AboutUs";
export default function AboutUsInfo() {
  const AnimationContext = useContext(AboutContext);
  return (
    <Box sx={{ backgroundColor: "rgba(0,0,0,0.93)" }}>
      <Typography
        fontFamily="Anton"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#ffe500",
          pt: 10,
          pb: 3,
          fontSize: "3vmax",
        }}
      >
        ABOUT US
      </Typography>
      <AnimationContext animationName="animate__fadeInDown">
        <Stack
          sx={{
            pb: 7,
          }}
          direction={{ xs: "column", lg: "row" }}
        >
          <Typography
            fontFamily="Montserrat"
            sx={{
              color: "white",
              px: { xs: 3, lg: 10 },
              pb: { xs: 3, lg: 0 },
              fontSize: "120%",
              textAlign: "center",
            }}
          >
            We pride ourselves at being able to get our customer into the car
            that they want, and more importantly, at they price they are looking
            for.
            <br />
            <br />
            We maintain outstanding customer service by listening to our
            customers and making sure that we meet their needs. Even if you
            don't buy from us, we will offer free advice on whe to look for when
            buying a used car or truck.
            <br />
            <br />
            Our philosophy is to accomodate you, the customer, with outstanding
            service while providing you the highest quality automobile needs at
            wholesale prices. We have a wide selection of vehicles and the
            expertise to deal with what you are looking for.
          </Typography>
          <Box
            sx={{
              width: { xs: "100%", lg: "160%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={aboutimg} style={{ maxWidth: "100%" }} alt="" />
          </Box>
        </Stack>
      </AnimationContext>
    </Box>
  );
}
