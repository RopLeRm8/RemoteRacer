import { Grid, Typography, List, ListItemButton } from "@mui/joy";
import logo from "../assets/logo.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
const listOfSocials = [
  [<TwitterIcon />, "rgb(29, 161, 242)", "https://www.twitter.com"],
  [<InstagramIcon />, "rgba(193, 53, 132)", "https://www.instagram.com"],
  [<WhatsAppIcon />, "rgba(7 ,94 ,84)", "https://web.whatsapp.com/"],
  [<FacebookIcon />, "rgba(59,89,152)", "https://www.facebook.com"],
];
export default function Footer() {
  return (
    <Grid
      container
      sx={{ p: 5, backgroundColor: "#353839" }}
      justifyContent="space-evenly"
    >
      <Grid item>
        <img src={logo} alt="" width="100" height="100" />
      </Grid>
      <Grid item sx={{ mt: 5 }}>
        <Typography sx={{ color: "white", textAlign: "right" }}>
          האתר נמצא תחת הרשאה מלאה וזכויות יוצר
        </Typography>
        <Typography sx={{ color: "white", opacity: "80%", textAlign: "right" }}>
          פרויקט גמר כיתה יד - איליה בויצוב
        </Typography>
        <List row>
          {listOfSocials.map((social) => (
            <ListItemButton
              key={social[1]}
              sx={{
                "&:hover": {
                  backgroundColor: social[1],
                },

                mt: 1,
                color: "white",
                mx: 2,
              }}
              onClick={() => window.open(social[2])}
            >
              {social[0]}
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
