import { getAuth } from "@firebase/auth";
import ConstructionIcon from "@mui/icons-material/Construction";
import EditIcon from "@mui/icons-material/Edit";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import OpacityIcon from "@mui/icons-material/Opacity";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import LazyLoad from "react-lazyload";

import {
  Box,
  Button,
  Card,
  Chip,
  CssVarsProvider,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  ListDivider,
  ListItemDecorator,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { FormHelperText, Paper, Popover } from "@mui/material";
import { child, get, ref, update } from "firebase/database";
import { MuiColorInput } from "mui-color-input";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import robot from "../assets/Customize/robot.png";
import "../css/Customize.css";
import ScrollAnimation from "../features/ScrollAnimation";
import { useNotification } from "../hooks/useNotification";
// import Footer from "../layouts/Footer";
import { CustomButtonJoy } from "../features/CustomButton";
import LogoMaker from "../features/LogoMaker";
import Navbar from "../layouts/NavBar";
import { db } from "../providers/FirebaseProvider";
const englishchars = /^[A-Za-z0-9 ]*$/;
export default function Customize() {
  const query = ref(db);
  const [carName, setcarName] = useState("");
  const [carNameError, setcarNameError] = useState("");
  const [carColor, setcarColor] = useState("");
  const [writeLength, setwriteLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectOpen, setselectOpen] = useState(false);
  const [openPopover, setopenPopover] = useState(false);
  const [anchorEl, setanchorEl] = useState(null);
  const [colorChosen, setcolorChosen] = useState("");
  const carNameTitleRef = useRef();
  const videoRef = useRef();
  const selectRef = useRef();
  const [user] = useAuthState(getAuth());
  const userRefDataUpdate = ref(db, `users/${user.uid}/data`);
  const userRefData = `users/${user.uid}/data`;
  const notify = useNotification();
  const options = [
    { Name: "Red", value: "rgb(255,0,0)" },
    { Name: "Green", value: "rgb(0,255,0)" },
    { Name: "Blue", value: "rgb(0,0,255)" },
    { Name: "Cyan", value: "rgb(0,255,255)" },
    { Name: "Dark Violet", value: "rgb(148,0,211)" },
    { Name: "Restore To Default", value: "rgb(255,255,255)" },
    {
      Name: "Use custom color",
      value: <HelpOutlineIcon />,
      color: colorChosen,
    },
  ];

  useEffect(() => {
    get(child(query, userRefData))
      .then((snap) => {
        if (!snap.val().carName && !snap.val().carColor) {
          notify("No configuration detected - restoring values to default", {
            variant: "info",
          });
          setcarName("'Car Name'");
          return;
        }
        setcarName(snap.val().carName);
        carNameTitleRef.current.style.color = snap.val().carColor;
        videoRef.current?.play();
      })
      .catch(() => {
        notify("Couldn't connect to firebase database", {
          variant: "error",
        });
      });
  }, [query, userRefData, notify]);

  useEffect(() => {
    document.body.classList.add("backgroundCustomize");
    return () => {
      document.body.classList.remove("backgroundCustomize");
    };
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

  const handleColorChange = useCallback(
    (e, nValue) => {
      if (e.target.outerText.substring(1) === "Use custom color") {
        setopenPopover(true);
        setanchorEl(selectRef.current);
      }
      carNameTitleRef.current.style.transition = "0.5s all ease-out";
      if (typeof nValue === "object" && colorChosen) {
        carNameTitleRef.current.style.color = colorChosen;
        setcarColor(colorChosen);
      } else {
        setcarColor(nValue);
        carNameTitleRef.current.style.color = nValue;
      }
    },
    [colorChosen]
  );

  const handleconfSave = useCallback(() => {
    if (carNameError) {
      notify(carNameError, { variant: "error" });
      return;
    }
    if (writeLength === 0 && !carColor) {
      setcarNameError("The amount of characters must be above 0");
      return;
    }
    if ((!carName && !carColor) || carName === "'Car Name'") {
      notify(
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
      notify("Successfully updated car configuration", {
        variant: "success",
      });
    });
  }, [carColor, carName, carNameError, writeLength, userRefDataUpdate, notify]);

  const handlechangeColor = useCallback(
    (nColor) => {
      setcolorChosen(nColor);
      carNameTitleRef.current.style.transition = "0.5s all ease-out";
      carNameTitleRef.current.style.color = colorChosen;
    },
    [colorChosen]
  );
  return (
    <Box>
      <CssVarsProvider />
      <Navbar />
      <LazyLoad>
        <Box sx={{ backgroundColor: "rgba(0,0,0,0)", py: 6 }}>
          <Typography
            sx={{
              fontFamily: "Anton",
              fontSize: "4vh",
              color: "white",
              display: "flex",
              justifyContent: { xs: "center", md: "center" },
              textAlign: "center",
              ml: { xs: 3, lg: 0 },
            }}
            endDecorator={<LogoMaker />}
          >
            CUSTOMIZE YOUR CAR
          </Typography>
          <Typography
            sx={{
              fontFamily: "Anton",
              fontSize: "2vh",
              color: "white",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            startDecorator={
              <NearbyErrorIcon sx={{ display: { xs: "none", md: "block" } }} />
            }
          >
            Remember: You can always undo any change
          </Typography>
        </Box>
      </LazyLoad>

      <Divider sx={{ backgroundColor: "white" }} />
      <Grid
        container
        alignItems="center"
        justifyContent={{ xs: "center", sm: "space-around" }}
        sx={{ py: { md: 20 }, pb: { xs: 0, md: 10 } }}
      >
        <Grid
          item
          sx={{ my: { xs: 5, sm: 1 }, mb: { xs: selectOpen ? 40 : 5, md: 35 } }}
        >
          <ScrollAnimation animationName="animate__bounceIn">
            <Card
              sx={{
                backgroundColor: "black",
                boxShadow: "3px 3px 24px 0.3px orange",
              }}
              size="lg"
            >
              <Typography
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 25,
                  fontFamily: "Inter",
                  display: "flex",
                  justifyContent: "center",
                }}
                startDecorator={<ConstructionIcon />}
              >
                CAR CONFIGURATION
              </Typography>
              <Divider sx={{ backgroundColor: "white", my: 2, mx: 0.5 }} />
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <FormControl>
                    <FormLabel>
                      <Typography
                        fontFamily="Inter"
                        sx={{ color: "white" }}
                        startDecorator={<EditIcon sx={{ color: "white" }} />}
                      >
                        {"Car Name (" + writeLength + ")"}
                      </Typography>
                    </FormLabel>
                    <Input
                      startDecorator={
                        <TextSnippetIcon sx={{ color: "black" }} />
                      }
                      color="warning"
                      size="md"
                      onChange={handlechangeName}
                      error={carNameError !== ""}
                      sx={{ transition: "0.2s all ease-out" }}
                    />
                    <FormHelperText
                      sx={{ color: "red", fontFamily: "Poppins" }}
                    >
                      {carNameError}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item>
                  <Typography
                    sx={{ color: "white", fontFamily: "Inter", mb: 1 }}
                    startDecorator={<PaletteIcon sx={{ color: "white" }} />}
                  >
                    Car Name Color
                  </Typography>
                  <Select
                    ref={selectRef}
                    onListboxOpenChange={() => setselectOpen((prev) => !prev)}
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
                          value={
                            typeof option.value !== "object" ||
                            option.color === "#ffffff"
                              ? option.value
                              : option.color
                          }
                          key={option.value}
                          sx={{
                            borderRadius: 5,
                            fontFamily: "Inter",
                            fontWeight: 700,
                            color: "black",
                          }}
                        >
                          <ListItemDecorator>
                            {typeof option.value === "string" ? (
                              <Box
                                sx={{
                                  backgroundColor: option.value,
                                  borderRadius: 50,
                                  width: 20,
                                  color: "rgba(0,0,0,0)",
                                }}
                              >
                                h
                              </Box>
                            ) : (
                              <Box>
                                <Box
                                  sx={{
                                    backgroundColor: colorChosen,
                                    borderRadius: 50,
                                    width: 20,
                                    color: "rgba(0,0,0,0)",
                                    display: colorChosen ? "flex" : "none",
                                  }}
                                >
                                  h
                                </Box>
                                <HelpOutlineIcon
                                  sx={{
                                    display: colorChosen ? "none" : "flex",
                                  }}
                                />
                              </Box>
                            )}
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
                        borderRadius: "1",
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: 13,
                        transition: "0.2s all ease-out",
                        backgroundColor: "orange",
                      }}
                      startDecorator={<SettingsIcon />}
                      onClick={handleconfSave}
                      loading
                      fullWidth
                    />
                  ) : (
                    <CustomButtonJoy
                      variant="soft"
                      color="warning"
                      fullWidth
                      text="SAVE CONFIGURATION"
                      sx={{
                        mt: 1,
                        borderRadius: "1",
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                      startDecorator={<SettingsIcon />}
                      onClickFunc={handleconfSave}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>
          </ScrollAnimation>
        </Grid>
        <Grid
          item
          sx={{
            pb: { xs: 5, md: 34.5 },
          }}
        >
          <Grid container direction="column">
            <Paper elevation={20}>
              <Grid
                item
                sx={{
                  background: "orange",
                  borderRadius: "5px",
                  maxWidth: "100%",
                  boxShadow: "3px 3px 24px 0.3px orange",
                }}
                className="noSelect"
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Anton",
                    fontSize: "200%",
                    mb: 1,
                    backgroundColor: "black",
                    maxWidth: "100%",
                    borderRadius: "4px",
                  }}
                  ref={carNameTitleRef}
                  level="h3"
                >
                  {carName}
                </Typography>
                <LazyLoad>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={robot}
                      alt=""
                      style={{
                        maxWidth: "23.5vmax",
                        display: "flex",
                        justifyContent: "center",
                        // animation: "rotating 10s linear infinite",
                      }}
                      className="noSelect"
                    />
                  </Box>
                </LazyLoad>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* <Footer /> */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={() => setopenPopover(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ p: 3 }}
      >
        <MuiColorInput
          value={colorChosen}
          onChange={handlechangeColor}
          placeholder="#ffffff"
        />
      </Popover>
    </Box>
  );
}
