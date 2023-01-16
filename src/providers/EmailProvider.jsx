// import emailjs from "@emailjs/browser";

// const serviceID = "service_6fg6l9i";
// const tempID = "template_efhjt64";
// const pKey = "MtStPxdqA9vC0UXk_";

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

  // emailjs.sendForm(serviceID, tempID, formValue, pKey).then(
  //   () => {},
  //   () => {}
  // );
};
