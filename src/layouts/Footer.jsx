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
    name: "Twitter",
  },
  {
    icon: <InstagramIcon />,
    color: "rgba(193, 53, 132)",
    link: "https://www.instagram.com",
    name: "Instagram",
  },
  {
    icon: <WhatsAppIcon />,
    color: "rgba(7 ,94 ,84)",
    link: "https://web.whatsapp.com/",
    name: "Whatsapp",
  },
  {
    icon: <FacebookIcon />,
    color: "rgba(59,89,152)",
    link: "https://www.facebook.com",
    name: "Facebook",
  },
];
export default function Footer() {
  return (
    <Grid
      container
      sx={{ p: 5, pt: { xs: 5, md: 0 }, backgroundColor: "black" }}
      justifyContent={{ xs: "center", md: "space-around" }}
      direction="row"
      alignItems="center"
    >
      <Grid item>
        <img src={logo} alt="" width="225" height="140" />
      </Grid>
      <Grid item>
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
      </Grid>
      <Grid item sx={{ mt: 5, mr: { xs: 5, md: 10 } }}>
        <List>
          {listOfSocials.map((social) => (
            <ListItemButton
              key={social.link}
              sx={{
                "&:hover": {
                  backgroundColor: social.color,
                },
                display: "flex",
                justifyContent: "center",
                mt: 1,
                color: "#ffe500",
                borderRadius: "20px",
              }}
              onClick={() => window.open(social.link)}
            >
              {social.icon}
              <Typography
                level="h7"
                fontFamily="Poppins"
                sx={{ color: "white", ml: 2 }}
              >
                {social.name}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
