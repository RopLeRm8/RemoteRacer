import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { Box, Button, CssVarsProvider, Grid, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
export default function HeeaderAboutUs() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#ffe500",
        justifyContent: "center",
        py: { xs: 5, md: 10 },
        px: { xs: 4 },
      }}
    >
      <CssVarsProvider />
      <Grid
        container
        spacing={{ md: 2 }}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography
            dir="rtl"
            fontWeight={400}
            sx={{ fontSize: "250%", fontFamily: "Anton" }}
          >
            REMOTE RACER
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Anton",
              textAlign: "center",
              fontSize: "2.2vh",
            }}
          >
            We help you to do the first step into the new era that includes
            innovative and fun technologies
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Anton",
              textAlign: "center",
              fontSize: "2.2vh",
            }}
          >
            The company provides fun and innovative technologies for free
          </Typography>
        </Grid>

        <Grid item display="flex">
          <Button
            onClick={() => navigate("/")}
            startDecorator={<KeyboardBackspaceIcon />}
            variant="solid"
            color="neutral"
            sx={{
              mt: 2,
              fontSize: "1.3vh",
              fontFamily: "Anton",
              fontWeight: 500,
              backgroundColor: "black",
              letterSpacing: 1,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
              mr: 3,
            }}
          >
            BACK TO MAIN PAGE
          </Button>
          <Button
            onClick={() => navigate("/profile")}
            startDecorator={<Person2RoundedIcon />}
            variant="solid"
            color="neutral"
            sx={{
              mt: 2,
              fontSize: "1.3vh",
              fontFamily: "Anton",
              fontWeight: 500,
              backgroundColor: "black",
              letterSpacing: 1,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
              mr: { md: 3 },
            }}
          >
            MY PROFILE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
