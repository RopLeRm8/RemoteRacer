import React from "react";
import { Container } from "react-bootstrap";
import SignIn from "./SignIn";
import { AuthProvider } from "../contexts/AuthLogic";
export default function LoginPage() {
  return (
    <AuthProvider>
      <Container
        className="mt-3 d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <SignIn />
        </div>
      </Container>
    </AuthProvider>
  );
}
