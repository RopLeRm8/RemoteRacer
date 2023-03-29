import PeopleIcon from "@mui/icons-material/People";
import { Badge, Box, Button } from "@mui/joy";
import { Typography } from "@mui/material";
import { useState } from "react";
import useCountRequests from "../hooks/useCountRequests";
import FriendsTab from "./FriendsTab";
export default function FriendRequests() {
  const [openTab, setOpenTab] = useState(false);
  const { returnLength } = useCountRequests();
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
          <Badge
            badgeContent={returnLength ?? 0}
            variant="soft"
            color="danger"
            sx={{ mr: 2 }}
            size="sm"
          >
            <PeopleIcon />
          </Badge>
          <Typography fontFamily="Poppins">Friend requests</Typography>
        </Button>
      </Box>
    </>
  );
}
