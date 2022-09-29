import React, { useState, useRef } from "react";
import { Form, Card, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";
import { useAuth } from "../contexts/AuthLogic";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { authErrorToTitleCase } from "../helpers";
import "../css/customcss.css";
import { googleauth } from "../firebase_connect";

export default function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const emailVerifi = useRef();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);

  const auth = getAuth();

  function ResetPassword(userEmail) {
    setResetLoading(true);
    return sendPasswordResetEmail(auth, userEmail.current.value)
      .then(() => {
        setResetSuccess(
          "Successfully sent an email, check your email box and follow the instructions"
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

    login(emailRef?.current.value, passRef?.current.value)
      .then(() => {
        setSuccess("Successfully signed in");
        localStorage.setItem("firstTime", "true");
      })
      .catch(({ code }) =>
        setError(authErrorToTitleCase(code) || "Unknown login error")
      )
      .finally(() => setLoading(false));
  };

  const handleSubmitButtonResetButton = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required ref={emailRef} />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label>Password</Form.Label>

            <div className="d-flex align-items-center">
              <Form.Control
                type={isHidden ? "password" : "text"}
                required
                ref={passRef}
                className="me-3"
              />

              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  setIsHidden(!isHidden);
                }}
              >
                {isHidden ? <Icons.Eye /> : <Icons.EyeSlash />}
              </button>
            </div>
          </Form.Group>

          {loading ? (
            <button className="btn btn-primary w-100 mt-3" type="button">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            </button>
          ) : (
            <Button
              id="submbutt"
              disabled={loading}
              type="submit"
              className="w-100 mt-3"
            >
              Sign in
            </Button>
          )}
          <div className="d-flex justify-content-center mt-2">
            <button className="btn btn-danger" onClick={googleauth}>
              Sign in with google
              <Icons.Google className="ms-2" />
            </button>
          </div>
        </Form>
      </Card.Body>
      <div className="mb-2 d-flex justify-content-center align-items-baseline">
        <span>Forgot the password?</span>
        <Button
          variant="light"
          className="ms-2"
          onClick={() => {
            setShowPanel(true);
          }}
        >
          Reset it here
        </Button>
      </div>
      <div className="mb-2 d-flex justify-content-center align-items-baseline">
        <span>Don't have an account?</span>
        <Button
          variant="light"
          className="ms-2"
          onClick={() => navigate("/register")}
        >
          Sign Up Here
        </Button>
      </div>

      <Modal centered show={showPanel} onHide={() => closePanel()}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter your email and we will send you a verification link
          <Form onSubmit={handleSubmitButtonResetButton}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailVerifi}
              />
            </Form.Group>
          </Form>
          {resetError && (
            <Alert className="resetAlertSuccess" variant="danger">
              {resetError}
            </Alert>
          )}
          {resetSuccess && (
            <Alert className="resetAlertError" variant="success">
              {resetSuccess}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          {resetLoading ? (
            <button className="btn btn-primary mt-3" type="button">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            </button>
          ) : (
            <Button
              variant="primary"
              onClick={() => ResetPassword(emailVerifi)}
            >
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
