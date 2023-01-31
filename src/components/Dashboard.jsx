import { Box, CssVarsProvider } from "@mui/joy";
import background from "../assets/Dashboard/background.png";
import NavBar from "../layouts/NavBar";
export default function Dashboard() {
  return (
    <Box
      sx={{
        backgroundPosition: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        paddingBottom: 20,
      }}
    >
      <NavBar />
      <CssVarsProvider />
    </Box>
  );
}
