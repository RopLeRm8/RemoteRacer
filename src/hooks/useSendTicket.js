import emailjs from "@emailjs/browser";
import { getAuth } from "@firebase/auth";
import { get, ref, update } from "firebase/database";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../providers/FirebaseProvider";
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

  const [user] = useAuthState(getAuth());
  const userRef = ref(db, `users/${user?.uid}/data`);

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
        get(userRef)
          .then((snap) => {
            const currentDate = new Date();

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();

            const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            const ticketHistory = snap?.val().ticketHistory;
            const updatedData = {
              ...snap?.val(),
              ticketHistory: [
                ...(ticketHistory ?? []),
                {
                  ["subject"]: emailDataRef.current.subject,
                  ["issue"]: emailDataRef.current.issue,
                  ["severity"]: emailDataRef.current.severLevel,
                  ["time"]: dateString,
                  ["type"]: emailDataRef.current.issueType,
                },
              ],
            };
            update(userRef, updatedData)
              .then(() => {
                notify("Ticket added to ticket history", { variant: "info" });
              })
              .catch(() => notify("Couldn't add a ticket to ticket history"));
          })
          .catch(() => {
            notify("Failed to connect to database", { variant: "error" });
          });
      })
      .catch((error) => {
        notify(error, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendEmail, loading };
}
