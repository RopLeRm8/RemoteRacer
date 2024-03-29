import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FriendsList from "./FriendsList";

export default function FriendsTab({ openTab, setOpenTab }) {
  return (
    <Dialog open={openTab} onClose={() => setOpenTab(false)} fullWidth>
      <DialogTitle sx={{ background: "black" }}></DialogTitle>
      <DialogContent sx={{ background: "black" }}>
        <FriendsList openTab={openTab} />
      </DialogContent>
    </Dialog>
  );
}
