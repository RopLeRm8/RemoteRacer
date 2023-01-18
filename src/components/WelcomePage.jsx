import { Button, CssVarsProvider, Grid, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import stars from "../assets/WelcomePage/stars.png";
import "../css/WelcomePage.css";
import Centered from "./Centered";
export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Centered>
      <CssVarsProvider />
      <Grid
        container
        direction="column"
        sx={{ display: "flex", width: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <img src={stars} alt="" style={{ maxWidth: "100%" }} />
        <Typography
          sx={{
            mt: 7,
            fontFamily: "Poppins:wght@700",
            fontWeight: 700,
            fontSize: 36,
            color: "black",
            animation: "zoomIn 0.2s forwards",
          }}
        >
          Explore the app
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontFamily: "Inter",
            transform: "scale(0)",
            animation: "zoomIn 0.2s forwards 0.2s",
          }}
        >
          Choose one of the options below to continue
        </Typography>
        <Button
          sx={{
            width: "18vmax",
            borderRadius: "7px",
            fontFamily: "Inter",
            maxHeight: 60,
            mb: 1,
            transition: "all 0.3s ease-out",
            backgroundColor: "black",
            border: 2,
            transform: "scale(0.7)",
            animation: "zoomInAlmost 0.4s forwards 0.5s",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              borderColor: "black",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
        <Button
          sx={{
            width: "18vmax",
            mb: { xs: 10, md: 0 },
            backgroundColor: "white",
            fontFamily: "Inter",
            color: "black",
            border: 2,
            borderColor: "black",
            transition: "all 0.3s ease-out",
            transform: "scale(0.7)",
            animation: "zoomInAlmost 0.4s forwards 0.5s",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
      </Grid>
    </Centered>
  );
}
