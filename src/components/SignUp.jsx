import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import LoginIcon from "@mui/icons-material/Login";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Chip,
  CssVarsProvider,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Fade, Slide } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SignUpLoginWindow/logo.gif";
import { useAuth } from "../contexts/AuthLogic";
import { sendEmail } from "../providers/EmailProvider";

export default function SignUp({ focus }) {
  const emailRef = useRef();
  const passRef = useRef();
  const passFirmRef = useRef();
  const codeToCheck = useRef();
  const gifAnimCont = useRef();
  const captcharef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmail, setloadingEmail] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConf, setIsHiddenConf] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(null);
  const [gifAnim, setgifAnim] = useState(false);
  const [captchaFinished, setcaptchaFinished] = useState(true);
  const [message, setMessage] = useState("");
  const [mailError, setMailError] = useState("");

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

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
    console.log(codeToCheck.current.value);
    console.log(message);
    if (" " + codeToCheck.current.value === message) {
      setCodeError(null);
      setCodeSuccess("Successfully confirmed email");
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
      setCodeError("Wrong code Entered");
      setCodeSuccess(null);
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailRef?.current.value?.length)
      return setError("Please enter valid email");

    if (passRef.current.value !== passFirmRef.current.value) {
      return setError("Password don't match");
    }

    if (passRef.current.value.length < 6) {
      return setError("Password must contain atleast 6 characters");
    }
    if (!strongRegex.test(passRef.current.value)) {
      return setError(
        "Password must contain special symbols, numbers, and capital letters"
      );
    }
    if (!captcharef.current.getValue()) {
      setcaptchaFinished(false);
      return setError("You did not pass the CAPTCHA");
    }

    (async function sendEmailWithMessage() {
      const message = await generateCode(7).toUpperCase();
      setMessage(message);
      setloadingEmail(true);
      sendEmail(emailRef.current.value, message, setloadingEmail, setMailError);
    })();
    setError("");
    setShowPanel(true);
  }
  useEffect(() => {
    emailRef.current.focus();
  }, [focus]);
  useEffect(() => {
    if (!mailError) return;
    enqueueSnackbar(mailError, {
      variant: "error",
    });
    setTimeout(() => {
      setMailError("");
    }, 5000);
  }, [mailError]);
  return (
    <Card
      style={{
        border: 0,
        backgroundColor: "rgba(255,255,255)",
        borderRadius: 10,
        boxShadow: "0px 0px 100px 5px rgba(255,228,0,0.5)",
      }}
    >
      <CssVarsProvider />
      <Card.Body className="mx-4 mt-3">
        <Typography
          level="h2"
          sx={{
            textAlign: "center",
            mb: 2.5,
            fontFamily: "Montserrat",
            fontWeight: 300,
          }}
        >
          Sign Up
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
                  Error
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
                  Success
                </Typography>
              </Box>
            </Alert>
          </Box>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>
              <Typography
                sx={{ fontSize: 18, fontFamily: "Montserrat", fontWeight: 600 }}
              >
                Email Address
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Montserrat",
                }}
              >
                The email that you registered with
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
          <Form.Group id="password" className="mb-3">
            <Form.Label>
              <Typography
                sx={{ fontSize: 18, fontFamily: "Montserrat", fontWeight: 600 }}
              >
                Password
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Montserrat",
                }}
              >
                Strong password that will secure your account
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
                color="warning"
                variant="plain"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHidden(!isHidden);
                }}
                sx={{ ml: 1 }}
              >
                <Tooltip title={isHidden ? "Show" : "Hide"} variant="solid">
                  {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Tooltip>
              </IconButton>
            </Box>
          </Form.Group>
          <Form.Group id="pass-firm">
            <Form.Label>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                }}
              >
                Re-Enter Password
              </Typography>
              <Typography
                sx={{
                  opacity: "80%",
                  fontSize: 13,
                  fontFamily: "Montserrat",
                }}
              >
                Type it again!
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
                color="warning"
                variant="plain"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHiddenConf(!isHiddenConf);
                }}
                sx={{ ml: 1 }}
              >
                <Tooltip title={isHiddenConf ? "Show" : "Hide"} variant="solid">
                  {isHiddenConf ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Tooltip>
              </IconButton>
            </Box>
            <Box sx={{ my: 3 }}>
              <ReCAPTCHA
                ref={captcharef}
                hl={"en"}
                sitekey={sitekey}
                style={{
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
                <Typography sx={{ mr: 2 }}>Continue to Sign Up</Typography>
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
          fontFamily: "Montserrat",
          fontSize: 20,
        }}
      >
        OR
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
          Sign In With Existing Account
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
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius: 10,
            }}
          >
            <Typography level="h3" fontFamily="Montserrat" fontWeight={700}>
              Email Verification
            </Typography>

            {emailRef?.current?.value && (
              <Typography fontFamily="Montserrat">
                We sent a verification code to {emailRef?.current?.value},
                please check your email and enter the code here
                <EmailIcon />
              </Typography>
            )}

            <Form onSubmit={handleSubmitCode}>
              <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                <Form.Label>
                  <Typography>Code you received:</Typography>
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
                      Error
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
                    <Typography fontWeight="lg">Success</Typography>
                    <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                      {codeSuccess}
                    </Typography>
                  </Box>
                </Alert>
              </Box>
            )}
            {loadingEmail ? (
              <Button
                sx={{
                  width: "100%",
                }}
                startDecorator={<ArrowUpwardIcon />}
                variant="soft"
                color="warning"
                onClick={SubmitCode}
                loading
              />
            ) : (
              <Button
                sx={{
                  width: "100%",
                }}
                startDecorator={<ArrowUpwardIcon />}
                variant="soft"
                color="warning"
                onClick={SubmitCode}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: 15,
                    mr: 3,
                  }}
                >
                  Submit for confirmation
                </Typography>
              </Button>
            )}
            {mailError ? (
              <Chip
                variant="soft"
                color="danger"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mt: 2,
                }}
                size="lg"
              >
                {mailError}
              </Chip>
            ) : null}
          </ModalDialog>
        </Fade>
      </Modal>
    </Card>
  );
}
