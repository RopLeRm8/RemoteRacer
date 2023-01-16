import { Box, CssVarsProvider, Grid, Typography, Button } from "@mui/joy";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useNavigate } from "react-router-dom";
export default function HeeaderAboutUs() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#ffe500",
        justifyContent: "center",
        py: 10,
        px: { xs: 4 },
      }}
    >
      <CssVarsProvider />
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography
            dir="rtl"
            fontWeight={400}
            sx={{ fontSize: { xs: 45, sm: 50 }, fontFamily: "Anton" }}
          >
            REMOTE RACER
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontFamily: "Anton" }} fontSize={20}>
            We help you to do the first step into the new era that includes
            innovative and fun technologies
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontFamily: "Anton" }}>
            The company provides fun and innovative technologies for free
          </Typography>
        </Grid>

        <Grid item display="flex">
          <Button
            onClick={() => navigate("/profile")}
            startDecorator={<Person2RoundedIcon />}
            variant="solid"
            color="neutral"
            sx={{
              mt: 2,
              fontSize: 15,
              fontFamily: "Anton",
              backgroundColor: "black",
              letterSpacing: 1,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            MY PROFILE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
