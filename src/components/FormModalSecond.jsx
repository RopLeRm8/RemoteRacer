import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  CssVarsProvider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/joy";

import BadgeIcon from "@mui/icons-material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { Drawer } from "@mui/material";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import "../css/FormModalSecond.css";
import { authErrorToTitleCase } from "../helpers";

const engReg = /^[a-zA-Z ]+$/;
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export default function FormModalSecond({ open, setOpen, setStam }) {
  const [nameerror, setnameError] = useState("");
  const [lastNameerror, setlastNameerror] = useState("");
  const [emailError, setemailError] = useState("");

  const [nameValue, setnameValue] = useState("");
  const [lastnameValue, setlastnameValue] = useState("");
  const [emailValue, setemailValue] = useState("");

  const [emailFocused, setemailFocused] = useState(false);
  const [nameFocused, setnameFocused] = useState(false);
  const [lastnameFocused, setlastnameFocused] = useState(false);

  const [errorFound, setErrorFound] = useState(true);

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const auth = getAuth();

  useEffect(() => {
    UpdateErrorsFound();
  }, [nameValue, lastnameValue, emailValue]);

  const handleChangeName = useCallback((e) => {
    setnameValue(e.target.value);
    if (!engReg.test(e.target.value) && e.target.value.length > 0) {
      setnameError("Name must contain only english characters");
      return;
    }
    if (e.target.value.length > 16 || e.target.value.length < 4) {
      setnameError("Your name must have at least 4 and at most 16 characters.");
      return;
    }
    setnameError("");
  });
  const handleChangeLastName = useCallback((e) => {
    setlastnameValue(e.target.value);
    if (!engReg.test(e.target.value) && e.target.value.length > 0) {
      setlastNameerror("Name must contain only english characters");
      return;
    }
    if (e.target.value.length > 16 || e.target.value.length < 4) {
      setlastNameerror(
        "Your last name must have at least 4 and at most 16 characters."
      );
      return;
    }
    setlastNameerror("");
  });
  const handleChangeMail = useCallback((e) => {
    setemailValue(e.target.value);
    if (!emailReg.test(e.target.value) && e.target.value.length > 0) {
      setemailError("Invalid Email");
      return;
    }
    setemailError("");
  });

  const UpdateErrorsFound = () => {
    setErrorFound(!nameerror && !lastNameerror && !emailError);
    return;
  };

  const submitNewValues = useCallback(() => {
    if (!nameValue || !lastnameValue) {
      enqueueSnackbar(
        "Please enter atleast 4 characters into name and last name fields",
        { variant: "warning" }
      );
      return;
    }
    if (!checked) {
      enqueueSnackbar(
        "Please mark 'checked' if you desire to change any information",
        { variant: "warning" }
      );
      return;
    }
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: nameValue + " " + lastnameValue,
    })
      .then(() => {
        enqueueSnackbar("Successfully Updated User Information", {
          variant: "success",
        });
        setStam((prev) => !prev);
        if (!emailValue) {
          setLoading(false);
          return;
        }
        updateEmail(auth.currentUser, emailValue)
          .then(() => {
            enqueueSnackbar("Successfully Updated User Email", {
              variant: "success",
            });
            setStam((prev) => !prev);
          })
          .catch((error) => {
            enqueueSnackbar(authErrorToTitleCase(error.code), {
              variant: "error",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        enqueueSnackbar("Couldn't update first and last names", {
          variant: "error",
        });
      });
  });

  return (
    <Box>
      <CssVarsProvider />
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setnameValue("");
          setlastnameValue("");
          setemailValue("");
          setnameError("");
          setlastNameerror("");
          setemailError("");
          setOpen(false);
        }}
        sx={{ color: "#ffe500" }}
      >
        <Card sx={{ px: { xs: 5, sm: 20 }, py: 8, borderRadius: 0 }}>
          <Typography
            fontFamily="Montserrat"
            fontWeight={600}
            fontSize={40}
            sx={{ my: 2, mb: 4 }}
          >
            Personal Info
          </Typography>
          <Grid container>
            <Grid item>
              <TextField
                startDecorator={
                  <EditIcon
                    sx={{
                      color: "black",
                      transform: nameFocused ? "scale(1)" : "scale(0.6)",
                      transition: "all 0.15s ease-out",
                    }}
                  />
                }
                label={
                  <Typography
                    startDecorator={
                      <Badge
                        badgeContent="NEW"
                        badgeInset="-20%"
                        size="sm"
                        color="warning"
                        sx={{
                          mr: 1,
                          animation: "float 6s ease-in-out infinite",
                        }}
                      >
                        <BadgeIcon />
                      </Badge>
                    }
                    fontFamily="Montserrat"
                  >
                    First Name
                  </Typography>
                }
                color="warning"
                onChange={handleChangeName}
                onFocus={() => setnameFocused(true)}
                onBlur={() => setnameFocused(false)}
                sx={{ mr: { sm: 4 }, mb: { xs: 3, sm: 0 } }}
                required
                error={!!nameerror}
                helperText={nameerror}
              />
            </Grid>
            <Grid item>
              <TextField
                startDecorator={
                  <EditIcon
                    sx={{
                      color: "black",
                      transform: lastnameFocused ? "scale(1)" : "scale(0.6)",
                      transition: "all 0.15s ease-out",
                    }}
                  />
                }
                label={
                  <Typography
                    startDecorator={
                      <Badge
                        badgeContent="NEW"
                        badgeInset="-20%"
                        size="sm"
                        color="warning"
                        sx={{
                          mr: 1,
                          animation: "float 6s ease-in-out infinite",
                        }}
                      >
                        <BadgeIcon />
                      </Badge>
                    }
                    fontFamily="Montserrat"
                  >
                    Last Name
                  </Typography>
                }
                color="warning"
                onChange={handleChangeLastName}
                onFocus={() => setlastnameFocused(true)}
                onBlur={() => setlastnameFocused(false)}
                required
                error={!!lastNameerror}
                helperText={lastNameerror}
              />
            </Grid>
          </Grid>
          <TextField
            startDecorator={
              <EditIcon
                sx={{
                  color: "black",
                  transform: emailFocused ? "scale(1)" : "scale(0.6)",
                  transition: "all 0.15s ease-out",
                }}
              />
            }
            label={
              <Typography
                startDecorator={
                  <Badge
                    badgeContent="NEW"
                    badgeInset="-20%"
                    size="sm"
                    color="warning"
                    sx={{ mr: 1, animation: "float 6s ease-in-out infinite" }}
                  >
                    <EmailIcon />
                  </Badge>
                }
                fontFamily="Montserrat"
              >
                Email
              </Typography>
            }
            color="warning"
            onChange={handleChangeMail}
            onFocus={() => setemailFocused(true)}
            onBlur={() => setemailFocused(false)}
            placeholder="example: ropler@yahoo.com"
            sx={{ mt: 3 }}
            error={!!emailError}
            helperText={emailError}
          />
          <Typography sx={{ my: 1, opacity: "70%", fontSize: 13 }}>
            Required recent login status in order to change email
          </Typography>
          <Tooltip
            color="warning"
            variant="outlined"
            placement="left"
            title={
              <Grid container direction="column" sx={{ p: 1 }}>
                <Typography>• Words that contain cursing context</Typography>
                <Typography>
                  • Words that are not allowed in the society
                </Typography>
                <Typography>• Words that are SUS</Typography>
              </Grid>
            }
          >
            <Checkbox
              color="warning"
              label={
                <Typography>
                  I agree that the fields I've filled do not contain abusive
                  language
                </Typography>
              }
              onChange={() => setChecked((prev) => !prev)}
            />
          </Tooltip>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  borderRadius: "5%",
                  mt: 2,
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                }}
                onClick={() => setOpen(false)}
                size="lg"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="solid"
                color="warning"
                sx={{
                  borderRadius: "5%",
                  mt: 2,
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                }}
                disabled={!errorFound}
                onClick={submitNewValues}
                loading={!!loading}
                size="lg"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Drawer>
    </Box>
  );
}