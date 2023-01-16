import { getAuth } from "@firebase/auth";
import EditIcon from "@mui/icons-material/Edit";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import OpacityIcon from "@mui/icons-material/Opacity";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Box,
  Button,
  Card,
  Chip,
  CssVarsProvider,
  Divider,
  Grid,
  ListDivider,
  ListItemDecorator,
  Option,
  Select,
  TextField,
  Typography,
} from "@mui/joy";
import { child, get, ref, update } from "firebase/database";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomizeVideo from "../assets/Customize/Customize2.mp4";
import robot from "../assets/Customize/robot.png";
import "../css/Customize.css";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";
const englishchars = /^[A-Za-z0-9 ]*$/;
const options = [
  { Name: "Red", value: "rgb(255,0,0)" },
  { Name: "Green", value: "rgb(0,255,0)" },
  { Name: "Blue", value: "rgb(0,0,255)" },
  { Name: "Cyan", value: "rgb(0,255,255)" },
  { Name: "Dark Violet", value: "rgb(148,0,211)" },
  { Name: "Restore To Default", value: "rgb(255,255,255)" },
];
export default function Customize() {
  const query = ref(db);
  const [carName, setcarName] = useState("");
  const [carNameError, setcarNameError] = useState("");
  const [carColor, setcarColor] = useState("");
  const [writeLength, setwriteLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const carNameTitleRef = useRef();
  const videoRef = useRef();
  const [user] = useAuthState(getAuth());
  const userRefDataUpdate = ref(db, `users/${user.uid}/data`);
  const userRefData = `users/${user.uid}/data`;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    get(child(query, userRefData))
      .then((snap) => {
        if (!snap.val().carName && !snap.val().carColor) {
          enqueueSnackbar(
            "No configuration detected - restoring values to default",
            {
              variant: "info",
            }
          );
          setcarName("'Car Name'");
          return;
        }
        setcarName(snap.val().carName);
        carNameTitleRef.current.style.color = snap.val().carColor;
        videoRef.current?.play();
      })
      .catch(() => {
        enqueueSnackbar("Couldn't connect to firebase database", {
          variant: "error",
        });
      });
  }, []);

  const handlechangeName = useCallback((e) => {
    setwriteLength(15 - e.target.value.length);
    if (e.target.value.match(englishchars) === null) {
      e.target.value = "";
      setcarName("");
      setwriteLength(0);
      setcarNameError("English letters and numbers are allowed only");
      return;
    }

    if (
      e.target.value.length > 15 ||
      (e.target.value.length < 4 && e.target.value.length >= 0)
    ) {
      setcarNameError("The amount of characters must be between 4 and 15");
      return;
    }

    setcarName(e.target.value);
    setcarNameError("");
  }, []);

  const handleColorChange = useCallback((e, nValue) => {
    carNameTitleRef.current.style.color = nValue;
    carNameTitleRef.current.style.transition = "0.5s all ease-out";
    setcarColor(nValue);
  });

  const handleconfSave = useCallback(() => {
    if (carNameError) {
      enqueueSnackbar(carNameError, { variant: "error" });
      return;
    }
    if (writeLength === 0 && !carColor) {
      setcarNameError("The amount of characters must be above 0");
      return;
    }
    if ((!carName && !carColor) || carName === "'Car Name'") {
      enqueueSnackbar(
        "Please edit one of the options in order for the car to be updated",
        { variant: "info" }
      );
      return;
    }
    setLoading(true);
    update(userRefDataUpdate, {
      carName: carName,
      carColor: carColor,
    }).finally(() => {
      setLoading(false);
      enqueueSnackbar("Successfully updated car configuration", {
        variant: "success",
      });
    });
  });

  return (
    <Box>
      <CssVarsProvider />

      <Navbar />
      <Box sx={{ backgroundColor: "#ffe500", py: 6 }}>
        <video
          id="customize"
          src={CustomizeVideo}
          autoPlay
          muted
          ref={videoRef}
        ></video>
        <Typography
          level="h1"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            fontFamily: "Anton",
            mb: 2,
            textAlign: "center",
          }}
        >
          Customize Your Dream Car
        </Typography>
        <Typography
          level="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            fontFamily: "Montserrat",
            textAlign: "center",
          }}
          startDecorator={
            <NearbyErrorIcon sx={{ display: { xs: "none", sm: "block" } }} />
          }
        >
          Remember: You can always undo the changes
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "white" }} />
      <Grid
        container
        alignItems="end"
        justifyContent={{ xs: "center", sm: "space-evenly" }}
        sx={{ py: { sm: 20 }, pb: { xs: 10, sm: 0 } }}
      >
        <Grid item sx={{ my: { xs: 5, sm: 1 }, mb: { md: 35 } }}>
          <Card sx={{ backgroundColor: "black" }} size="lg">
            <Typography
              sx={{
                color: "#ffe500",
                textAlign: "center",
                fontSize: 25,
                fontFamily: "Anton",
              }}
            >
              Car Configuration
            </Typography>
            <Divider sx={{ backgroundColor: "white", my: 2 }} />
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  startDecorator={<TextSnippetIcon sx={{ color: "black" }} />}
                  label={
                    <Typography
                      fontFamily="Montserrat"
                      sx={{ color: "#ffe500" }}
                      startDecorator={<EditIcon sx={{ color: "white" }} />}
                    >
                      {"Car Name (" + writeLength + ")"}
                    </Typography>
                  }
                  color="warning"
                  size="md"
                  onChange={handlechangeName}
                  error={carNameError !== ""}
                  helperText={carNameError}
                  sx={{ transition: "0.2s all ease-out" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  sx={{ color: "#ffe500", fontFamily: "Montserrat", mb: 1 }}
                  startDecorator={<PaletteIcon sx={{ color: "white" }} />}
                >
                  Car Name Color
                </Typography>
                <Select
                  startDecorator={<OpacityIcon sx={{ color: "black" }} />}
                  defaultValue="1"
                  placeholder={
                    <Chip
                      color="warning"
                      variant="outlined"
                      sx={{ borderRadius: 10, pointerEvents: "none" }}
                    >
                      Color option (optional)
                    </Chip>
                  }
                  slotprops={{
                    listbox: {
                      sx: {
                        "--List-decorator-size": "44px",
                      },
                    },
                  }}
                  sx={{
                    "--List-decorator-size": "44px",
                    minWidth: 240,
                    transition: "0.2s all ease-out",
                  }}
                  onChange={handleColorChange}
                >
                  {options.map((option) => (
                    <Box key={option.Name}>
                      <Option
                        value={option.value}
                        key={option.value}
                        sx={{
                          borderRadius: 5,
                          fontFamily: "Montserrat",
                          fontWeight: 700,
                          color: "black",
                        }}
                      >
                        <ListItemDecorator>
                          <Box
                            sx={{
                              backgroundColor: option.value,
                              borderRadius: 50,
                              width: 24,
                              color: "rgba(0,0,0,0)",
                            }}
                          >
                            h
                          </Box>
                        </ListItemDecorator>
                        {option.Name}
                      </Option>
                      <ListDivider role="none" />
                    </Box>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                {loading ? (
                  <Button
                    variant="soft"
                    color="warning"
                    sx={{
                      mt: 1,
                      width: carNameError ? "325px" : "270px",
                      borderRadius: "1",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: 13,
                      transition: "0.2s all ease-out",
                    }}
                    startDecorator={<SettingsIcon />}
                    onClick={handleconfSave}
                    loading
                  >
                    SAVE CONFIGURATION
                  </Button>
                ) : (
                  <Button
                    variant="soft"
                    color="warning"
                    sx={{
                      mt: 1,
                      width: carNameError ? "325px" : "270px",
                      borderRadius: "1",
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: 13,
                      transition: "0.2s all ease-out",
                    }}
                    startDecorator={<SettingsIcon />}
                    onClick={handleconfSave}
                  >
                    SAVE CONFIGURATION
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item sx={{ pb: 35 }}>
          <Grid container direction="column">
            <Grid
              item
              sx={{ background: "rgba(255,228,0,0.8)", maxWidth: "100%" }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Anton",
                  fontSize: 45,
                  mb: 1,
                  backgroundColor: "black",
                  maxWidth: "100%",
                }}
                ref={carNameTitleRef}
                level="h3"
              >
                {carName}
              </Typography>

              <Box>
                <img
                  src={robot}
                  alt=""
                  style={{
                    width: "300px",
                    display: "flex",
                    justifyContent: "center",
                    // animation: "rotating 10s linear infinite",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
