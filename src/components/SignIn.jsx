import React, { useState, useRef } from "react";
import { Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthLogic";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { authErrorToTitleCase } from "../helpers";
import "../css/LoginPage.css";
import { googleauth, gitauth } from "../providers/FirebaseProvider";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";  
import {
  CssVarsProvider,
  IconButton,
  Tooltip,
  Typography,
  Alert,
  Box,
  Button,
  Modal,
  ModalDialog,
} from "@mui/joy";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import { OpenInNew } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportIcon from "@mui/icons-material/Report";

export default function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const emailVerifi = useRef();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  
  const auth = getAuth();

  function ResetPassword(userEmail) {
    setResetLoading(true);
    return sendPasswordResetEmail(auth, userEmail.current.value)
      .then(() => {
        setResetSuccess(
          "המייל נשלח בהצחלה, אנא בדוק את תיבת הדואר שלך ותעקוב אחרי ההוראות"
        );
        setResetError(null);
      })
      .catch((error) => {
        setResetError(authErrorToTitleCase(error.code));
        setResetSuccess(null);
      })
      .finally(() => setResetLoading(false));
  }
  function closePanel() {
    setShowPanel(false);
    setResetSuccess(null);
    setResetError(null);
  }
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    login(emailRef?.current.value, passRef?.current.value)
      .then(() => {
        setSuccess("כניסה מוצלחת");
        localStorage.setItem("firstTime", "true");
      })
      .catch(({ code }) =>
        setError(authErrorToTitleCase(code) || "Unknown login error")
      )
      .finally(() => setLoading(false));
  };

  const handleSubmitButtonResetButton = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="shadow d-flex">
      <CssVarsProvider />
      <Card.Body className="m-4">
        <Typography level="h2" className="text-center mb-4">
          כניסה
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
                  !הצלחה
                </Typography>
              </div>
            </Alert>
          </Box>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3" dir="rtl">
            <Form.Label>כתובת מייל</Form.Label>
            <Form.Control type="email" required ref={emailRef} />
          </Form.Group>

          <Form.Group id="password" dir="rtl">
            <Form.Label>סיסמא</Form.Label>

            <div className="d-flex align-items-center">
              <Form.Control
                type={isHidden ? "password" : "text"}
                required
                ref={passRef}
              />

              <IconButton
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

          {loading ? (
            <Button
              color="success"
              variant="soft"
              loading
              type="submit"
              className="w-100 mt-3"
            >
              <span className="me-2">להיכנס</span>
            </Button>
          ) : (
            <Button
              startDecorator={<LoginIcon />}
              color="success"
              variant="soft"
              type="submit"
              className="w-100 mt-4"
            >
              <span className="me-2">להיכנס</span>
            </Button>
          )}
        </Form>
        <div className="d-flex justify-content-center mt-4">
          <Button
            color="danger"
            variant="soft"
            onClick={googleauth}
            className="w-75"
          >
            <GoogleIcon className="me-1" />
            <span style={{ fontWeight: "700" }} className="me-1">
              Google
            </span>{" "}
            לכניסה עם
          </Button>
        </div>
        <div className="d-flex justify-content-center mt-2  ">
          <Button
            color="neutral"
            variant="soft"
            onClick={gitauth}
            className="w-75"
          >
            <GitHubIcon className="me-1" />
            <span style={{ fontWeight: "700" }} className="me-1">
              GitHub
            </span>{" "}
            לכניסה עם
          </Button>
        </div>
      </Card.Body>
      <div className="mb-2 d-flex justify-content-center">
        <Button
          size="sm"
          startDecorator={<OpenInNew />}
          variant="soft"
          className="me-2"
          onClick={() => {
            setShowPanel(true);
          }}
        >
          שחזר כאן
        </Button>

        <span>?שכחת סיסמא</span>
      </div>
      <div className="mb-5 d-flex justify-content-center mt-1">
        <Button
          size="sm"
          startDecorator={<OpenInNew />}
          variant="soft"
          className="me-3"
          onClick={() => navigate("/register")}
        >
          הירשם כאן
        </Button>
        <span>?אין משתמש</span>
      </div>

      <Modal
        open={showPanel}
        onClose={() => closePanel()}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
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
          {/* <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          /> */}
          <Typography level="h3" style={{ color: "white" }}>
            שחזור סיסמא
          </Typography>
          <EmailIcon className="me-1" />
          הכנס את הכתובת מייל שלך ונשלח לך הודעה עם הוראות
          <Form onSubmit={handleSubmitButtonResetButton} className="mt-2">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <Typography level="h5" style={{ color: "white" }}>
                  :כתובת מייל
                </Typography>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="כתובת מייל"
                ref={emailVerifi}
              />
            </Form.Group>
          </Form>
          {resetSuccess && (
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
                  <Typography fontWeight="lg">!הצלחה</Typography>
                  <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                    {resetSuccess}
                  </Typography>
                </div>
              </Alert>
            </Box>
          )}
          {resetError && (
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
                  <Typography
                    fontSize="sm"
                    sx={{ opacity: 0.8, color: "white" }}
                  >
                    {resetError}
                  </Typography>
                </div>
              </Alert>
            </Box>
          )}
          {resetLoading ? (
            <Button
              startDecorator={<KeyboardArrowUpIcon />}
              variant="outlined"
              loading
              onClick={() => ResetPassword(emailVerifi)}
              className="d-flex justify-content-end mb-1"
            >
              הגשה
            </Button>
          ) : (
            <Button
              className="d-flex justify-content-end mb-1"
              startDecorator={<KeyboardArrowUpIcon />}
              variant="outlined"
              onClick={() => ResetPassword(emailVerifi)}
            >
              הגש
            </Button>
          )}
        </ModalDialog>
      </Modal>
    </Card>
  );
}
