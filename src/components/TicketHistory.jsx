import { Box, Grid, Typography } from "@mui/joy";

export default function TicketHistory() {
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
        }}
      >
        <Grid item>
          <Typography sx={{ fontSize: "150%", textAlign: "center" }}>
            Ticket History
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
