import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CasinoIcon from "@mui/icons-material/Casino";
import PortraitIcon from "@mui/icons-material/Portrait";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/joy";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CustomButton } from "../features/CustomButton";
export default function UserInformationModal({
  userSelected,
  setUserSelected,
}) {
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
        Profile information of the player
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
              {userSelected?.points}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{ mt: 1, color: "white" }}
              fontFamily="Poppins"
              startDecorator={<SportsEsportsIcon sx={{ color: "white" }} />}
            >
              {userSelected?.games}
            </Typography>
          </Grid>
          <Grid item>
            <CustomButton
              text="Close"
              fullWidth
              sx={{ mt: 1 }}
              onClickFunc={() => setUserSelected(null)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
