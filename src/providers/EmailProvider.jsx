export const sendEmail = (emailaddr, code, setloadingEmail, setMailError) => {
  fetch("http://localhost:6969/send-verification", {
    method: "POST",
    body: JSON.stringify({
      email: emailaddr,
      codemessage: code,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data.result === "ok"))
    .catch(() => setMailError("Too many requests, try again in 15 minutes"))
    .finally(() => {
      setloadingEmail(false);
    });
};
export const sendSuccessEmail = (emailaddr) => {
  fetch("http://localhost:6969/send-success", {
    method: "POST",
    body: JSON.stringify({
      email: emailaddr,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      console.log("ok");
    })
    .catch(() => {
      console.log("bad");
    });
};
