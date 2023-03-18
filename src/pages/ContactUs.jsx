import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { createContext, useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import ContactUsForm from "../components/ContactUsForm";
import "../css/Support.css";
import Navbar from "../layouts/NavBar";
const eNumSubject = {
  account_issues: "Account Issues",
  technical_issues: "Technical issues",
  question: "I have a question",
};
const eNumIcons = {
  account_issues: <PersonIcon sx={{ mr: 1 }} />,
  technical_issues: <BuildIcon sx={{ mr: 1 }} />,
  question: <QuestionMarkIcon sx={{ mr: 1 }} />,
};

export const iconsContext = createContext();
export default function ContactUs() {
  useEffect(() => {
    document.body.classList.add("addBackgroundSupport");
    return () => {
      document.body.classList.remove("addBackgroundSupport");
    };
  }, []);
  const [finished, setFinished] = useState(false);
  const [formData, setFormData] = useState({});
  return (
    <>
      <Navbar />
      <iconsContext.Provider
        value={{ eNumIcons: eNumIcons, eNumSubject: eNumSubject }}
      >
        <ContactUsForm setFinished={setFinished} setFormData={setFormData} />
        <ConfirmModal
          finished={finished}
          setFinished={setFinished}
          formData={formData}
        />
      </iconsContext.Provider>
    </>
  );
}
