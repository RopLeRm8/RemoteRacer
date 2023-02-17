import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockResetIcon from "@mui/icons-material/LockReset";
import LoginIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CssVarsProvider,
  Divider,
  Grid,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Slide } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SignUpLoginWindow/logo.gif";
import star from "../assets/SignUpLoginWindow/star.png";
import { useAuth } from "../contexts/AuthLogic";
import "../css/LoginPage.css";
import { authErrorToTitleCase } from "../helpers";
import { gitauth, googleauth } from "../providers/FirebaseProvider";

export default function LoginPage() {
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
  const [emailValue, setemailValue] = useState("");
  const [passValue, setpassValue] = useState("");
  const [MailVerifi, setMailVerifi] = useState("");

  const auth = getAuth();

  function ResetPassword(e, userEmail) {
    e.preventDefault();
    setResetLoading(true);
    return sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        setResetSuccess(
          "Email Successfully Sent, Make Sure To Check Spam Folder Too"
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
    if (emailValue.length < 1) {
      setLoading((prev) => !prev);
      return setError("Please enter email to be checked");
    }
    if (passValue.length < 1) {
      setLoading((prev) => !prev);
      return setError("Please enter password to be checked");
    }
    login(emailValue, passValue)
      .then(() => {
        setSuccess("Successfully Logged In");
        localStorage.setItem("firstTime", "true");
      })
      .catch(({ code }) =>
        setError(authErrorToTitleCase(code) || "Unknown login error")
      )
      .finally(() => setLoading(false));
  };

  // useEffect(() => {
  //   emailRef.current.focus();
  // }, [focus]);
  return (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255)",
        borderRadius: 10,
        boxShadow: "3px 5px 30px 15px black",
        p: 3.5,
        ml: { xs: 7, md: 0 },
        animation:
          "slide-in-elliptic-top-fwd .4s cubic-bezier(.25,.46,.45,.94) both",
      }}
    >
      <CssVarsProvider />
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

      <Typography
        level="h2"
        sx={{
          textAlign: "start",
          my: 2.5,
          fontFamily: "Poppins:wght@700",
          fontWeight: 700,
        }}
      >
        Sign In
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
          fontWeight: 300,
          mb: 0.5,
        }}
      >
        Email Address
      </Typography>
      <Input
        type="email"
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
        onChange={(e) => setemailValue(e.target.value)}
      />

      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: 300,
          mb: 0.5,
        }}
      >
        Password
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Input
          type={isHidden ? "password" : "text"}
          required
          startDecorator={<PasswordIcon sx={{ color: "black" }} />}
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
          color={error ? "danger" : "warning"}
          variant="outlined"
          sx={{
            transition: "all 0.2s ease-in-out",
            mb: 1,
            width: "100%",
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
          placeholder="Enter password"
          onChange={(e) => setpassValue(e.target.value)}
        />
      </Box>

      {loading ? (
        <Button
          color="success"
          variant="outlined"
          loading
          type="submit"
          sx={{
            my: 2,
            border: 0,
            width: "100%",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.85)",
            },
            borderRadius: "7px",
            minHeight: 60,
          }}
        />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            ref={gifAnimCont}
            startDecorator={<LoginIcon />}
            color="warning"
            variant="outlined"
            type="submit"
            sx={{
              my: 2,
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
                <Box sx={{ mr: 0.7 }}>
                  <img src={logo} width="30" height="30" alt="" id="logo" />
                </Box>
              </Slide>
            )}
            <Typography
              sx={{
                mr: 2,
                fontFamily: "Inter",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Sign In
            </Typography>
          </Button>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Divider
          sx={{
            color: "black",
            width: "100%",
            fontFamily: "Inter",
            fontSize: 14,
          }}
        >
          Or Login with
        </Divider>
      </Box>
      <Grid
        direction="row"
        sx={{ display: "flex" }}
        justifyContent="space-evenly"
      >
        <Grid item>
          <IconButton
            color="danger"
            variant="outlined"
            onClick={googleauth}
            sx={{
              "--IconButton-size": "60px",
              mr: 10,
              width: "100%",
              border: 2,
            }}
          >
            <GoogleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="neutral"
            variant="outlined"
            onClick={gitauth}
            sx={{
              "--IconButton-size": "60px",
              mr: 10,
              width: "100%",
              border: 2,
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2, mt: 8, display: "flex", justifyContent: "center" }}>
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
            fontFamily: "Inter",
            fontWeight: 500,
          }}
          onClick={() => {
            setShowPanel(true);
          }}
        >
          Reset Password For Existing User
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
            fontFamily: "Inter",
            fontWeight: 500,
          }}
          onClick={() => navigate("/register")}
        >
          Sign Up Here
        </Button>
      </Box>

      <Modal
        open={showPanel}
        onClose={() => closePanel()}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <ModalDialog
          variant="outlined"
          size="lg"
          sx={{
            p: 5,
            boxShadow: "lg",
            backgroundColor: "black",
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
          <Box
            sx={{
              animation:
                "swing-in-top-fwd .5s cubic-bezier(.175,.885,.32,1.275) both",
            }}
          >
            <Typography
              level="h3"
              fontFamily="Poppins:wght@700"
              sx={{
                mb: 1,
                color: "white",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                fontSize: "150%",
                mr: { xs: 2, md: 3 },
              }}
              startDecorator={<LockResetIcon sx={{ fontSize: "150%" }} />}
            >
              Password Reset
            </Typography>

            <Typography
              startDecorator={
                <EmailIcon sx={{ display: { xs: "none", md: "flex" } }} />
              }
              fontFamily="Inter"
              sx={{ color: "white", textAlign: "center" }}
            >
              Enter your email address and we will send an email with a reset
              password link
            </Typography>
            <Typography
              sx={{ opacity: "80%", color: "white" }}
              fontFamily="Inter"
            >
              Email to receive the email
            </Typography>
            <Input
              style={{ borderRadius: 4 }}
              type="email"
              required
              startDecorator={<MailIcon sx={{ color: "black" }} />}
              color={"warning"}
              variant="outlined"
              sx={{
                transition: "all 0.2s ease-in-out",
                mt: 2,
                mb: 3,
                "--Input-radius": "13px",
                "--Input-placeholderOpacity": 0.5,
                "--Input-focusedThickness": "1px",
                "--Input-minHeight": "60px",
                "--Input-paddingInline": "22px",
                "--Input-decorator-childHeight": "44px",
                "&:focus": {
                  color: "blue",
                },
              }}
              placeholder="Email to reset the password for"
              onChange={(e) => setMailVerifi(e.target.value)}
            />
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
                      Success
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
                      Error
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
                color="warning"
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
                color="warning"
                onClick={(e) => ResetPassword(e, MailVerifi)}
              >
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: 15,
                    fontWeight: 500,
                    mr: 3,
                  }}
                >
                  Submit code
                </Typography>
              </Button>
            )}
          </Box>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
