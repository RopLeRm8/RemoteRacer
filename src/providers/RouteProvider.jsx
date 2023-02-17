import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Box from "@mui/joy/Box";
import { Alert, Backdrop } from "@mui/material";
import { SnackbarProvider } from "notistack";
import loading from "../assets/Route/loading.gif";
import Dashboard from "../components/Dashboard";
import WelcomePage from "../components/WelcomePage";
import Centered from "../features/Centered";
import AboutUs from "../pages/AboutUs";
import Customize from "../pages/Customize";
import Game from "../pages/Game";
import Leaderboard from "../pages/Leaderboard";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";

import "../css/LoginPage.css";
import "../css/RouteProvider.css";
import { useLoadFonts } from "../hooks/useLoadFonts";

export default function RouteProvider() {
  useLoadFonts();
  const auth = getAuth();
  const [authUser, authLoading, authError] = useAuthState(auth);

  if (authError)
    return (
      <Centered>
        <Alert variant="danger" className="text-center">
          Connection problem!
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
              <Route path="customize" element={<Customize />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="game" element={<Game />} />
            </Routes>
          </SnackbarProvider>
        </Box>
      ) : (
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route index element={<Navigate to="/welcomepage" />} />
            <Route path="*" element={<Navigate to="/welcomepage" />} />
            <Route path="profile" element={<Navigate to="/" />} />
            <Route path="dashboard" element={<Navigate to="/" />} />
            <Route path="customize" element={<Navigate to="/" />} />
            <Route path="about" element={<Navigate to="/" />} />
            <Route path="leaderboard" element={<Navigate to="/" />} />
            <Route path="welcomepage" element={<WelcomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="game" element={<Navigate to="/" />} />
          </Routes>
        </SnackbarProvider>
      )}
    </BrowserRouter>
  );
}
