import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { Box, CssVarsProvider, Grid, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { CustomButtonJoy } from "../features/CustomButton";
import LogoMaker from "../features/LogoMaker";
export default function HeeaderAboutUs() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "black",
        justifyContent: "center",
        pb: { xs: 5, md: 10 },
        pt: { xs: 5, md: 6 },
        px: { xs: 4 },
      }}
    >
      <CssVarsProvider />
      <Grid
        container
        spacing={{ md: 2 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography
            fontWeight={400}
            sx={{
              fontSize: "250%",
              fontFamily: "Anton",
              color: "white",
              textAlign: "center",
              ml: { xs: 4, lg: 0 },
            }}
            endDecorator={<LogoMaker />}
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
              color: "white",
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
              color: "rgba(255,255,255,0.7)",
            }}
          >
            The company provides fun and innovative technologies for free
          </Typography>
        </Grid>

        <Grid item display="flex">
          <CustomButtonJoy
            onClickFunc={() => navigate("/")}
            startDecorator={<KeyboardBackspaceIcon />}
            text="BACK TO MAIN PAGE"
            sx={{
              mt: 2,
              fontSize: "1.2vh",
              fontFamily: "Montserrat",
              fontWeight: 600,
              letterSpacing: 1,
              mr: 3,
            }}
          />
          <CustomButtonJoy
            onClickFunc={() => navigate("/profile")}
            startDecorator={<Person2RoundedIcon />}
            variant="solid"
            color="neutral"
            text="MY PROFILE"
            sx={{
              mt: 2,
              fontSize: "1.2vh",
              fontFamily: "Montserrat",
              fontWeight: 600,
              letterSpacing: 1,
              transition: "0.2s all ease-out",
              mr: { md: 3 },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
