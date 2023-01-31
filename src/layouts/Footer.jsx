import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Grid, List, ListItemButton, Typography } from "@mui/joy";
import logo from "../assets/Global/logo.png";
const listOfSocials = [
  {
    icon: <TwitterIcon />,
    color: "rgb(29, 161, 242)",
    link: "https://www.twitter.com",
  },
  {
    icon: <InstagramIcon />,
    color: "rgba(193, 53, 132)",
    link: "https://www.instagram.com",
  },
  {
    icon: <WhatsAppIcon />,
    color: "rgba(7 ,94 ,84)",
    link: "https://web.whatsapp.com/",
  },
  {
    icon: <FacebookIcon />,
    color: "rgba(59,89,152)",
    link: "https://www.facebook.com",
  },
];
export default function Footer() {
  return (
    <Grid
      container
      sx={{ p: 5, backgroundColor: "black" }}
      justifyContent={{ xs: "center", md: "space-evenly" }}
    >
      <Grid item>
        <img src={logo} alt="" width="225" height="140" />
      </Grid>
      <Grid item sx={{ mt: 5 }}>
        <Typography
          sx={{
            color: "#ffe500",
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          The website is under copyright made by RopLeR
        </Typography>
        <Typography
          sx={{
            color: "#ffe500",
            opacity: "80%",
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Final Project IOT - Ilya Boicov
        </Typography>
        <List row>
          {listOfSocials.map((social) => (
            <ListItemButton
              key={social.link}
              sx={{
                "&:hover": {
                  backgroundColor: social.color,
                },

                mt: 1,
                color: "#ffe500",
                mx: { xs: 2, md: 3.5 },
              }}
              onClick={() => window.open(social.link)}
            >
              {social.icon}
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
