import { Box, Grid } from "@mui/joy";

export default function LogoMaker() {
  return (
    <Grid sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          background: "rgb(231,121,23)",
          color: "rgba(0,0,0,0)",
          userSelect: "none",
          pointerEvents: "none",
          maxWidth: "16%",
          maxHeight: "70%",
        }}
      >
        g
      </Box>
      <Box
        sx={{
          background: "rgba(230,120,21,0.8)",
          color: "rgba(0,0,0,0)",
          userSelect: "none",
          pointerEvents: "none",
          mx: 0.5,
          maxWidth: "16%",
          maxHeight: "70%",
        }}
      >
        g
      </Box>
      <Box
        sx={{
          background: "rgba(231,120,22,0.6)",
          color: "rgba(0,0,0,0)",
          userSelect: "none",
          pointerEvents: "none",
          maxWidth: "16%",
          maxHeight: "70%",
        }}
      >
        g
      </Box>
    </Grid>
  );
}
