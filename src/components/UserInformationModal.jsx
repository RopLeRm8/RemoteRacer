import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CasinoIcon from "@mui/icons-material/Casino";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PortraitIcon from "@mui/icons-material/Portrait";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Avatar, Box, Divider, Grid, Tooltip, Typography } from "@mui/joy";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import firstSetup from "../assets/Medals/firstSetup.png";
import place1 from "../assets/Medals/place1.png";
import place2 from "../assets/Medals/place2.png";
import place3 from "../assets/Medals/place3.png";
import playFirstGame from "../assets/Medals/playFirstGame.png";
import scoreMoreThan100 from "../assets/Medals/scoreMoreThan100.png";
import { CustomButton } from "../features/CustomButton";
import useGetMedals from "../hooks/useGetMedals";
import useIsFriend from "../hooks/useIsFriend";
import useSendRequest from "../hooks/useSendRequest";

const medalIdToImg = {
  firstSetup: firstSetup,
  place1: place1,
  place2: place2,
  place3: place3,
  playFirstGame: playFirstGame,
  scoreMoreThan100: scoreMoreThan100,
};
export default function UserInformationModal({
  userSelected,
  setUserSelected,
}) {
  const [requestSend, setRequestSend] = useState(false);
  const { addFriend } = useSendRequest({
    setRequestSend,
    userSelected,
  });
  const { checkIfFriend, isFriend } = useIsFriend({ userSelected });
  const { medalsList } = useGetMedals({ userSelected });
  useEffect(() => {
    if (userSelected) {
      checkIfFriend();
    }
  }, [userSelected, checkIfFriend]);
  return (
    <Dialog open={!!userSelected} onClose={() => setUserSelected(null)}>
      <DialogTitle
        sx={{
          fontFamily: "Poppins",
          fontSize: "2vh",
          display: "flex",
          justifyContent: "center",
          background: "orange",
        }}
      >
        Player Profile
      </DialogTitle>
      <DialogContent sx={{ background: "black" }}>
        <Divider sx={{ mb: 1 }} />
        <Grid container direction="column">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <Avatar
                src={userSelected?.photoURL}
                sx={{
                  "--Avatar-size": "10vmax",
                  mr: 5,
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                fontFamily="Poppins"
                sx={{ mr: 4, color: "white" }}
                startDecorator={<PortraitIcon sx={{ color: "white" }} />}
              >
                {userSelected?.name ? userSelected?.name : "[No Name]"}
              </Typography>
            </Grid>
          </Box>
          <Grid item>
            <Typography
              sx={{ mt: 1, color: "white" }}
              fontFamily="Poppins"
              startDecorator={<AccessTimeFilledIcon sx={{ color: "white" }} />}
            >
              {userSelected?.lastTime
                ? userSelected?.lastTime
                : userSelected?.newTime}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{ mt: 1, color: "white" }}
              fontFamily="Poppins"
              startDecorator={<CasinoIcon sx={{ color: "white" }} />}
            >
              {Math.round(userSelected?.points * 1000)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{ mt: 1, color: "white" }}
              fontFamily="Poppins"
              startDecorator={<SportsEsportsIcon sx={{ color: "white" }} />}
            >
              {userSelected?.games ? userSelected?.games : 0}
            </Typography>
          </Grid>
          <Grid item sx={{ flexWrap: "nowrap" }}>
            <Grid container direction="row">
              {medalsList?.map((medal) => (
                <Grid item key={medal.id}>
                  <Tooltip
                    title={medal.tooltip}
                    size="sm"
                    color="warning"
                    variant="outlined"
                    sx={{ display: medal?.earned ? "flex" : "none" }}
                  >
                    <img
                      src={medalIdToImg[medal?.id]}
                      alt=""
                      style={{
                        maxWidth: "5%",
                        filter: medal?.earned ? "" : "blur(5px)",
                      }}
                    />
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex" }}>
              <CustomButton
                text={isFriend ? "Your friend" : "Add friend"}
                disabled={requestSend || isFriend}
                fullWidth
                sx={{
                  mt: 1,
                  mr: 1,
                  background: "rgba(0,0,0,0)",
                  color: "white",
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.7)",
                  },
                  "&:hover": { color: "orange", background: "black" },
                }}
                onClickFunc={addFriend}
                startIcon={isFriend ? <PeopleIcon /> : <PersonAddIcon />}
              />

              <CustomButton
                text="Close"
                fullWidth
                sx={{
                  mt: 1,
                  color: "black",
                  "&:hover": { color: "orange", background: "black" },
                }}
                onClickFunc={() => setUserSelected(null)}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
