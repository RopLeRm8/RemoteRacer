import { getAuth } from "@firebase/auth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import { Typography } from "@mui/material";
import { get, ref, update } from "firebase/database";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomButton } from "../features/CustomButton";
import useGetRequestData from "../hooks/useGetRequestData";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function FriendsRequestsList({ openTab }) {
  const { loadRequests, dataLoading, requests } = useGetRequestData();
  const [user] = useAuthState(getAuth());
  const localRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();

  useEffect(() => {
    if (openTab) {
      loadRequests();
    }
  }, [openTab, loadRequests]);
  const handleClick = (uid, action) => {
    console.log(uid);
    if (action === "deny") {
      get(localRef)
        .then((snap) => {
          if (snap.exists()) {
            const updatedData = {
              ...snap.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid !== uid),
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request denied successfully", { variant: "success" });
              })
              .catch(() => {
                notify("Couldn't deny request", { variant: "error" });
              });
          }
        })
        .catch(() => {
          notify("Error when tried to get data", { variant: "error" });
        });
    } else {
      get(localRef)
        .then((snap) => {
          if (snap.exists()) {
            const updatedData = {
              ...snap.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid !== uid),
              friends: [...snap.val().friends, snap.val().friendsRequests],
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request acccepted successfully", {
                  variant: "success",
                });
              })
              .catch(() => {
                notify("Couldn't accept request", { variant: "error" });
              });
          }
        })
        .catch(() => {
          notify("Error when tried to get data", { variant: "error" });
        });
    }
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
          {requests.map((req) => (
            <ListItem key={req?.mail}>
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
                  <IconButton
                    variant="plain"
                    color="success"
                    size="sm"
                    onClick={() => handleClick(req.uid, "accept")}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    variant="plain"
                    color="danger"
                    size="sm"
                    onClick={() => handleClick(req.uid, "deny")}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
      <CustomButton sx={{ mt: 1 }} text="Accept all" fullWidth />
    </>
  );
}
