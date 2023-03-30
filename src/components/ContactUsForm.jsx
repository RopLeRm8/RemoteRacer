import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import {
  Box,
  CssVarsProvider,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/joy";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { CustomButton } from "../features/CustomButton";
import LogoMaker from "../features/LogoMaker";
import { useNotification } from "../hooks/useNotification";
import { iconsContext } from "../pages/ContactUs";
const impLevel = [
  {
    value: 0,
    label: "Not critical",
  },
  {
    value: 1,
    label: "Important",
  },
  {
    value: 2,
    label: "Almost critical",
  },
  {
    value: 3,
    label: "Critical",
  },
];
export default function ContactUsForm({ setFinished, setFormData }) {
  const [subject, setSubject] = useState("");
  const [fieldFocus, setFieldFocus] = useState(false);
  const [issueType, setIssueType] = useState(0);
  const [severLevel, setSeverLevel] = useState("Not critical");
  const [issueDesc, setIssueDesc] = useState("");
  const [leftToRight, setLeftToRight] = useState(true);
  const [textBold, setTextBold] = useState(false);
  const [textUpper, setTextUpper] = useState(false);
  const [boldIndex, setBoldIndex] = useState(0);
  const [viewHistory, setViewHistory] = useState(false);
  const notify = useNotification();
  // const [upperIndex, setUppderIndex] = useState(0);
  const eNums = useContext(iconsContext);
  const handleSubmitForm = () => {
    if (!subject) {
      notify("Please select a subject of the issue", {
        variant: "error",
      });
      return;
    }
    if (!issueDesc || issueDesc.length < 10) {
      notify("Please tell us more about the issue", {
        variant: "error",
      });
      return;
    }
    setFormData({
      subject: subject,
      issue: issueDesc,
      issueType: issueType,
      severLevel: severLevel,
    });
    setFinished(true);
  };

  return (
    <>
      <CssVarsProvider />
      <Box
        sx={{
          background: "rgba(0,0,0,0)",
          width: "100%",
          pb: { md: 4 },
          pt: { md: 2 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Anton",
            fontSize: "4vh",
            color: "white",
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
            textAlign: "center",
            mt: 4,
            ml: { xs: 3, lg: 0 },
          }}
          endDecorator={<LogoMaker />}
        >
          CONTACT US
        </Typography>
        <Typography
          sx={{
            fontFamily: "Anton",
            fontSize: "2vh",
            color: "white",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            mb: 6,
            mx: 2,
          }}
        >
          If you feel you need an assistance with anything on our platform, feel
          free to contact us
        </Typography>
      </Box>
      {viewHistory ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            sx={{
              background: "white",
              border: "1px solid orange",
              mt: 5,
              p: 2,
              width: { xs: "90%", lg: "50%" },
            }}
          >
            <Grid item>
              <Typography sx={{ fontSize: "150%", textAlign: "center" }}>
                Ticket History
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            sx={{
              border: "1px solid orange",
              mt: 5,
              p: 2,
              background: "white",
              width: { xs: "90%", lg: "50%" },
            }}
          >
            <Grid item>
              <FormControl fullWidth>
                <InputLabel
                  color="warning"
                  sx={{
                    fontFamily: "Poppins",
                    color: "black",
                  }}
                >
                  Subject of the issue
                </InputLabel>
                <Select
                  variant="standard"
                  color="warning"
                  sx={{
                    maxWidth: { md: "30%" },
                    "	.MuiSelect-nativeInput": { color: "black" },
                    "&.MuiInput-underline:before": {
                      borderBottomColor: "black",
                    },
                    "&.MuiInput-underline:hover:after": {
                      borderBottomColor: "orange",
                    },
                    "&.MuiInput-underline.Mui-focused:after": {
                      borderBottomColor: "orange",
                    },
                  }}
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (
                      eNums.eNumSubject[e.target.value] !== "Technical issues"
                    ) {
                      setIssueType(null);
                    } else {
                      setIssueType("UX");
                    }
                  }}
                  inputProps={{ sx: { fontFamily: "Poppins" } }}
                >
                  <MenuItem value="account_issues">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Poppins",
                      }}
                    >
                      {eNums.eNumIcons["account_issues"]}
                      Account issues
                    </Box>
                  </MenuItem>
                  <MenuItem value="technical_issues">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Poppins",
                      }}
                    >
                      {eNums.eNumIcons["technical_issues"]} Technical issues
                    </Box>
                  </MenuItem>
                  <MenuItem value="question">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Poppins",
                      }}
                    >
                      {eNums.eNumIcons["question"]}I have a question
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                onChange={(e) => {
                  setIssueDesc(e.target.value);
                  if (textBold) {
                    setBoldIndex(e.target.value.length);
                  }
                }}
                onFocus={() => setFieldFocus(true)}
                onBlur={() => setFieldFocus(false)}
                variant="standard"
                multiline
                maxRows={3}
                label="Describe the issue"
                color="warning"
                InputLabelProps={{
                  sx: { color: "rgba(0,0,0,0.4)" },
                }}
                sx={{
                  "& .Mui-focused": {
                    color: "black",
                  },
                  minWidth: { xs: "100%", lg: "30%" },
                }}
                inputProps={{
                  maxLength: 400,
                  style: {
                    direction: leftToRight ? "ltr" : "rtl",
                    fontFamily: "Poppins",
                    fontWeight: (index) =>
                      index < boldIndex ? "bold" : "normal",
                  },
                }}
                helperText={
                  <>
                    <Typography
                      sx={{
                        color: issueDesc.length > 380 ? "red" : "black",
                        fontSize: "110%",
                        display: fieldFocus ? "flex" : "none",
                        my: 0.5,
                        mb: 1,
                      }}
                    >
                      {issueDesc.length}/400
                    </Typography>
                    <Box
                      sx={{
                        minWidth: "100%",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {leftToRight ? (
                        <IconButton
                          color="inherit"
                          onClick={() => setLeftToRight(false)}
                        >
                          <SwitchRightIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          color="inherit"
                          onClick={() => setLeftToRight(true)}
                        >
                          <SwitchLeftIcon />
                        </IconButton>
                      )}
                      {textBold ? (
                        <IconButton
                          sx={{ mt: 0.1 }}
                          color="inherit"
                          onClick={() => setTextBold(false)}
                        >
                          <FormatBoldIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ mt: 0.1 }}
                          color="inherit"
                          onClick={() => setTextBold(true)}
                        >
                          <FormatBoldIcon />
                        </IconButton>
                      )}
                      {textUpper ? (
                        <IconButton
                          sx={{ mt: 0.4 }}
                          color="inherit"
                          onClick={() => setTextUpper(false)}
                        >
                          <FormatUnderlinedIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ mt: 0.4 }}
                          color="inherit"
                          onClick={() => setTextUpper(true)}
                        >
                          <FormatUnderlinedIcon />
                        </IconButton>
                      )}
                    </Box>
                  </>
                }
              />
            </Grid>
            {eNums.eNumSubject[subject] === "Technical issues" ? (
              <Grid item>
                <Typography>Issue category</Typography>
                <RadioGroup
                  defaultValue="UX"
                  sx={{ my: 1 }}
                  onChange={(e) => setIssueType(e.target.value)}
                >
                  <Radio value="UX" label="UX" color="warning" />
                  <Radio value="Mechanic" label="Mechanic" color="warning" />
                  <Radio value="Other" label="Other" color="warning" />
                </RadioGroup>
              </Grid>
            ) : null}
            <Grid item>
              <Typography fontFamily="Inter">
                {" "}
                Severity of the issue{" "}
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Slider
                  onChange={(_, nVal) =>
                    setSeverLevel(
                      impLevel.find((level) => level.value === nVal).label
                    )
                  }
                  color="warning"
                  variant="solid"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(val) =>
                    impLevel.find((level) => level.value === val)?.label
                  }
                  defaultValue={0}
                  step={1}
                  max={3}
                  orientation="horizontal"
                  marks={impLevel}
                  sx={{
                    my: 2,
                    mb: 3,
                    display: { xs: "flex", md: "none" },
                    "	.MuiSlider-markLabel": { display: "none" },
                    "	.MuiSlider-thumb": {
                      background: "black",
                      border: "2px solid black",
                      outline: "none",
                    },
                    ".MuiSlider-rail": { background: "black" },
                    "	.MuiSlider-mark": { background: "white" },
                    "	.MuiSlider-markActive": { background: "black" },
                  }}
                />
              </Box>
              <Box sx={{ width: "40%" }}>
                <Slider
                  onChange={(_, nVal) =>
                    setSeverLevel(
                      impLevel.find((level) => level.value === nVal)?.label
                    )
                  }
                  size="lg"
                  color="warning"
                  variant="solid"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(val) =>
                    impLevel.find((level) => level.value === val)?.label
                  }
                  defaultValue={0}
                  step={1}
                  max={3}
                  marks={impLevel}
                  orientation="horizontal"
                  sx={{
                    mb: 3,
                    display: { xs: "none", md: "flex" },
                    "	.MuiSlider-markLabel": { display: "none" },
                    "	.MuiSlider-thumb": {
                      background: "black",
                      border: "2px solid black",
                      outline: "none",
                      width: "5%",
                      height: "44%",
                    },
                    ".MuiSlider-rail": { background: "black" },
                    "	.MuiSlider-mark": { background: "white" },
                    "	.MuiSlider-markActive": { background: "black" },
                  }}
                />
              </Box>
            </Grid>

            <Grid item>
              <CustomButton
                variant="contained"
                color="warning"
                text="SUBMIT A TICKET"
                onClickFunc={handleSubmitForm}
                sx={{ fontFamily: "Poppins" }}
              />
              <CustomButton
                variant="contained"
                color="warning"
                text="VIEW HISTORY"
                onClickFunc={() => setViewHistory(true)}
                sx={{ fontFamily: "Poppins", ml: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
