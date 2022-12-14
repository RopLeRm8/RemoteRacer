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
  Divider,
} from "@mui/joy";
import EmailIcon from "@mui/icons-material/Email";
import CheckIcon from "@mui/icons-material/Check";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockResetIcon from "@mui/icons-material/LockReset";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ReportIcon from "@mui/icons-material/Report";
import logo from "../assets/logo.gif";
import { Fade, Slide } from "@mui/material";

export default function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const emailVerifi = useRef();
  const gifAnimCont = useRef();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [gifAnim, setgifAnim] = useState(false);

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
      .then((user) => {
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
    <Card
      style={{
        border: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 10,
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
      }}
    >
      <CssVarsProvider />
      <Card.Body className="mx-4 mt-3">
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
          כניסה
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
                <Typography fontSize="sm" sx={{ opacity: 0.8, color: "white" }}>
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
                  !הצלחה
                </Typography>
              </Box>
            </Alert>
          </Box>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3" dir="rtl">
            <Form.Label>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Noto Sans Hebrew",
                }}
              >
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
              style={{ borderRadius: 4, borderColor: error && "red" }}
            />
          </Form.Group>

          <Form.Group id="password" dir="rtl">
            <Form.Label>
              {" "}
              <Form.Label>
                <Typography
                  sx={{ fontSize: 18, fontFamily: "Noto Sans Hebrew" }}
                >
                  סיסמא
                </Typography>
                <Typography
                  sx={{
                    opacity: "80%",
                    fontSize: 13,
                    fontFamily: "Noto Sans Hebrew",
                  }}
                >
                  סיסמא אשר שייכת למשתמש שקשור למייל מלמעלה
                </Typography>
              </Form.Label>
            </Form.Label>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type={isHidden ? "password" : "text"}
                required
                ref={passRef}
                style={{ borderRadius: 4, borderColor: error && "red" }}
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
            </Box>
          </Form.Group>

          {loading ? (
            <Button
              color="success"
              variant="outlined"
              loading
              type="submit"
              sx={{ width: 380, mt: 4, borderRadius: 4 }}
            />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                ref={gifAnimCont}
                startDecorator={<LoginIcon />}
                color="success"
                variant="outlined"
                type="submit"
                className="buttAnim"
                sx={{
                  border: 0,
                  width: 380,
                  mt: 4,
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
                    <Box sx={{ mr: 0.7 }}>
                      <img src={logo} width="30" height="30" alt="" id="logo" />
                    </Box>
                  </Slide>
                )}
                <Typography
                  sx={{
                    mr: 2,
                  }}
                >
                  להיכנס
                </Typography>
              </Button>
            </Box>
          )}
        </Form>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Divider
            sx={{
              color: "black",
              width: 300,
              fontFamily: "Noto Sans Hebrew",
              fontSize: 20,
            }}
          >
            <Button
              color="danger"
              variant="outlined"
              onClick={googleauth}
              className="googlebuttAnim"
              sx={{ border: 0 }}
            >
              <GoogleIcon sx={{ mr: 1 }} />
              <Typography sx={{ fontWeight: "500", mr: 1 }}>
                Google
              </Typography>{" "}
              לכניסה עם
            </Button>
          </Divider>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Divider
            sx={{
              color: "black",
              width: 300,
              fontFamily: "Noto Sans Hebrew",
              fontSize: 20,
            }}
          >
            <Button
              color="neutral"
              variant="outlined"
              onClick={gitauth}
              className="gitbuttAnim"
              sx={{ border: 0 }}
            >
              <GitHubIcon sx={{ mr: 1 }} />
              <Typography sx={{ fontWeight: "500", mr: 1 }}>
                GitHub
              </Typography>{" "}
              לכניסה עם
            </Button>
          </Divider>
        </Box>
      </Card.Body>
      <Divider
        sx={{
          color: "black",
          px: 5,
          mb: 3,
          fontFamily: "Noto Sans Hebrew",
          fontSize: 20,
        }}
      >
        או
      </Divider>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Button
          size="sm"
          startDecorator={<LockResetIcon />}
          variant="outlined"
          color="warning"
          className="secbuttAnim"
          sx={{
            border: 0,
            width: 370,
            height: 39,
            mb: 1,
            "@media screen and (max-width: 90em)": {
              width: 330,
            },
          }}
          onClick={() => {
            setShowPanel(true);
          }}
        >
          תהליך שחזור סיסמא
        </Button>
      </Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <Button
          size="sm"
          startDecorator={<HowToRegIcon />}
          variant="outlined"
          color="warning"
          className="secbuttAnim"
          sx={{
            border: 0,
            width: 370,
            height: 38,
            mb: 1,
            "@media screen and (max-width: 90em)": {
              width: 330,
            },
          }}
          onClick={() => navigate("/register")}
        >
          הירשם כאן
        </Button>
      </Box>

      <Modal
        open={showPanel}
        onClose={() => closePanel()}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <Fade in={true}>
          <ModalDialog
            variant="outlined"
            size="lg"
            sx={{
              color: "#1c1c1c",
              outlineColor: "white",
              p: 5,
              boxShadow: "lg",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 10,
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
            <Typography level="h3" sx={{ mb: 1 }} dir="rtl">
              שחזור סיסמא
            </Typography>

            <Typography endDecorator={<EmailIcon />} dir="rtl">
              הכנס את הכתובת מייל שלך ונשלח לך הודעה עם הוראות
            </Typography>

            <Form onSubmit={handleSubmitButtonResetButton} className="mt-2">
              <Form.Group className="mb-3" controlId="formBasicEmail" dir="rtl">
                <Form.Label>
                  <Typography level="h5">כתובת מייל :</Typography>
                  <Typography sx={{ opacity: "80%" }}>
                    מייל שאליו ישלח קישור
                  </Typography>
                </Form.Label>
                <Form.Control
                  type="email"
                  ref={emailVerifi}
                  style={{ borderRadius: 4 }}
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
                  mb: 3,
                }}
              >
                <Alert
                  sx={{ alignItems: "flex-start" }}
                  startDecorator={
                    <CheckIcon sx={{ mx: "4px", fontSize: "25px" }} />
                  }
                  variant="solid"
                  color="success"
                >
                  <Box>
                    <Typography fontWeight="lg" sx={{ color: "white" }}>
                      !הצלחה
                    </Typography>
                    <Typography fontSize="sm" sx={{ color: "white" }}>
                      {resetSuccess}
                    </Typography>
                  </Box>
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
                      !שגיאה
                    </Typography>
                    <Typography fontSize="sm" sx={{ color: "white" }}>
                      {resetError}
                    </Typography>
                  </Box>
                </Alert>
              </Box>
            )}
            {resetLoading ? (
              <Button
                startDecorator={<ArrowUpwardIcon />}
                variant="solid"
                color="info"
                loading
                sx={{
                  width: "100%",
                }}
              />
            ) : (
              <Button
                sx={{
                  width: "100%",
                }}
                startDecorator={<ArrowUpwardIcon />}
                variant="soft"
                color="info"
                onClick={() => ResetPassword(emailVerifi)}
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
            )}
          </ModalDialog>
        </Fade>
      </Modal>
    </Card>
  );
}
