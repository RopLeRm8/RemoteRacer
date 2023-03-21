import CircleIcon from "@mui/icons-material/Circle";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { Box, Divider, Typography } from "@mui/joy";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent } from "@mui/material";
import { useContext, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/Support.css";
import { CustomButton } from "../features/CustomButton";
import useSendTicket from "../hooks/useSendTicket";
import { iconsContext } from "../pages/ContactUs";
const impLevelColors = {
  "Not critical": "rgb(24, 165, 88)",
  Important: "rgb(104, 195, 163)",
  "Almost critical": "rgb(255, 181, 46)",
  Critical: "rgb(255, 46, 46)",
};
const SITEKEY = process.env.REACT_APP_CAPTCHA_SITEKEY;
export default function ConfirmModal({ finished, setFinished, formData }) {
  const { sendEmail, loading } = useSendTicket();
  const captchaRef = useRef();
  const eNums = useContext(iconsContext);
  return (
    <Dialog open={finished}>
      <DialogContent
        sx={{
          minWidth: { xs: "90%", lg: "2%" },
          borderRadius: "4px",
          animation: "fadeIn 0.1s ease-out forwards",
          zIndex: 1300,
          wordBreak: "break-word",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "140%",
            textAlign: "center",
            mb: 2,
          }}
        >
          New Ticket
        </Typography>
        <Divider sx={{ mx: 0.5, py: 0.1, my: 1, backgroundColor: "black" }} />
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <Typography
            startDecorator={eNums.eNumIcons[formData?.subject]}
            sx={{ fontSize: "110%", fontWeight: 600, mr: 1 }}
          >
            Subject:
          </Typography>
          <Typography>{eNums.eNumSubject[formData?.subject]}</Typography>
        </Box>
        {formData?.issueType ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              startDecorator={<CircleIcon sx={{ mr: 1 }} />}
              sx={{ fontSize: "110%", fontWeight: 600, mr: 1 }}
            >
              Type:
            </Typography>
            <Typography>{formData?.issueType}</Typography>
          </Box>
        ) : null}
        <Typography
          startDecorator={<CrisisAlertIcon sx={{ color: "black", mr: 1 }} />}
          sx={{
            color: impLevelColors[formData?.severLevel],
            mt: 1.5,
            fontFamily: "Inter",
          }}
        >
          {formData?.severLevel}
        </Typography>
        <Typography
          sx={{
            my: 2.5,
            textAlign: "justify",
            wordWrap: "break-word",
            background: "black",
            color: "white",
            borderRadius: "2px",
            p: 1,
          }}
          startDecorator={<TextFieldsIcon sx={{ color: "orange" }} />}
        >
          {formData?.issue}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ReCAPTCHA hl={"en"} sitekey={SITEKEY} ref={captchaRef} />
        </Box>
        <Box sx={{ display: "flex" }}>
          {loading ? (
            <LoadingButton
              loading
              loadingPosition="end"
              variant="outlined"
              fullWidth
              sx={{ mr: 1 }}
            >
              Sending
            </LoadingButton>
          ) : (
            <CustomButton
              fullWidth
              variant="contained"
              text="Send"
              sx={{ mr: 1 }}
              onClickFunc={() => sendEmail(formData, eNums, captchaRef)}
            />
          )}

          <CustomButton
            fullWidth
            variant="contained"
            text="Go back"
            onClickFunc={() => setFinished(false)}
          >
            Go back
          </CustomButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
