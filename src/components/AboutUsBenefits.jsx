import { Box, Grid, Tooltip, Typography } from "@mui/joy";
import { useContext } from "react";
import LazyLoad from "react-lazyload";
import CALENDAR from "../assets/AboutUs/CALENDAR.png";
import KEYS from "../assets/AboutUs/KEY.png";
import MAP from "../assets/AboutUs/MAP.png";

import "../css/About.css";
import { AboutContext } from "../pages/AboutUs";
export default function AboutUsBenefits() {
  const AnimationContext = useContext(AboutContext);
  return (
    <Box sx={{ mt: 5, backgroundColor: "black" }}>
      <Grid container direction="column">
        <AnimationContext animationName="animate__slideInDown">
          <Typography
            fontFamily="Anton"
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              mt: 5,
              px: { xs: 8, sm: 0 },
              fontSize: "3vmax",
            }}
          >
            All the benefits you will
          </Typography>
        </AnimationContext>
        <AnimationContext animationName="animate__flipInX">
          <Typography
            fontFamily="Anton"
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              px: { xs: 8, sm: 0 },
              fontSize: "3vmax",
            }}
          >
            get when you choose our services
          </Typography>
        </AnimationContext>
      </Grid>
      <AnimationContext animationName="animate__fadeInUp">
        <Grid container justifyContent="space-evenly" sx={{ py: 3, pb: 5 }}>
          <Box
            sx={{
              backgroundColor: "#107c64",
              p: 5,
              borderRadius: 15,
              mx: 1,
              mb: { xs: 1, sm: 0 },
            }}
          >
            <LazyLoad>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img src={KEYS} alt="" style={{ maxWidth: "40%" }} />
              </Box>
            </LazyLoad>
            <Typography
              fontFamily="Anton"
              fontSize={30}
              sx={{ color: "white", textAlign: "center", mb: 3 }}
            >
              Free Services
            </Typography>
            <Grid container direction="column">
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                Our services are completely free
              </Typography>
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                and available at any time at any hour
              </Typography>
            </Grid>
          </Box>
          <Box
            sx={{
              backgroundColor: "#882424",
              p: 5,
              borderRadius: 15,
              mx: 1,
              mb: { xs: 1, sm: 0 },
            }}
          >
            <LazyLoad>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img src={CALENDAR} alt="" style={{ maxWidth: "45%" }} />
              </Box>
            </LazyLoad>
            <Typography
              fontFamily="Anton"
              fontSize={30}
              sx={{ color: "white", textAlign: "center", mb: 3 }}
            >
              24/7 Support
            </Typography>
            <Grid container direction="column">
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                Any time, any hour
              </Typography>
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                mods will be available to help you
              </Typography>
            </Grid>
          </Box>
          <Box
            sx={{ backgroundColor: "#103c8c", p: 5, borderRadius: 15, mx: 1 }}
          >
            <LazyLoad>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img src={MAP} alt="" style={{ maxWidth: "35%" }} />
              </Box>
            </LazyLoad>

            <Typography
              fontFamily="Anton"
              fontSize={30}
              sx={{ color: "white", textAlign: "center", mb: 3 }}
            >
              Multiple branches
            </Typography>
            <Grid container direction="column">
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                You can enjoy our services everywhere
              </Typography>
              <Typography
                fontFamily="Montserrat"
                fontSize={20}
                sx={{ color: "white", textAlign: "center" }}
              >
                without having to worry about it
              </Typography>
              <Tooltip
                variant="outlined"
                color="warning"
                title={
                  <Grid container direction="column">
                    <Typography sx={{ textAlign: "center" }}>
                      Branch #1 - Honk-Kong (China)
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                      Branch #2 - Maelbourne (Australia)
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                      Branch #3 - Moscow (Russia)
                    </Typography>
                  </Grid>
                }
              >
                <Typography
                  fontFamily="Montserrat"
                  fontSize={20}
                  sx={{
                    color: "white",
                    textAlign: "center",
                    mt: 1,
                    fontWeight: 700,
                    textDecoration: "underline",
                    "&:hover": {
                      cursor: "none",
                    },
                  }}
                >
                  List of Branches
                </Typography>
              </Tooltip>
            </Grid>
          </Box>
        </Grid>
      </AnimationContext>
    </Box>
  );
}
