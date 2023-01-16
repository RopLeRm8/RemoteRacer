import { Box, Stack, Typography } from "@mui/joy";
import aboutimg from "../assets/AboutUs/aboutimg.png";

export default function AboutUsInfo() {
  return (
    <Box sx={{ backgroundColor: "rgba(0,0,0,0.93)" }}>
      <Typography
        fontSize={80}
        fontFamily="Anton"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#ffe500",
          pt: 10,
          pb: 3,
        }}
      >
        ABOUT US
      </Typography>

      <Stack
        sx={{
          pb: 7,
        }}
        direction={{ xs: "column", lg: "row" }}
      >
        <Typography
          fontSize={20}
          fontFamily="Montserrat"
          sx={{ color: "white", px: { xs: 3, lg: 10 }, pb: { xs: 3, lg: 0 } }}
          data-aos="slide-right"
        >
          We pride ourselves at being able to get our customer into the car that
          they want, and more importantly, at they price they are looking for.
          <br />
          <br />
          We maintain outstanding customer service by listening to our customers
          and making sure that we meet their needs. Even if you don't buy from
          us, we will offer free advice on whe to look for when buying a used
          car or truck.
          <br />
          <br />
          Our philosophy is to accomodate you, the customer, with outstanding
          service while providing you the highest quality automobile needs at
          wholesale prices. We have a wide selection of vehicles and the
          expertise to deal with what you are looking for.
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", lg: "160%" },
            display: "flex",
            justifyContent: "center",
          }}
          data-aos="fade-in"
        >
          <img src={aboutimg} style={{ maxWidth: "100%" }} alt="" />
        </Box>
      </Stack>
    </Box>
  );
}

//   {/* <Box sx={{ width: { lg: "60%" }, mt: 10 }}>
//     <Typography
//       data-aos="slide-right"
//       fontWeight={200}
//       fontSize={35}
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         fontFamily: "Anton",
//         color: "#ffe500",
//         mb: 2,
//       }}
//     >
//       Our branches:
//     </Typography>
//     {/* STARTING FROM SMALL SCREENS GRID*/}
//     <Grid
//       data-aos="slide-right"
//       container
//       direction="column"
//       justifyContent="center"
//       alignItems="center"
//       sx={{ mb: 15, display: { xs: "none", sm: "flex" } }}
//     >
//       {listOfServices.map((service) => (
//         <Box
//           key={service.branchname}
//           sx={{
//             "&:hover": {
//               transform: "scale(1.1)",
//               transition: "all 0.4s ease-in-out",
//             },
//             transform: "translate(0px,0px)",
//             transition: "all 0.4s ease-in-out",
//             p: 11,
//             mx: 3,
//             mb: { xs: 4 },
//             borderRadius: 20,
//             background: "#f9f9f9",
//             width: "45%",
//             backgroundImage: `url(${service.photo})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center center",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 36,
//               textTransform: "uppercase",
//               textAlign: "center",
//               fontFamily: "Anton",
//               color: "white",
//               WebkitTextStroke: "1px black",
//             }}
//           >
//             {service.branchname}
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: 30,
//               lineHeight: 2,
//               letterSpacing: 0.5,
//               m: 0,
//               textAlign: "center",
//               color: "white",
//               fontFamily: "Anton",
//               WebkitTextStroke: "0.3px black",
//             }}
//           >
//             {service.city}
//           </Typography>
//           <Typography
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               fontSize: 25,
//               lineHeight: 2,
//               letterSpacing: 0.5,
//               m: 0,
//               textAlign: "center",
//               color: "white",
//               fontFamily: "Anton",
//               WebkitTextStroke: "0.3px black",
//             }}
//             startDecorator={<FlagIcon />}
//           >
//             {service.country}
//           </Typography>
//         </Box>
//       ))}
//     </Grid>
//     {/* STARTING FROM PHONE SCREENS GRID*/}
//     <Grid
//       data-aos="slide-right"
//       container
//       direction="column"
//       justifyContent="center"
//       alignItems="center"
//       sx={{ mb: 15, display: { xs: "flex", sm: "none" } }}
//     >
//       {listOfServices.map((service) => (
//         <Box
//           key={service.branchname}
//           sx={{
//             p: 5,
//             py: 20,
//             mb: { xs: 4 },
//             borderRadius: 20,
//             width: "95%",
//             backgroundImage: `url(${service.photo})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center center",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 26,
//               textTransform: "uppercase",
//               textAlign: "center",
//               fontFamily: "Anton",
//               color: "white",
//               WebkitTextStroke: "1px black",
//             }}
//           >
//             {service.branchname}
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: 26,
//               textTransform: "uppercase",
//               textAlign: "center",
//               fontFamily: "Anton",
//               color: "white",
//               WebkitTextStroke: "1px black",
//             }}
//           >
//             {service.country}
//           </Typography>
//         </Box>
//       ))}
//     </Grid>
//   </Box>
//   <Box
//     sx={{
//       width: { sm: "100%", lg: "65%" },
//       display: { xs: "none", sm: "flex" },

//       py: { lg: 25 },
//     }}
//     data-aos="zoom-in-left"
//   >
//     <img src={HeightBanner} alt="" />
//   </Box>
