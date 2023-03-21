import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Grid, Typography } from "@mui/joy";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import "../css/GettingStarted.css";
import LogoMaker from "../features/LogoMaker";
import useAddAnimation from "../hooks/useAddAnimation";
import useStepHandler from "../hooks/useStepHandler";
import useTabs from "../hooks/useTabs";

export default function GettingStartedTabs() {
  const tabs = useTabs();
  const [activeStep, setactiveStep] = useState(0);
  const stepHandler = useStepHandler(setactiveStep);
  const animHandler = useAddAnimation();
  const tab = useRef();
  useEffect(() => {
    const handleAnimation = () => {
      animHandler(tab, "animated", 3, tab);
    };
    handleAnimation();
  }, [activeStep, animHandler]);
  useEffect(() => {
    document.body.classList.add("addBackgroundGettingStarted");
    return () => {
      document.body.classList.remove("addBackgroundGettingStarted");
    };
  }, []);
  const handleStep = (step) => {
    stepHandler(step);
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      ref={tab}
    >
      <Grid container direction="column">
        <Box
          sx={{
            background: "rgba(0,0,0,0)",
            pb: { sm: 4, md: 13, lg: 10, xl: 5 },
            pt: { md: 2 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Anton",
              fontSize: "4vh",
              color: "white",
              display: "flex",
              justifyContent: "center",
              mt: 4,
              ml: { xs: 4, lg: 0 },
            }}
            endDecorator={<LogoMaker />}
          >
            GETTING STARTED
          </Typography>
          <Typography
            sx={{
              fontFamily: "Anton",
              fontSize: "2vh",
              color: "white",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              mb: 6,
              mx: 1,
            }}
          >
            If you're stuck at any point on our website, here is a quick guide
            on every mechanic
          </Typography>
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={{ xs: "row", sm: "column" }}
          sx={{
            height: "50vh",
            m: { xs: 1, sm: 3 },
            mb: { md: 30, lg: 15, xl: 3 },
          }}
        >
          <Box sx={{ border: "0.5px black solid", width: "100%" }}>
            <Grid item>
              <Paper
                variant="elevation"
                elevation={1}
                sx={{ borderRadius: "0px", background: "black" }}
              >
                <Typography
                  textAlign="center"
                  fontFamily="Montserrat"
                  fontWeight={300}
                  sx={{ fontSize: "200%", color: "white" }}
                >
                  {tabs[activeStep]?.title}
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <LazyLoad>
                  <img
                    src={tabs[activeStep]?.img}
                    alt=""
                    style={{ maxWidth: "13vmax" }}
                  />
                </LazyLoad>
              </Box>
              <Typography
                textAlign="justify"
                fontFamily="Poppins"
                fontWeight={500}
                sx={{
                  fontSize: "130%",
                  whiteSpace: "pre-line",
                  color: "whitesmoke",
                  my: 3,
                  px: 3,
                }}
              >
                {tabs[activeStep]?.content}
              </Typography>
              {tabs[activeStep]?.steps ? (
                <Stepper
                  alternativeLabel
                  sx={{
                    my: 5,
                  }}
                  activeStep={tabs[activeStep]?.steps.length}
                >
                  {tabs[activeStep]?.steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={
                          index === tabs[activeStep]?.steps.length - 1
                            ? ExpandCircleDownIcon
                            : ArrowCircleRightIcon
                        }
                        StepIconProps={{ sx: { color: "white" } }}
                      >
                        <Typography fontFamily="Inter" sx={{ color: "white" }}>
                          {step}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              ) : null}
              <MobileStepper
                variant="dots"
                steps={6}
                position="static"
                activeStep={activeStep}
                sx={{
                  background: "black",
                  ".MuiMobileStepper-dot": {
                    backgroundColor: "orange",
                  },
                  ".MuiMobileStepper-dotActive": { backgroundColor: "white" },
                }}
                nextButton={
                  <Button
                    size="small"
                    onClick={() => handleStep("next")}
                    disabled={activeStep === 5}
                    sx={{
                      color: "white",
                      ":disabled": { color: "rgba(255,255,255,0.6)" },
                      fontFamily: "Poppins",
                      fontSize: "120%",
                    }}
                  >
                    Next
                    <KeyboardArrowRightIcon sx={{ mb: 0.2 }} />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={() => handleStep("prev")}
                    disabled={activeStep === 0}
                    sx={{
                      color: "white",
                      ":disabled": { color: "rgba(255,255,255,0.6)" },
                      fontFamily: "Poppins",
                      fontSize: "120%",
                    }}
                  >
                    <KeyboardArrowLeftIcon sx={{ mb: 0.2 }} />
                    Back
                  </Button>
                }
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
