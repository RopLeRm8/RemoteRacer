import emailjs from "@emailjs/browser";

const serviceID = "service_6fg6l9i";
const tempID = "template_efhjt64";
const pKey = "MtStPxdqA9vC0UXk_";

export const sendEmail = (formValue) => {
  emailjs.sendForm(serviceID, tempID, formValue, pKey).then(
    () => {},
    () => {}
  );
};
