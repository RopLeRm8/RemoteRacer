import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Centered from "../components/Centered";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";
import "../css/LoginPage.css";
import { useEffect, useState } from "react";
import { useLoadFonts } from "./FontProvider";
import "../css/RouteProvider.css";
import { Snackbar, Alert, LinearProgress } from "@mui/material";
import Box from "@mui/joy/Box";

export default function RouteProvider() {
  useLoadFonts();
  const auth = getAuth();
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [open, setOpen] = useState(true);

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
      <LinearProgress
        sx={{
          "--LinearProgress-thickness": "26px",
          "--LinearProgress-progressThickness": "20px",
        }}
      />
    );

  return (
    <BrowserRouter>
      {authUser ? (
        <Box>
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              severity="success"
              sx={{ width: "100%" }}
              onClose={() => setOpen(false)}
            >
              !כניסה מוצלחת
            </Alert>
          </Snackbar>
        </Box>
      ) : (
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="profile" element={<Navigate to="/" />} />
          <Route path="dashboard" element={<Navigate to="/" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
