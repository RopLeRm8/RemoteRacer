import { getAuth } from "@firebase/auth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CasinoIcon from "@mui/icons-material/Casino";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PortraitIcon from "@mui/icons-material/Portrait";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/joy";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { get, ref, update } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomButton } from "../features/CustomButton";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function UserInformationModal({
  userSelected,
  setUserSelected,
}) {
  const [user] = useAuthState(getAuth());
  const usersRefData = ref(db, `users/${userSelected?.uid}/data`);
  const notify = useNotification();
  const [requestSend, setRequestSend] = useState(false);
  const addFriend = () => {
    setRequestSend(true);
    get(usersRefData)
      .then((snap) => {
        const friendsRequests = snap?.val()?.friendsRequests;
        const isFriend =
          Array.isArray(friendsRequests) &&
          friendsRequests.length > 0 &&
          friendsRequests.find((friend) => friend === user.uid);
        if (!isFriend) {
          update(
            usersRefData,
            {
              friendsRequests: [...(friendsRequests || []), user?.uid],
            },
            {
              set: true,
            }
          )
            .then(() => {
              notify("Friend request sent!", { variant: "success" });
            })
            .catch(() => {
              notify("Couldn't send friend request", {
                variant: "error",
              });
            });
        } else {
          notify("Friend request already sent", { variant: "info" });
        }
      })
      .catch(() => {
        notify("Couldn't send friend request", {
          variant: "error",
        });
      })
      .finally(() => {
        setRequestSend(false);
      });
  };
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
          <Grid item>
            <Box sx={{ display: "flex" }}>
              <CustomButton
                text="Add friend"
                disabled={requestSend}
                fullWidth
                sx={{
                  mt: 1,
                  mr: 1,
                  background: "rgba(0,0,0,0)",
                  color: "white",
                  "&:hover": { color: "orange", background: "black" },
                }}
                onClickFunc={addFriend}
                startIcon={<PersonAddIcon />}
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
