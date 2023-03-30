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
import { useEffect } from "react";
import useGetRequestData from "../hooks/useGetRequestData";
import useRequestAction from "../hooks/useRequestAction";

export default function FriendsRequestsList({ openTab }) {
  const { loadRequests, dataLoading, requests, setRequests } =
    useGetRequestData();

  useEffect(() => {
    if (openTab) {
      loadRequests();
    }
  }, [openTab, loadRequests]);

  const { handleClick } = useRequestAction({ requests, setRequests });

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
