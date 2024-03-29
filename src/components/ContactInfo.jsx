import { Box, Grid, Radio, RadioGroup, Slider, Typography } from "@mui/joy";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../features/CustomButton";
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
export default function ContactInfo({
  subject,
  setSubject,
  issueDesc,
  handleSubmitForm,
  setViewHistory,
  eNums,
  setIssueType,
  setSeverLevel,
  setIssueDesc,
}) {
  const [fieldFocus, setFieldFocus] = useState(false);
  return (
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
                if (eNums.eNumSubject[e.target.value] !== "Technical issues") {
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
                fontFamily: "Poppins",
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
        <Grid item sx={{ mt: 3 }}>
          <Typography fontFamily="Inter"> Severity of the issue </Typography>
          <Box sx={{ width: "100%" }}>
            <Slider
              onChange={(_, nVal) =>
                setSeverLevel(
                  impLevel.find((level) => level.value === nVal).label,
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
                  impLevel.find((level) => level.value === nVal)?.label,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-evenly", sm: "start" },
            }}
          >
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
              text="TICKET HISTORY"
              onClickFunc={() => setViewHistory(true)}
              sx={{
                fontFamily: "Poppins",
                ml: { xs: 1, sm: 2 },
                background: "transparent",
                border: "2px solid black",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
