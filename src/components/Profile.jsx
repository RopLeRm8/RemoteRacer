import { getAuth } from "@firebase/auth";
import { CssVarsProvider, Stack } from "@mui/joy";
import { Box, Fade, Rating, Slide } from "@mui/material";
import Typography from "@mui/joy/Typography";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./NavBar";
import { useCallback, useState, useEffect, useRef } from "react";
import dices from "../assets/dices.png";
import points from "../assets/points.png";
import { ref, child, get, update, onValue } from "firebase/database";
import { db } from "../providers/FirebaseProvider";
import Medals from "./Medals";
import ProfileInfo from "./ProfileInfo";
import blackback from "../assets/blackback.png";
import blackback2 from "../assets/blackback2.png";
import "../css/Profile.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSnackbar } from "notistack";

const rateToText = [
  "לא אהבתי כלל",
  "אהבתי ברמה קטנה",
  "בינוני",
  "אהבתי",
  "אהבתי מאוד",
];
const query = ref(db);
export default function Profile() {
  const [firstElFoc] = useState(true);
  const [secondElFoc] = useState(true);
  const [thirdElFoc] = useState(true);
  const [fbvalue, setfbvalue] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const firstElRef = useRef();
  const secondElRef = useRef();
  const thirdElRef = useRef();

  const [user] = useAuthState(getAuth());

  const [value, setValue] = useState(0);

  const userRefData = ref(db, `users/${user.uid}/data`);
  const espOutputRef = ref(db, "test");
  const userData = `users/${user.uid}/data`;

  useEffect(() => {
    get(child(query, userData)).then((snapshot) => {
      snapshot && snapshot.val().rating && setValue(snapshot.val().rating);
    });

    // const handleScroll = (event) => {
    //   if (elementInViewport(firstElRef.current)) {
    //     setfirstElFoc(true);
    //     setSecondElFoc(true);
    //     setThirdElFoc(true);
    //   } else {
    //     setfirstElFoc(false);
    //     setSecondElFoc(false);
    //     setThirdElFoc(false);
    //   }
    //   if (elementInViewport(thirdElRef.current)) {
    //     setfirstElFoc(true);
    //     setSecondElFoc(true);
    //     setThirdElFoc(true);
    //   } else {
    //     setThirdElFoc(false);
    //   }

    //   // window.scrollY > 200 ? setfirstElFoc(true) : setfirstElFoc(false);
    //   // window.scrollY > 200 ? setSecondElFoc(true) : setSecondElFoc(false);
    //   // window.scrollY > 950 ? setThirdElFoc(true) : setThirdElFoc(false);
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
    document.body.classList.add("addbgprofile");
    return () => {
      document.body.classList.remove("addbgprofile");
    };
  }, [userData]);

  useEffect(() => {
    AOS.init();
    onValue(espOutputRef, (snapshot) => {
      const fetchedTasks = [];
      snapshot.forEach((childSnapshot) => {
        const keyval = childSnapshot.key;
        const data = childSnapshot.val();
        fetchedTasks.push({ value: keyval, data });
      });
      setfbvalue(fetchedTasks);
    });
  }, []);

  const handleValueChange = useCallback(
    (e, nValue) => {
      enqueueSnackbar("תודה על השתתפותך בסקר", {
        variant: "info",
        dir: "rtl",
      });
      setValue(nValue);
      update(userRefData, {
        rating: nValue,
      });
    },
    [userRefData, enqueueSnackbar]
  );

  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${blackback})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <ProfileInfo /> {/*מידע על המשתמש*/}
        <Medals data-aos="fade-out" />
      </Box>

      {/* {fbvalue.map((val) => (
        <Box key={val.value}>
          כאן יש תמונת ESP
          {val.value === "ip" && (
            <img
              src={"http://" + val.data + "/capture"}
              alt=""
              width="128"
              height="128"
            />
          )}
        </Box>
      ))} */}

      <Box
        sx={{
          backgroundImage: `url(${blackback2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Fade in={firstElFoc}>
          <Box
            ref={firstElRef}
            sx={{
              width: "100%",
              display: "flex",
              background: "linear-gradient(to top, black, transparent)",
            }}
          />
        </Fade>

        <Fade in={secondElFoc}>
          <Box
            ref={secondElRef}
            sx={{
              display: secondElFoc ? "block" : "none",
              width: "100%",
              height: "45vh",
              background: "black",
            }}
          >
            <Stack
              data-aos="fade-out"
              justifyContent="space-around"
              alignItems="center"
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 1, sm: 3, md: 0 }}
            >
              <Slide in={secondElFoc} direction="right">
                <Box
                  sx={{
                    "@media screen and (min-width: 90em)": {
                      mt: 10,
                    },

                    borderRadius: "50%",
                    backgroundColor: "#f2f0f6",
                    boxShadow:
                      "inset 8px 8px 17px 0 rgba(0, 0, 0, 0.05), inset -13px -13px 12px 0 hsla(0, 0%, 100%, 0.65), -11px -11px 40px 3px white, 8px 14px 40px -20px rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <img src={dices} width="166" height="166" alt="" />
                </Box>
              </Slide>
              <Slide in={secondElFoc} direction="left">
                <Box>
                  <Typography level="h2" sx={{ color: "white" }} dir="rtl">
                    מספר משחקים: 5
                  </Typography>
                  <Typography
                    level="h6"
                    sx={{ color: "white", opacity: "80%", mt: 0.3 }}
                    dir="rtl"
                  >
                    כמות משחקים, אשר בהם השתתפת
                  </Typography>
                </Box>
              </Slide>
            </Stack>
          </Box>
        </Fade>
        <Fade in={thirdElFoc}>
          <Box
            sx={{
              width: "100%",
              height: "5vh",
              display: "flex",
              background: "linear-gradient(to bottom, black, transparent)",
              "&::before": {
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100px",
              },
            }}
          />
        </Fade>
        <Box sx={{ display: firstElFoc ? "block" : "none" }}>
          <Fade in={thirdElFoc}>
            <Box
              sx={{
                mt: 10,
                height: "20vh",
                display: "flex",
                background: "linear-gradient(to top, black, transparent)",
              }}
            />
          </Fade>
        </Box>
        <Fade in={thirdElFoc}>
          <Box
            ref={thirdElRef}
            sx={{
              display: thirdElFoc ? "block" : "none",
              width: "100%",
              height: "45vh",
              background: "black",
              opacity: 0.9,
            }}
          >
            <Stack
              data-aos="fade-out"
              justifyContent="space-around"
              alignItems="center"
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 1, sm: 3, md: 5 }}
            >
              <Slide in={thirdElFoc} direction="right">
                <Box
                  sx={{
                    "@media screen and (min-width: 90em)": {
                      mt: 10,
                    },
                    borderRadius: "50%",
                    backgroundColor: "#f2f0f6",
                    boxShadow:
                      "inset 8px 8px 17px 0 rgba(0, 0, 0, 0.05), inset -13px -13px 12px 0 hsla(0, 0%, 100%, 0.65), -11px -11px 40px 3px white, 8px 14px 40px -20px rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <img src={points} width="166" height="166" alt="" />
                </Box>
              </Slide>
              <Slide in={thirdElFoc} direction="left">
                <Box>
                  <Typography level="h2" sx={{ color: "white" }} dir="rtl">
                    סך הכל נקודות: 600
                  </Typography>
                  <Typography
                    level="h6"
                    sx={{ color: "white", opacity: "80%", mt: 0.3 }}
                    dir="rtl"
                  >
                    כמות נקודות אשר הרווחת, כולל מהיום והלאה
                  </Typography>
                </Box>
              </Slide>
            </Stack>
          </Box>
        </Fade>
        <Fade in={thirdElFoc}>
          <Box
            sx={{
              width: "100%",
              height: "5vh",
              display: "flex",
              background: "linear-gradient(to bottom, black, transparent)",
              opacity: "80%",
              "&::before": {
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "100px",
              },
            }}
          />
        </Fade>

        <Stack direction="column" alignItems="center" sx={{ my: 3 }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Noto Sans Hebrew",
              fontSize: 25,
            }}
          >
            תן לנו לדעת את דעתך
          </Typography>

          <Rating
            value={value}
            onChange={handleValueChange}
            readOnly={value > 0}
            sx={{
              borderRadius: "5px",
              border: "2px solid #ccc",
              color: "rgba(255,255,255,0.8)",
              ":&emptyicon": {
                color: "white",
              },
            }}
          />
          <Typography dir="rtl" level="h5" sx={{ color: "white" }}>
            {value > 0 && rateToText[value - 1]}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
