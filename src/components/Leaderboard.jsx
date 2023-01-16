import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Badge,
  Box,
  CssVarsProvider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";

import { useAuthState } from "react-firebase-hooks/auth";
import trophy from "../assets/Leaderboard/trophy.png";
import Navbar from "../layouts/NavBar";
const backColor = "black";
const secondaryColor = "#ffe500";
const boxesColor = "#201c1c";
export default function Leaderboard() {
  const [user] = useAuthState(getAuth());

  return (
    <Box sx={{ background: backColor }}>
      <Navbar />
      <CssVarsProvider />
      <Grid container alignItems="center" sx={{ py: 10 }} direction="column">
        <Grid item>
          <Typography
            fontFamily="Anton"
            fontSize="10vmin"
            sx={{
              color: secondaryColor,
            }}
          >
            LEADERBOARD
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            fontSize="1.1rem"
            fontFamily="Montserrat"
            sx={{ color: "white" }}
          >
            TOP 3
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ py: 2 }} alignItems="center" direction="column">
        {/*main grid*/}

        <Box
          sx={{
            backgroundColor: boxesColor,
            color: secondaryColor,
            p: 2,
            borderRadius: "1rem",
            minWidth: { xs: "90%", md: "20%" },
          }}
        >
          <Grid container alignItems="center" spacing={{ xs: 3, md: 5 }}>
            <Grid item>
              <Typography
                fontFamily="Montserrat"
                sx={{ color: secondaryColor }}
              >
                1
              </Typography>
            </Grid>
            <Grid item>
              <Badge
                size="sm"
                badgeContent="👑"
                variant="soft"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                badgeInset={-4}
              >
                <Avatar src={user.photoURL} size="lg" />
              </Badge>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {user.displayName}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Montserrat"
                sx={{ color: secondaryColor, ml: { xs: 1, md: 8 } }}
              >
                200 points
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/*second box */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ margin: 0, padding: 0 }}
        >
          <Box
            sx={{
              backgroundColor: boxesColor,
              color: secondaryColor,
              p: 2,
              borderRadius: "1rem",
              mt: 4,
              height: 80,
              mr: { md: 25 },
              minWidth: { xs: "90%", md: "20%" },
            }}
          >
            <Grid container alignItems="center" spacing={{ xs: 3, md: 5 }}>
              <Grid item>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={user.photoURL} size="lg" />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Typography
                    fontFamily="Montserrat"
                    sx={{ color: secondaryColor }}
                  >
                    {user.displayName}
                  </Typography>
                  <Typography
                    fontFamily="Montserrat"
                    sx={{ color: secondaryColor }}
                  >
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor, ml: { xs: 1, md: 8 } }}
                >
                  100 points
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              maxWidth: "100%",
              m: 0,
              p: 0,
              border: 0,
            }}
          >
            <img
              src={trophy}
              alt=""
              style={{ margin: 0, padding: 0, border: 0 }}
            />
          </Box>
        </Stack>
        <Box
          sx={{
            backgroundColor: boxesColor,
            color: secondaryColor,
            p: 2,
            borderRadius: "1rem",
            height: 80,
            margin: 0,
            mt: { xs: 4, md: 0 },
            minWidth: { xs: "90%", md: "20%" },
          }}
        >
          <Grid container alignItems="center" spacing={{ xs: 3, md: 5 }}>
            <Grid item>
              <Typography
                fontFamily="Montserrat"
                sx={{ color: secondaryColor }}
              >
                3
              </Typography>
            </Grid>
            <Grid item>
              <Avatar src={user.photoURL} size="lg" />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {user.displayName}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Montserrat"
                sx={{ color: secondaryColor, ml: { xs: 1, md: 8 } }}
              >
                50 points
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Box sx={{ py: 5, mt: 10, backgroundColor: secondaryColor }}>
        <Typography
          fontFamily="Anton"
          fontSize="5vmin"
          sx={{
            color: backColor,
            display: "flex",
            justifyContent: "center",
          }}
        >
          YOU ARE NOT IN THE LEADERBOARD
        </Typography>
        <Typography
          fontFamily="Anton"
          fontSize="5vmin"
          sx={{
            color: backColor,
            display: "flex",
            justifyContent: "center",
          }}
        >
          YOUR POINTS ARE :
        </Typography>
        <Typography
          fontFamily="Anton"
          fontSize="5vmin"
          sx={{
            color: backColor,
            display: "flex",
            justifyContent: "center",
          }}
        >
          25
        </Typography>
      </Box>
    </Box>
  );
}
