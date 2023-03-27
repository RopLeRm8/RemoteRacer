import PeopleIcon from "@mui/icons-material/People";
import { Badge, Box, Button } from "@mui/joy";
import { Typography } from "@mui/material";
import { useState } from "react";
import useCountRequests from "../hooks/useCountRequests";
import FriendsRequestsList from "./FriendsRequestsList";
export default function FriendRequests() {
  const [openFriendsRequests, setOpenFriendsRequests] = useState(false);
  const { returnLength } = useCountRequests();
  return (
    <>
      <FriendsRequestsList
        openFriendsRequests={openFriendsRequests}
        setOpenFriendsRequests={setOpenFriendsRequests}
      />
      <Box sx={{ display: "flex" }}>
        <Button
          variant="plain"
          sx={{ color: "black" }}
          color="warning"
          onClick={() => setOpenFriendsRequests(true)}
        >
          <Badge
            badgeContent={returnLength ? returnLength : 0}
            variant="soft"
            color="danger"
            sx={{ mr: 2 }}
            size="sm"
          >
            <PeopleIcon />
          </Badge>
          <Typography fontFamily="Poppins">Friends requests</Typography>
        </Button>
      </Box>
    </>
  );
}
