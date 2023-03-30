import { Box, CssVarsProvider, Typography } from "@mui/joy";

import { useContext, useState } from "react";
import LogoMaker from "../features/LogoMaker";
import { useNotification } from "../hooks/useNotification";
import { iconsContext } from "../pages/ContactUs";
import ContactInfo from "./ContactInfo";
import TicketHistory from "./TicketHistory";
export default function ContactUsForm({ setFinished, setFormData }) {
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState(0);
  const [severLevel, setSeverLevel] = useState("Not critical");
  const [issueDesc, setIssueDesc] = useState("");
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
        <TicketHistory setViewHistory={setViewHistory} />
      ) : (
        <ContactInfo
          subject={subject}
          setSubject={setSubject}
          issueDesc={issueDesc}
          handleSubmitForm={handleSubmitForm}
          setViewHistory={setViewHistory}
          eNums={eNums}
          setIssueType={setIssueType}
          setSeverLevel={setSeverLevel}
          setIssueDesc={setIssueDesc}
        />
      )}
    </>
  );
}
