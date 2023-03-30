import { getAuth } from "@firebase/auth";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { Box, Grid, Typography } from "@mui/joy";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomButton } from "../features/CustomButton";
import { useNotification } from "../hooks/useNotification";
import { db } from "../providers/FirebaseProvider";
export default function TicketHistory({ setViewHistory }) {
  const [user] = useAuthState(getAuth());
  const userRef = ref(db, `users/${user.uid}/data/ticketHistory`);
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const notify = useNotification();
  useEffect(() => {
    setTicketsLoading(true);
    get(userRef)
      .then((snap) => {
        if (snap.exists()) {
          for (const key in snap?.val()) {
            setTickets((prev) => [...prev, snap.val()[key]]);
          }
        }
      })
      .catch(() => {
        notify("Couldn't retrieve tickets history", { variant: "error" });
      })
      .finally(() => {
        setTicketsLoading(false);
      });
  }, []);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        sx={{
          background: "white",
          border: "1px solid orange",
          mt: 5,
          p: 2,
          width: { xs: "90%", lg: "50%" },
          maxHeight: "20%",
          overflow: "auto",
        }}
      >
        <Grid item>
          <Typography sx={{ fontSize: "150%", textAlign: "center" }}>
            Ticket History
          </Typography>
        </Grid>
        {ticketsLoading ? (
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "130%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Data Loading...
          </Typography>
        ) : (
          <Grid item>
            {tickets.map((ticket) => (
              <Box
                sx={{ background: "orange", mb: 2, p: 1 }}
                key={tickets.indexOf(ticket)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Typography
                    fontFamily="Poppins"
                    sx={{ color: "black", fontSize: "110%" }}
                  >
                    {ticket?.subject}
                  </Typography>
                  <Typography startDecorator={<HistoryToggleOffIcon />}>
                    {ticket?.time}
                  </Typography>
                  <Typography># {tickets.indexOf(ticket) + 1}</Typography>
                </Box>
                <Typography fontFamily="Poppins">
                  Issue: {ticket?.issue}
                </Typography>
                <Typography fontFamily="Poppins">
                  Severity: {ticket?.severity}
                </Typography>
                <Typography fontFamily="Poppins">
                  Type: {ticket?.type}
                </Typography>
              </Box>
            ))}
            <CustomButton
              variant="contained"
              color="warning"
              text="WRITE A TICKET"
              onClickFunc={() => setViewHistory(false)}
              sx={{ fontFamily: "Poppins" }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
