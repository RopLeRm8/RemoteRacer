import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import Centered from "../components/Centered";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import AboutUs from "../components/AboutUs";

import "../css/LoginPage.css";
import { useEffect } from "react";
import { useLoadFonts } from "./FontProvider";
import "../css/RouteProvider.css";
import { Alert, Backdrop } from "@mui/material";
import Box from "@mui/joy/Box";
import loading from "../assets/loading.gif";
import { SnackbarProvider } from "notistack";

export default function RouteProvider() {
  useLoadFonts();
  const auth = getAuth();
  const [authUser, authLoading, authError] = useAuthState(auth);

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
          בעית התחברות!
        </Alert>
      </Centered>
    );

  if (authLoading)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <img src={loading} width="256" height="256" alt="" />
      </Backdrop>
    );

  return (
    <BrowserRouter>
      {authUser ? (
        <Box>
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="about" element={<AboutUs />} />
            </Routes>
          </SnackbarProvider>
        </Box>
      ) : (
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route index element={<Navigate to="/login" />} />
            <Route path="profile" element={<Navigate to="/" />} />
            <Route path="dashboard" element={<Navigate to="/" />} />
            <Route path="about" element={<Navigate to="/" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </SnackbarProvider>
      )}
    </BrowserRouter>
  );
}
