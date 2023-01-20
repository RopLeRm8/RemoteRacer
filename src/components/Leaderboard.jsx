// import { getAuth } from "@firebase/auth";
import { Box } from "@mui/joy";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import trophy from "../assets/Leaderboard/trophy.png";
// import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";
const backColor = "black";
// const secondaryColor = "#ffe500";
// const boxesColor = "#201c1c";
const usersRef = ref(db, "users/");
export default function Leaderboard() {
  // const [user] = useAuthState(getAuth());
  const [usersData, setusersData] = useState([]);
  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      for (const key in data) {
        setusersData(usersData.push(data[key].data));
      }
      let arr = usersData.sort((a, b) => b.points - a.points);
      arr = arr.slice(0, 3);
      console.log(arr);
      setusersData([...arr]);
      console.log(usersData);
    });

    // return () => {
    //   setusersData([]);
    // };
  }, []);

  return (
    <Box sx={{ background: backColor }}>
      {/* <Navbar />
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
                <Avatar src={usersData[0].photoURL} size="lg" />
              </Badge>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {usersData[0]?.name}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {usersData[0].mail}
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
                <Avatar src={usersData[1].photoURL} size="lg" />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Typography
                    fontFamily="Montserrat"
                    sx={{ color: secondaryColor }}
                  >
                    {usersData[1]?.name}
                  </Typography>
                  <Typography
                    fontFamily="Montserrat"
                    sx={{ color: secondaryColor }}
                  >
                    {usersData[1].mail}
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
              <Avatar src={usersData[2].photoURL} size="lg" />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {usersData[2]?.name}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  sx={{ color: secondaryColor }}
                >
                  {usersData[2].mail}
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
      </Box> */}
    </Box>
  );
}
