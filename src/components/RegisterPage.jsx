import React from "react";
import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthLogic";
export default function LoginPage() {
  return (
    <AuthProvider>
      <Container
        className="mt-3 d-flex align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <SignUp />
        </div>
      </Container>
    </AuthProvider>
  );
}
