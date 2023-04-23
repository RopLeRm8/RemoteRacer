import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FriendsRequestsList from "./FriendsRequestsList";

export default function FriendsListRequestsTab({ openTab, setOpenTab }) {
  return (
    <Dialog open={openTab} onClose={() => setOpenTab(false)} fullWidth>
      <DialogTitle sx={{ background: "black" }}></DialogTitle>
      <DialogContent sx={{ background: "black" }}>
        <FriendsRequestsList openTab={openTab} />
      </DialogContent>
    </Dialog>
  );
}
