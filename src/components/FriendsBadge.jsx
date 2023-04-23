import PeopleIcon from "@mui/icons-material/People";
import { Box, Button } from "@mui/joy";
import { Typography } from "@mui/material";
import { useState } from "react";
import FriendsTab from "./FriendsTab";
export default function FriendsBadge() {
  const [openTab, setOpenTab] = useState(false);
  return (
    <>
      <FriendsTab openTab={openTab} setOpenTab={setOpenTab} />
      <Box sx={{ display: "flex" }}>
        <Button
          variant="plain"
          sx={{ color: "black" }}
          color="warning"
          onClick={() => setOpenTab(true)}
        >
          <PeopleIcon sx={{ mr: 2 }} />
          <Typography fontFamily="Poppins">Friends list</Typography>
        </Button>
      </Box>
    </>
  );
}
