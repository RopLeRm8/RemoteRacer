import { functions } from "./FirebaseProvider";
const sendVerificationEmail = functions.httpsCallable("sendVerification");
const sendSuccessEmail = functions.httpsCallable("sendSuccess");

export const sendEmail = (emailaddr, code, setloadingEmail, setMailError) => {
  sendVerificationEmail({ email: emailaddr, codemessage: code })
    .then((result) => {
      console.log(result.data);
      console.log(result.data === "ok");
    })
    .catch((err) => {
      console.log(err);
      setMailError("Too many requests, try again in 15 minutes");
    })
    .finally(() => {
      setloadingEmail(false);
    });
};

export const sendSuccess = (emailaddr) => {
  sendSuccessEmail({ email: emailaddr })
    .then(() => {
      console.log("ok");
    })
    .catch(() => {
      console.log("bad");
    });
};
