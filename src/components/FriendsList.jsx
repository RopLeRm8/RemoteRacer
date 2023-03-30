import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import { Typography } from "@mui/material";
import { get, ref, update } from "firebase/database";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetFriendsData from "../hooks/useGetFriendsData";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function FriendsList({ openTab }) {
  const { loadFriends, dataLoading, friends, setFriends } = useGetFriendsData();
  const [user] = useAuthState(getAuth());
  const localRef = ref(db, `users/${user.uid}/data`);
  const notify = useNotification();
  useEffect(() => {
    if (openTab) {
      loadFriends();
    }
  }, [openTab, loadFriends]);

  const handleRemove = (uid) => {
    const otherRef = ref(db, `users/${uid}/data`);
    const updatedFriends = friends.filter((obj) => obj.uid !== uid);
    get(localRef)
      .then((snap) => {
        if (snap.exists()) {
          const friends = snap?.val()?.friends;
          const updatedData = {
            ...snap?.val(),
            friends: friends.filter((friend) => friend !== uid),
          };
          update(localRef, updatedData)
            .then(() => {
              notify("Friend removed successfully", { variant: "success" });
              setFriends(updatedFriends);
            })
            .catch(() => {
              notify("Couldn't remove the friend", { variant: "error" });
            });
        }
      })
      .catch(() => {
        notify("Couldn't connect to database", { variant: "error" });
      });
    get(otherRef)
      .then((snap) => {
        if (snap.exists()) {
          const friends = snap?.val()?.friends;
          const updatedData = {
            ...snap?.val(),
            friends: friends.filter((friend) => friend !== user.uid),
          };
          update(otherRef, updatedData).catch(() =>
            notify("There was an error updating the requested user's data", {
              variant: "error",
            })
          );
        }
      })
      .catch(() => {
        notify("Couldn't connect to database", { variant: "error" });
      });
  };

  return (
    <>
      {dataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Typography fontFamily="Poppins" sx={{ mr: 1, color: "white" }}>
            Data loading...
          </Typography>
          <CircularProgress variant="solid" size="sm" color="warning" />
        </Box>
      ) : (
        <List>
          {friends.map((req) => (
            <ListItem
              key={req?.mail}
              sx={{ display: req?.uid !== "hello" ? "flex" : "none" }}
            >
              <ListItemDecorator sx={{ mr: 2 }}>
                <Avatar src={req?.photoURL} />
              </ListItemDecorator>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid item>
                  <Typography fontFamily="Poppins" sx={{ color: "white" }}>
                    {req?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="plain"
                    color="warning"
                    sx={{
                      color: "orange",
                      fontFamily: "Poppins",
                      "&:hover": { color: "white", background: "transparent" },
                    }}
                    onClick={() => handleRemove(req?.uid)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
