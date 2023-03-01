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
import useAddAnimation from "../hooks/useAddAnimation";
import useBodyColorChange from "../hooks/useBodyColorChange";
import useStepHandler from "../hooks/useStepHandler";
import useTabs from "../hooks/useTabs";

export default function GettingStartedTabs() {
  const tabs = useTabs();
  const [activeStep, setactiveStep] = useState(0);
  const stepHandler = useStepHandler(setactiveStep);
  const animHandler = useAddAnimation();
  const bodyToBlack = useBodyColorChange();
  const tab = useRef();
  useEffect(() => {
    const handleAnimation = () => {
      animHandler(tab, "animated", 3, tab);
    };
    handleAnimation();
  }, [activeStep, animHandler, bodyToBlack]);
  const handleStep = (step) => {
    stepHandler(step);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} ref={tab}>
      <Grid
        container
        justifyContent="center"
        direction={{ xs: "row", sm: "column" }}
        sx={{
          height: "80vh",
          maxWidth: { xs: "90%", lg: "95%" },
          my: 5,
        }}
      >
        <Box sx={{ border: "0.5px white solid" }}>
          <Grid item>
            <Paper
              variant="elevation"
              elevation={1}
              sx={{ borderRadius: "0px" }}
            >
              <Typography
                textAlign="center"
                fontFamily="Inter"
                fontWeight={300}
                sx={{ fontSize: "150%" }}
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
                      <Typography sx={{ color: "white" }}>{step}</Typography>
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
              nextButton={
                <Button
                  size="small"
                  onClick={() => handleStep("next")}
                  disabled={activeStep === 5}
                >
                  Next
                  <KeyboardArrowRightIcon sx={{ mb: 0.55 }} />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={() => handleStep("prev")}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeftIcon sx={{ mb: 0.55 }} />
                  Back
                </Button>
              }
            />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
