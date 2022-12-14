import React, { useRef, useState } from "react";
import { Form, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthLogic";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../providers/EmailProvider";
import {
  Button,
  CssVarsProvider,
  IconButton,
  Tooltip,
  Typography,
  Divider,
} from "@mui/joy";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Alert from "@mui/joy/Alert";
import ReportIcon from "@mui/icons-material/Report";
import Box from "@mui/joy/Box";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../assets/logo.gif";
import { Slide, Fade } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const passFirmRef = useRef();
  const formValue = useRef();
  const codeToCheck = useRef();
  const gifAnimCont = useRef();
  const captcharef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConf, setIsHiddenConf] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(null);
  const [gifAnim, setgifAnim] = useState(false);
  const [captchaFinished, setcaptchaFinished] = useState(true);

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const sitekey = "6LdtZQwjAAAAAKNmmvSfw7SdiiiMMeq3Ls4q7_zn";
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  function generateCode(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  function handleSubmitCode(e) {
    e.preventDefault();
  }
  function SubmitCode() {
    if (
      " " + codeToCheck.current.value ===
      document.getElementById("message").value
    ) {
      setCodeError(null);
      setCodeSuccess("תהליך אימות עבר בהצחלה");
      setTimeout(() => {
        setShowPanel(false);
        setLoading(true);
        signUp(
          emailRef.current.value,
          passRef.current.value,
          setError,
          setSuccess,
          setLoading
        );
        setCodeSuccess(null);
        setCodeError(null);
      }, 2000);
    } else {
      setCodeError("הקוד שגוי, נסה שוב");
      setCodeSuccess(null);
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailRef?.current.value?.length)
      return setError("אנא אכנס מייל לגיטימי");

    if (passRef.current.value !== passFirmRef.current.value) {
      return setError("!הסיסמאות לא זהות");
    }

    if (passRef.current.value.length < 6) {
      return setError("!סיסמא צריכה להכיל 6 תווים לפחות");
    }
    if (!strongRegex.test(passRef.current.value)) {
      return setError(
        "שם לב: הסיסמא צריכה להכיל תווים מיוחדים, מספרים, ואותיות גדולות"
      );
    }
    if (!captcharef.current.getValue()) {
      setcaptchaFinished(false);
      return setError("לא עברת את תהליך הCAPTCHA!");
    }
    document.getElementById("user_email").value = emailRef.current.value;
    document.getElementById("message").value = generateCode(7).toUpperCase();

    sendEmail(formValue.current);
    setError("");
    setShowPanel(true);
  }

  return (
    <Card
      style={{
        border: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 10,
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
      }}
    >
      <CssVarsProvider></CssVarsProvider>
      <Card.Body className="mx-4 mt-3">
        <Form ref={formValue} style={{ display: "none" }}>
          <label>Name</label>
          <input type="text" name="user_name" id="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" id="user_email" />
          <label>Message</label>
          <textarea name="message" id="message" />
        </Form>

        <Typography
          level="h2"
          sx={{
            textAlign: "end",
            mb: 2.5,
            fontFamily: "Noto Sans Hebrew",
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          הרשמה
        </Typography>

        {error && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <Alert
              sx={{ alignItems: "flex-start" }}
              startDecorator={
                <ReportIcon sx={{ mt: "7px", mx: "4px", fontSize: "35px" }} />
              }
              variant="solid"
              color="danger"
            >
              <Box>
                <Typography fontWeight="lg" mt={0.25} sx={{ color: "white" }}>
                  !שגיאה
                </Typography>
                <Typography
                  dir="rtl"
                  fontSize="sm"
                  sx={{ opacity: 0.8, color: "white" }}
                >
                  {error}
                </Typography>
              </Box>
            </Alert>
          </Box>
        )}
        {success && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: "column",
              borderRadius: 4,
              mb: 3,
            }}
          >
            <Alert
              sx={{ alignItems: "flex-start" }}
              startDecorator={
                <CheckIcon sx={{ mt: "7px", mx: "4px", fontSize: "30px" }} />
              }
              variant="solid"
              color="success"
            >
              <Box>
                <Typography fontWeight="lg" mt={0.25} sx={{ color: "white" }}>
                  !הצחלה
                </Typography>
              </Box>
            </Alert>
          </Box>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18, fontFamily: "Noto Sans Hebrew" }}>
                כתובת מייל{" "}
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Noto Sans Hebrew",
                }}
              >
                מייל זה ישמש אותך לתמיד ללא אפשרות לשנותו
              </Typography>
            </Form.Label>
            <Form.Control
              type="email"
              required
              ref={emailRef}
              name="user_email"
              style={{
                borderRadius: 4,
                borderColor: error && "red",
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Form.Group>
          <Form.Group id="password" className="mb-3" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18, fontFamily: "Noto Sans Hebrew" }}>
                סיסמא{" "}
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Noto Sans Hebrew",
                }}
              >
                סיסמא לבחירתך, נא שים לב שהסיסמא חייבת להיות חזקה
              </Typography>
            </Form.Label>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type={isHidden ? "password" : "text"}
                required
                ref={passRef}
                style={{
                  borderRadius: 4,
                  borderColor: error && "red",
                  transition: "all 0.2s ease-in-out",
                }}
              />

              <IconButton
                color="primary"
                variant="plain"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHidden(!isHidden);
                }}
              >
                <Tooltip title={isHidden ? "הראה" : "החבא"} variant="solid">
                  {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Tooltip>
              </IconButton>
            </Box>
          </Form.Group>
          <Form.Group id="pass-firm" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18, fontFamily: "Noto Sans Hebrew" }}>
                אישור סיסמא{" "}
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Noto Sans Hebrew",
                }}
              >
                סיסמא שהוקלדה לפני
              </Typography>
            </Form.Label>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type={isHiddenConf ? "password" : "text"}
                required
                ref={passFirmRef}
                style={{
                  borderRadius: 4,
                  borderColor: error && "red",
                  transition: "all 0.2s ease-in-out",
                }}
              />
              <IconButton
                variant="plain"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHiddenConf(!isHiddenConf);
                }}
              >
                <Tooltip title={isHiddenConf ? "הראה" : "החבא"} variant="solid">
                  {isHiddenConf ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Tooltip>
              </IconButton>
            </Box>
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <ReCAPTCHA
                ref={captcharef}
                hl={("en", "iw")}
                sitekey={sitekey}
                style={{
                  width: "380px",
                  display: captchaFinished ? "none" : "block",
                }}
              />
            </Box>
          </Form.Group>

          {loading ? (
            <Button
              color="success"
              variant="outlined"
              type="submit"
              loading
              sx={{ border: 0, width: 380, mt: 4 }}
            />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                ref={gifAnimCont}
                color="success"
                startDecorator={<HowToRegRoundedIcon />}
                variant="outlined"
                type="submit"
                className="buttAnim"
                sx={{
                  border: 0,

                  width: 380,
                  "@media screen and (max-width: 90em)": {
                    width: 330,
                  },
                }}
                onMouseEnter={() => {
                  setgifAnim(true);
                }}
                onMouseLeave={() => {
                  setgifAnim(false);
                }}
              >
                {gifAnim && (
                  <Slide
                    direction="right"
                    in={true}
                    container={gifAnimCont.current}
                  >
                    <Box sx={{ mr: 1 }}>
                      <img src={logo} width="30" height="30" alt="" id="logo" />
                    </Box>
                  </Slide>
                )}
                <Typography sx={{ mr: 2 }}>להירשם</Typography>
              </Button>
            </Box>
          )}
        </Form>
      </Card.Body>
      <Divider
        sx={{
          color: "black",
          px: 5,
          mb: 2,
          fontFamily: "Noto Sans Hebrew",
          fontSize: 20,
        }}
      >
        או
      </Divider>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => navigate("/login")}
          startDecorator={<LoginIcon />}
          className="secbuttAnim"
          sx={{
            border: 0,
            "@media screen and (max-width: 90em)": {
              width: 330,
              borderRadius: 4,
            },
            borderRadius: 4,
            width: 380,
          }}
        >
          כניסה עם משתמש קיים
        </Button>
      </Box>
      <Modal
        open={showPanel}
        onClose={() => {
          setShowPanel(false);
          setCodeError(null);
          setCodeSuccess(null);
        }}
      >
        <Fade in={true}>
          <ModalDialog
            variant="outlined"
            sx={{
              color: "#1c1c1c",
              outlineColor: "white",
              p: 5,
              boxShadow: "lg",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 10,
            }}
          >
            <Typography level="h3" dir="rtl">
              אימות מייל
            </Typography>

            {emailRef?.current?.value && (
              <Typography dir="rtl">
                שלחנו קוד אל {emailRef?.current?.value}, אנא בדוק את תיבת הדואר
                בכדי להמשיך באימות דרך ההוראות
                <EmailIcon />
              </Typography>
            )}

            <Form onSubmit={handleSubmitCode}>
              <Form.Group
                className="mb-3 mt-3"
                controlId="formBasicEmail"
                dir="rtl"
              >
                <Form.Label>
                  <Typography>:הכנס את הקוד</Typography>
                </Form.Label>
                <Form.Control ref={codeToCheck} />
              </Form.Group>
            </Form>
            {codeError && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  flexDirection: "column",
                  mb: 3,
                }}
              >
                <Alert
                  sx={{ alignItems: "flex-start" }}
                  startDecorator={
                    <ReportIcon
                      sx={{ mt: "7px", mx: "4px", fontSize: "35px" }}
                    />
                  }
                  variant="solid"
                  color="danger"
                >
                  <Box>
                    <Typography
                      fontWeight="lg"
                      mt={0.25}
                      sx={{ color: "white" }}
                    >
                      שגיאה
                    </Typography>
                    <Typography
                      fontSize="sm"
                      sx={{ opacity: 0.8, color: "white" }}
                    >
                      {codeError}
                    </Typography>
                  </Box>
                </Alert>
              </Box>
            )}
            {codeSuccess && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  flexDirection: "column",
                  mb: 3,
                }}
              >
                <Alert
                  sx={{ alignItems: "flex-start" }}
                  startDecorator={
                    <CheckIcon sx={{ mx: "4px", fontSize: "25px" }} />
                  }
                  variant="soft"
                  color="success"
                >
                  <Box>
                    <Typography fontWeight="lg">!הצחלה</Typography>
                    <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                      {codeSuccess}
                    </Typography>
                  </Box>
                </Alert>
              </Box>
            )}
            <Button
              sx={{
                width: "100%",
              }}
              startDecorator={<ArrowUpwardIcon />}
              variant="soft"
              color="info"
              onClick={SubmitCode}
            >
              <Typography
                sx={{
                  fontFamily: "Noto Sans Hebrew",
                  fontSize: 15,
                  mr: 3,
                }}
              >
                הגשה
              </Typography>
            </Button>
          </ModalDialog>
        </Fade>
      </Modal>
    </Card>
  );
}
