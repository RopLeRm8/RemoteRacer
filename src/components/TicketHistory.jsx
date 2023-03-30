import { getAuth } from "@firebase/auth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
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
  const [sortedDesc, setSortedDesc] = useState(false);
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
  const handleSortAlphabet = () => {
    if (!sortedDesc) {
      const sortedTickets = [...tickets].sort((a, b) =>
        b.subject.localeCompare(a.subject)
      );
      setTickets(sortedTickets);
    } else {
      const sortedTickets = [...tickets].sort((a, b) =>
        a.subject.localeCompare(b.subject)
      );
      setTickets(sortedTickets);
    }
    setSortedDesc((prev) => !prev);
  };
  const handleSortDate = () => {
    const sortedTicketsDate = [...tickets]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .reverse();
    setTickets(sortedTicketsDate);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
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
          overflow: "auto",
        }}
      >
        <Grid item>
          <Typography
            sx={{ fontSize: "150%", textAlign: "center" }}
            fontFamily="Poppins"
          >
            Ticket History
          </Typography>
          <Typography fontFamily="Poppins" sx={{ fontSize: "100%" }}>
            Sort by:
          </Typography>
          <CustomButton
            sx={{
              fontSize: "90%",
              textAlign: "center",
              mr: 1,
              background: "transparent",
              border: "2px solid black",
              "&:hover": {
                background: "black",
                color: "white",
                border: "2px solid orange",
              },
              px: 2,
            }}
            text={sortedDesc ? "ASC" : "DESC"}
            startIcon={<SortByAlphaIcon />}
            onClickFunc={handleSortAlphabet}
          />
          <CustomButton
            sx={{
              fontSize: "90%",
              textAlign: "center",
              mr: 1,
              background: "transparent",
              border: "2px solid black",
              "&:hover": {
                background: "black",
                color: "white",
                border: "2px solid orange",
              },
              px: 2,
            }}
            startIcon={<CalendarMonthIcon />}
            onClickFunc={handleSortDate}
            text="Date"
          ></CustomButton>
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
            {tickets.length === 0 ? (
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                No tickets found
              </Typography>
            ) : null}
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
