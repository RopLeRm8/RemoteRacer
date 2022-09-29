import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert } from "react-bootstrap";
import Centered from "../components/Centered";
import Dashboard from "../components/Dashboard";
import "../css/customcss.css";
import { useEffect, createRef } from "react";

export default function RouteProvider() {
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
      }, 1000);
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
      <Centered>
        <div className="progress">
          <div
            className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: "100%" }}
          ></div>
        </div>
      </Centered>
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
              className="d-flex alert alert-success alert-white rounded align-items-baseline mt-3 alertin"
              ref={alertRef}
            >
              <strong>Success!</strong>
              <span className="ms-2">You've entered the account! </span>

              <div className="icon">
                <i className="fa fa-check"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route index element={<Navigate to="/register" />} />
          <Route path="dashboard" element={<Navigate to="/" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
