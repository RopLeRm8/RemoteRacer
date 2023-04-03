import { Box } from "@mui/joy";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../features/CustomButton";
import FriendsList from "./FriendsList";
import FriendsRequestsList from "./FriendsRequestsList";

export default function FriendsTab({ openTab, setOpenTab }) {
  const [currentList, setCurrentList] = useState("Requests");
  return (
    <Dialog open={openTab} onClose={() => setOpenTab(false)} fullWidth>
      <DialogTitle sx={{ background: "black" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            text="Requests"
            sx={{
              background: "transparent",
              color: "white",
              border: "0",
              position: "relative",
              "&::after": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "2px",
                bottom: 0,
                left: 0,
                backgroundColor: "orange",
                visibility: "visible",
                transform: "scaleX(0)",
                transition: "all 0.3s ease-in-out",
              },
              "&:hover::after": {
                visibility: "visible",
                transform: "scaleX(1)",
              },
              "&:hover": {
                background: "transparent",
              },
              "&.active::after": {
                height: "100%",
                borderRadius: "2px",
                transformOrigin: "center",
              },
            }}
            onClickFunc={() => setCurrentList("Requests")}
          />
          <CustomButton
            text="Friends"
            sx={{
              background: "transparent",
              color: "white",
              border: "0",
              position: "relative",
              "&::after": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "2px",
                bottom: 0,
                left: 0,
                backgroundColor: "orange",
                visibility: "visible",
                transform: "scaleX(0)",
                transition: "all 0.3s ease-in-out",
              },
              "&:hover::after": {
                visibility: "visible",
                transform: "scaleX(1)",
              },
              "&:hover": {
                background: "transparent",
              },
              "&.active::after": {
                height: "100%",
                borderRadius: "2px",
                transformOrigin: "center",
              },
            }}
            onClickFunc={() => setCurrentList("Friends")}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ background: "black" }}>
        {currentList === "Requests" ? (
          <FriendsRequestsList openTab={openTab} />
        ) : (
          <FriendsList openTab={openTab}/>
        )}
      </DialogContent>
    </Dialog>
  );
}
