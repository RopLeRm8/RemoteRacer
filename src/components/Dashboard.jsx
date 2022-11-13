import NavBar from "./NavBar";
import background from "../assets/background.png";
import { Box } from "@mui/joy";
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
    </Box>
  );
}
