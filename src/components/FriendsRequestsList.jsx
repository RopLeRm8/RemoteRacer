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
import { useEffect } from "react";
import { CustomButton } from "../features/CustomButton";
import useGetRequestData from "../hooks/useGetRequestData";

export default function FriendsRequestsList({ openTab }) {
  const { loadRequests, dataLoading, requests } = useGetRequestData();

  useEffect(() => {
    if (openTab) {
      loadRequests();
    }
  }, [openTab, loadRequests]);

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
            <ListItem key={req.mail}>
              <ListItemDecorator sx={{ mr: 2 }}>
                <Avatar src={req.photoURL} />
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
                    {req.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton variant="plain" color="success" size="sm">
                    <CheckIcon />
                  </IconButton>
                  <IconButton variant="plain" color="danger" size="sm">
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
