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
import { useEffect } from "react";
import useGetFriendsData from "../hooks/useGetFriendsData";
import useRemoveFriend from "../hooks/useRemoveFriend";

export default function FriendsList({ openTab }) {
  const { loadFriends, dataLoading, friends, setFriends } = useGetFriendsData();
  useEffect(() => {
    if (openTab) {
      loadFriends();
    }
  }, [openTab, loadFriends]);
  const { handleRemove } = useRemoveFriend({ friends, setFriends });

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
          {friends.length === 0 ? (
            <Typography
              textAlign="center"
              fontFamily="Poppins"
              sx={{ color: "white" }}
            >
              Nothing here
            </Typography>
          ) : null}
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
