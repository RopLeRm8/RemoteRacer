import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert } from "react-bootstrap";
import Centered from "../components/Centered";
import Dashboard from "../components/Dashboard";
import "../css/LoginPage.css";
import { useEffect, createRef } from "react";
import * as Icons from "react-bootstrap-icons";
import { useLoadFonts } from "./FontProvider";
import CircularProgress from "@mui/joy/CircularProgress";
import { CssVarsProvider, Typography } from "@mui/joy";
import "../css/RouteProvider.css";

export default function RouteProvider() {
  useLoadFonts();
  const auth = getAuth();
  const [authUser, authLoading, authError] = useAuthState(auth);

  const alertRef = createRef();

  useEffect(() => {
    if (!alertRef.current) return;

    setTimeout(() => {
      alertRef.current.classList.remove("alertin");
      alertRef.current.classList.add("alertout");

      setTimeout(() => {
        const elm = alertRef.current;
        elm.parentNode.removeChild(elm);
      }, 700);
    }, 5000);
  }, [alertRef]);

  useEffect(() => {
    if (localStorage.getItem("firstTime") === "true") {
      window.location.reload();
      localStorage.setItem("firstTime", "false");
    }
  }, []);

  if (authError)
    return (
      <Centered>
        <Alert variant="danger" className="text-center">
          Unknown authentication error
        </Alert>
      </Centered>
    );

  if (authLoading)
    return (
      <CssVarsProvider>
        <center>
          <CircularProgress
            className="d-flex align-items-center justify-content-center"
            sx={{
              "--CircularProgress-size": "150px",
              "--CircularProgress-track-thickness": "5px",
              "--CircularProgress-progress-thickness": "8px",
              marginTop: "22rem",
            }}
          >
            {" "}
            <Typography level="h6">Loading</Typography>
            <span className="loading"></span>{" "}
          </CircularProgress>
        </center>
      </CssVarsProvider>
    );

  return (
    <BrowserRouter>
      {authUser ? (
        <div>
          <Routes>
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>

          <div className="container bootstrap snippets bootdey" id="nega">
            <div
              className="d-flex alert justify-content-center rounded mt-3 alertin"
              ref={alertRef}
            >
              <strong className="text-center me-2 text-white">
                Login success
              </strong>

              <Icons.PersonCheckFill className="mt-1 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="dashboard" element={<Navigate to="/" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
