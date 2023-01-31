import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import LoginIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Badge,
  Button,
  Card,
  Chip,
  CssVarsProvider,
  Divider,
  Grid,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@mui/joy";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Slide } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ReactInputVerificationCode from "react-input-verification-code";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SignUpLoginWindow/logo.gif";
import star from "../assets/SignUpLoginWindow/star.png";
import { useAuth } from "../contexts/AuthLogic";
import "../css/Signup.css";
import { sendEmail } from "../providers/EmailProvider";
export default function SignUp() {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setpassValue] = useState("");
  const [passfirmValue, setpassfirmValue] = useState("");
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
  const [codeValue, setcodeValue] = useState("");

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const characters = "0123456789";
  const sitekey = "6LdtZQwjAAAAAKNmmvSfw7SdiiiMMeq3Ls4q7_zn";
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  function generateCode(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  function SubmitCode() {
    if (" " + codeValue === message) {
      setCodeError(null);
      setCodeSuccess("Successfully confirmed email");
      setTimeout(() => {
        setShowPanel(false);
        setLoading(true);
        signUp(emailValue, passValue, setError, setSuccess, setLoading);
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

    if (emailValue.length < 1) return setError("Please enter valid email");

    if (!emailReg.test(emailValue)) return setError("Please enter valid email");

    if (passValue.length < 6) {
      return setError("Password must contain atleast 6 characters");
    }
    if (!strongRegex.test(passValue)) {
      return setError(
        "Password must contain special symbols, numbers, and capital letters"
      );
    }

    if (passValue !== passfirmValue) return setError("Password don't match");

    if (!captcharef.current.getValue()) {
      setcaptchaFinished(false);
      return setError("You did not pass the CAPTCHA");
    }

    (async function sendEmailWithMessage() {
      const message = await generateCode(7).toUpperCase();
      setMessage(message);
      setloadingEmail(true);
      sendEmail(emailValue, message, setloadingEmail, setMailError);
    })();
    setError("");
    setShowPanel(true);
  }
  // useEffect(() => {
  //   emailRef.current.focus();
  // }, [focus]);
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
    <Box>
      <Card
        sx={{
          backgroundColor: "rgba(255,255,255)",
          borderRadius: 10,
          boxShadow: "3px 5px 30px 15px black",
          p: 3.5,
          animation:
            "slide-in-elliptic-top-fwd .4s cubic-bezier(.25,.46,.45,.94) both",
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Badge
            badgeContent={<HomeIcon />}
            size="sm"
            color="warning"
            variant="soft"
            badgeInset={10}
          >
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ width: "80%", px: 2 }}
              onClick={() => navigate("/")}
            >
              <ArrowBackIosIcon sx={{ ml: 1 }} />
            </IconButton>
          </Badge>
          <img src={star} alt="" />
        </Grid>
        <CssVarsProvider />
        <Typography
          sx={{
            textAlign: "start",
            my: 2.5,
            fontFamily: "Poppins:wght@700",
            fontWeight: 700,
            fontSize: 33,
            color: "black",
          }}
        >
          Sign up
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

        <Typography
          sx={{
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: 500,
            color: "black",
            mb: 0.5,
          }}
        >
          Email Address
        </Typography>
        <Input
          required
          startDecorator={<MailIcon sx={{ color: "black" }} />}
          color={error ? "danger" : "warning"}
          variant="outlined"
          sx={{
            transition: "all 0.2s ease-in-out",
            mb: 1,
            "--Input-radius": "13px",
            "--Input-placeholderOpacity": 0.5,
            "--Input-focusedThickness": "1px",
            "--Input-minHeight": "60px",
            "--Input-paddingInline": "22px",
            "--Input-decorator-childHeight": "44px",
            animation: error
              ? "shake-horizontal .3s cubic-bezier(.455,.03,.515,.955) both"
              : null,
            "&:focus": {
              color: "blue",
            },
          }}
          placeholder="Example: roplerm8@yahoo.com"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: 500,
            color: "black",
            mb: 0.5,
          }}
        >
          Create a password
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            type={isHidden ? "password" : "text"}
            required
            startDecorator={<PasswordIcon sx={{ color: "black" }} />}
            color={error ? "danger" : "warning"}
            variant="outlined"
            sx={{
              transition: "all 0.2s ease-in-out",
              mb: 1,
              "--Input-radius": "13px",
              "--Input-placeholderOpacity": 0.5,
              "--Input-focusedThickness": "1px",
              "--Input-minHeight": "60px",
              "--Input-paddingInline": "22px",
              "--Input-decorator-childHeight": "44px",
              width: "100%",
              animation: error
                ? "shake-horizontal .3s cubic-bezier(.455,.03,.515,.955) both"
                : null,
            }}
            placeholder="Must be 6+ characters"
            onChange={(e) => setpassValue(e.target.value)}
            endDecorator={
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
            }
          />
        </Box>
        <Typography
          sx={{
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: 500,
            color: "black",
            mb: 0.5,
          }}
        >
          Confirm password
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            type={isHiddenConf ? "password" : "text"}
            required
            startDecorator={<PasswordIcon sx={{ color: "black" }} />}
            color={error ? "danger" : "warning"}
            variant="outlined"
            sx={{
              transition: "all 0.2s ease-in-out",
              mb: 1,
              "--Input-radius": "13px",
              "--Input-placeholderOpacity": 0.5,
              "--Input-focusedThickness": "1px",
              "--Input-minHeight": "60px",
              "--Input-paddingInline": "22px",
              "--Input-decorator-childHeight": "44px",
              width: "100%",
              animation: error
                ? "shake-horizontal .3s cubic-bezier(.455,.03,.515,.955) both"
                : null,
            }}
            placeholder="Repeat password"
            onChange={(e) => setpassfirmValue(e.target.value)}
            endDecorator={
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
            }
          />
        </Box>
        <Box sx={{ my: !captchaFinished ? 3 : 1 }}>
          <ReCAPTCHA
            ref={captcharef}
            hl={"en"}
            sitekey={sitekey}
            style={{
              display: captchaFinished ? "none" : "block",
            }}
          />
        </Box>

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
              startDecorator={<HowToRegRoundedIcon />}
              variant="outlined"
              color="warning"
              type="submit"
              sx={{
                width: "100%",
                borderRadius: "7px",
                minHeight: 60,
              }}
              onMouseEnter={() => {
                setgifAnim(true);
              }}
              onMouseLeave={() => {
                setgifAnim(false);
              }}
              onClick={handleSubmit}
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
              <Typography
                sx={{
                  mr: 2,
                  fontFamily: "Inter",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                Sign up
              </Typography>
            </Button>
          </Box>
        )}
        <Divider
          sx={{
            color: "black",
            px: 5,
            my: 2,
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
              fontFamily: "Inter",
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
          <ModalDialog
            variant="outlined"
            sx={{
              color: "#1c1c1c",
              outlineColor: "white",
              p: 5,
              boxShadow: "lg",
              backgroundColor: "black",
              borderRadius: 10,
            }}
          >
            <Box
              sx={{
                animation:
                  "swing-in-top-fwd .5s cubic-bezier(.175,.885,.32,1.275) both",
              }}
            >
              <Typography
                level="h3"
                fontFamily="Poppins@wght700"
                fontWeight={900}
                sx={{ color: "white" }}
              >
                Enter code
              </Typography>

              {emailValue && (
                <Typography fontFamily="Inter" sx={{ color: "white" }}>
                  We sent a verification code to {emailValue}, please check your
                  email and enter the code here
                  <EmailIcon />
                </Typography>
              )}
              <Box
                sx={{ my: 2, display: "flex", justifyContent: "center" }}
                className="codeBack"
              >
                <ReactInputVerificationCode
                  autoFocus
                  placeholder=" "
                  length={7}
                  onChange={(e) => setcodeValue(e.toString())}
                />
              </Box>
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
                  disabled={codeValue.indexOf(" ") > -1}
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
            </Box>
          </ModalDialog>
        </Modal>
      </Card>
    </Box>
  );
}
