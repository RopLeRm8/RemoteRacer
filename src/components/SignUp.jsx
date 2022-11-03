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

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const passFirmRef = useRef();
  const formValue = useRef();
  const codeToCheck = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConf, setIsHiddenConf] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(null);

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
    document.getElementById("user_email").value = emailRef.current.value;
    document.getElementById("message").value = generateCode(7).toUpperCase();

    sendEmail(formValue.current);
    setError("");
    setShowPanel(true);
  }

  return (
    <Card className="" style={{ border: "0px" }}>
      <CssVarsProvider></CssVarsProvider>
      <Card.Body className="m-4">
        <Form ref={formValue} style={{ display: "none" }}>
          <label>Name</label>
          <input type="text" name="user_name" id="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" id="user_email" />
          <label>Message</label>
          <textarea name="message" id="message" />
        </Form>

        <Typography level="h2" className="text-end mb-4">
          הרשמה
        </Typography>

        {error && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              flexDirection: "column",
            }}
            className="mb-3"
          >
            <Alert
              sx={{ alignItems: "flex-start" }}
              startDecorator={
                <ReportIcon sx={{ mt: "7px", mx: "4px", fontSize: "35px" }} />
              }
              variant="solid"
              color="danger"
            >
              <div>
                <Typography fontWeight="lg" mt={0.25} sx={{ color: "white" }}>
                  !שגיאה
                </Typography>
                <Typography fontSize="sm" sx={{ opacity: 0.8, color: "white" }}>
                  {error}
                </Typography>
              </div>
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
            }}
            className="mb-3"
          >
            <Alert
              sx={{ alignItems: "flex-start" }}
              startDecorator={
                <CheckIcon sx={{ mt: "7px", mx: "4px", fontSize: "30px" }} />
              }
              variant="solid"
              color="success"
            >
              <div>
                <Typography fontWeight="lg" mt={0.25} sx={{ color: "white" }}>
                  !הצחלה
                </Typography>
              </div>
            </Alert>
          </Box>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18 }}>כתובת מייל </Typography>
              <Typography sx={{ opacity: "80%", fontSize: 13 }}>
                מייל זה ישמש אותך לתמיד ללא אפשרות לשנותו
              </Typography>
            </Form.Label>
            <Form.Control
              type="email"
              required
              ref={emailRef}
              name="user_email"
              style={{ borderRadius: 4 }}
            />
          </Form.Group>

          <Form.Group id="password" className="mb-3" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18 }}>סיסמא </Typography>
              <Typography sx={{ opacity: "80%", fontSize: 13 }}>
                סיסמא לבחירתך, נא שים לב שהסיסמא חייבת להיות חזקה
              </Typography>
            </Form.Label>

            <div className="d-flex align-items-center">
              <Form.Control
                type={isHidden ? "password" : "text"}
                required
                ref={passRef}
                style={{ borderRadius: 4 }}
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
            </div>
          </Form.Group>

          <Form.Group id="pass-firm" dir="rtl">
            <Form.Label>
              <Typography sx={{ fontSize: 18 }}>אישור סיסמא </Typography>
              <Typography sx={{ opacity: "80%", fontSize: 13 }}>
                סיסמא שהוקלדה לפני
              </Typography>
            </Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={isHiddenConf ? "password" : "text"}
                required
                ref={passFirmRef}
                style={{ borderRadius: 4 }}
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
            </div>
          </Form.Group>

          {loading ? (
            <Button
              color="success"
              variant="outlined"
              type="submit"
              loading
              className="w-100 mt-3"
              sx={{ borderRadius: 4 }}
            >
              <span className="me-2">להירשם</span>
            </Button>
          ) : (
            <Button
              color="success"
              startDecorator={<HowToRegRoundedIcon />}
              variant="outlined"
              type="submit"
              className="w-100 mt-4"
              sx={{ borderRadius: 4 }}
            >
              <span className="me-2">להירשם</span>
            </Button>
          )}
        </Form>
      </Card.Body>
      <Divider
        sx={{
          color: "black",
          px: 5,
          mb: 5,
          fontFamily: "Noto Sans Hebrew",
          fontSize: 20,
        }}
      >
        או
      </Divider>
      <div className="mb-4 d-flex justify-content-center">
        <Button
          color="warning"
          variant="outlined"
          className="w-100 mx-5"
          onClick={() => navigate("/login")}
          startDecorator={<LoginIcon />}
          sx={{ borderRadius: 4 }}
        >
          כניסה עם משתמש קיים
        </Button>
      </div>
      <Modal
        open={showPanel}
        onClose={() => {
          setShowPanel(false);
          setCodeError(null);
          setCodeSuccess(null);
        }}
      >
        <ModalDialog
          className="alertin"
          variant="soft"
          sx={{
            bgcolor: "#1c1c1c",
            color: "white",
            outlineColor: "green",
            maxWidth: 500,
            borderRadius: "md",
            p: 5,
            boxShadow: "lg",
          }}
        >
          <Typography level="h3" style={{ color: "white" }} dir="rtl">
            אימות מייל
          </Typography>

          {emailRef?.current?.value && (
            <span>
              We've sent the code to the {emailRef?.current?.value}, please
              enter the code you've received {""}
              <EmailIcon />
            </span>
          )}

          <Form onSubmit={handleSubmitCode}>
            <Form.Group
              className="mb-3 mt-3"
              controlId="formBasicEmail"
              dir="rtl"
            >
              <Form.Label>
                <h5>:הכנס את הקוד</h5>
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
              }}
              className="mb-3"
            >
              <Alert
                sx={{ alignItems: "flex-start" }}
                startDecorator={
                  <ReportIcon sx={{ mt: "7px", mx: "4px", fontSize: "35px" }} />
                }
                variant="solid"
                color="danger"
              >
                <div>
                  <Typography fontWeight="lg" mt={0.25} sx={{ color: "white" }}>
                    שגיאה
                  </Typography>
                  <Typography
                    fontSize="sm"
                    sx={{ opacity: 0.8, color: "white" }}
                  >
                    {codeError}
                  </Typography>
                </div>
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
              }}
              className="mb-3"
            >
              <Alert
                sx={{ alignItems: "flex-start" }}
                startDecorator={
                  <CheckIcon sx={{ mx: "4px", fontSize: "25px" }} />
                }
                variant="soft"
                color="success"
              >
                <div>
                  <Typography fontWeight="lg">!הצחלה</Typography>
                  <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                    {codeSuccess}
                  </Typography>
                </div>
              </Alert>
            </Box>
          )}
          <Button variant="outlined" onClick={SubmitCode}>
            הגשה
          </Button>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
