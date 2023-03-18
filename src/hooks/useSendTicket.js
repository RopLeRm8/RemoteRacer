import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useNotification } from "./useNotification";
import useSetupMessage from "./useSetupMessage";

export default function useSendTicket() {
  const SERVICEID = process.env.REACT_APP_EMAILJS_SERVICEID;
  const TEMPID = process.env.REACT_APP_EMAILJS_TEMPID;
  const PUBLICKEYEMAILJS = process.env.REACT_APP_EMAILJS_PUBLICKEY;

  const updateMessage = useSetupMessage();
  const notify = useNotification();

  const [loading, setLoading] = useState(false);
  const emailDataRef = useRef(null);

  const sendEmail = (emailData, eNums, captchaRef) => {
    if (!captchaRef.current.getValue()) {
      notify("You didn't pass the captcha", { variant: "error" });
      return;
    }
    captchaRef.current.reset();
    setLoading(true);
    emailDataRef.current = { ...emailData };
    emailDataRef.current = updateMessage(emailDataRef.current, eNums);
    emailjs
      .send(SERVICEID, TEMPID, emailDataRef.current, PUBLICKEYEMAILJS)
      .then(() => {
        notify("Ticket sent successfully", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        notify(error, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendEmail, loading };
}
