import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemDecorator,
} from "@mui/joy";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { useEffect } from "react";
import useGetRequestData from "../hooks/useGetRequestData";

export default function FriendsRequestsList({
  openFriendsRequests,
  setOpenFriendsRequests,
}) {
  const { loadRequests, dataLoading, requests } = useGetRequestData();

  useEffect(() => {
    if (openFriendsRequests) {
      loadRequests();
    }
  }, [openFriendsRequests, loadRequests]);

  return (
    <Dialog
      open={openFriendsRequests}
      onClose={() => setOpenFriendsRequests(false)}
    >
      <DialogContent>
        {dataLoading ? (
          <Box sx={{ display: "flex" }}>
            <Typography fontFamily="Poppins" sx={{ mr: 1 }}>
              Data loading...
            </Typography>
            <CircularProgress variant="solid" size="sm" color="warning" />
          </Box>
        ) : (
          <List>
            {requests.map((req) => (
              <ListItem key={req.mail}>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <Avatar src={req.photoURL} />
                </ListItemDecorator>
                <Typography fontFamily="Poppins">{req.name}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
