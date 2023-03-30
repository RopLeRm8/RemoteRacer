import { getAuth } from "@firebase/auth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { get, ref, update } from "firebase/database";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetRequestData from "../hooks/useGetRequestData";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";

export default function FriendsRequestsList({ openTab }) {
  const { loadRequests, dataLoading, requests, setRequests } =
    useGetRequestData();
  const [user] = useAuthState(getAuth());
  const localRef = ref(db, `users/${user?.uid}/data`);
  const notify = useNotification();

  useEffect(() => {
    if (openTab) {
      loadRequests();
    }
  }, [openTab, loadRequests]);
  const handleClick = (uid, action) => {
    const updatedRequests = requests.filter((obj) => obj.uid !== uid);
    const otherUserRef = ref(db, `users/${uid}/data`);
    if (action === "deny") {
      get(localRef)
        .then((snap) => {
          if (snap.exists()) {
            const updatedData = {
              ...snap.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid[0] !== uid),
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request denied successfully", { variant: "success" });
                setRequests(updatedRequests);
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
              ...snap?.val(),
              friendsRequests: snap
                .val()
                .friendsRequests.filter((friendUid) => friendUid[0] !== uid),
              friends: [...(snap.val().friends ?? []), uid],
            };
            update(localRef, updatedData)
              .then(() => {
                notify("Request acccepted successfully", {
                  variant: "success",
                });
                setRequests(updatedRequests);
              })
              .catch((err) => {
                console.log(err);
                notify("Couldn't accept request", { variant: "error" });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          notify("Error when tried to get data", { variant: "error" });
        });
      get(otherUserRef)
        .then((othersnap) => {
          if (othersnap.exists()) {
            const otherUpdatedData = {
              ...othersnap?.val(),
              friends: [...(othersnap.val().friends ?? []), user.uid],
            };
            update(otherUserRef, otherUpdatedData).catch(() => {
              notify("Couldn't update the requested user's data", {
                variant: "error",
              });
            });
          }
        })
        .catch(() =>
          notify("Error when tried to get other user's data", {
            variant: "error",
          })
        );
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
          {requests.length === 0 ? (
            <Typography
              textAlign="center"
              fontFamily="Poppins"
              sx={{ color: "white" }}
            >
              Nothing here
            </Typography>
          ) : null}
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
                  <Typography
                    fontFamily="Poppins"
                    sx={{ color: "white" }}
                    startDecorator={<HistoryToggleOffIcon />}
                  >
                    {req?.date ?? "Unknown"}
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
    </>
  );
}
