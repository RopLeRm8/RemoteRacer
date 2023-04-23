import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Badge, Box, Button } from "@mui/joy";
import { Typography } from "@mui/material";
import { useState } from "react";
import useCountRequests from "../hooks/useCountRequests";
import FriendsListRequestsTab from "./FriendsListRequestsTab";
export default function FriendRequestsBadge() {
  const [openTab, setOpenTab] = useState(false);
  const { returnLength } = useCountRequests();
  return (
    <>
      <FriendsListRequestsTab openTab={openTab} setOpenTab={setOpenTab} />
      <Box sx={{ display: "flex" }}>
        <Button
          variant="plain"
          sx={{ color: "black" }}
          color="warning"
          onClick={() => setOpenTab(true)}
        >
          <Badge
            badgeContent={returnLength ?? 0}
            variant="soft"
            color="danger"
            sx={{ mr: 2 }}
            size="sm"
          >
            <GroupAddIcon />
          </Badge>
          <Typography fontFamily="Poppins">Friend requests</Typography>
        </Button>
      </Box>
    </>
  );
}
