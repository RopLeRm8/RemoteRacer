import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthLogic";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";
import { sendEmail } from "../providers/EmailProvider";

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const passFirmRef = useRef();
  const formValue = useRef();
  const codeToCheck = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConf, setIsHiddenConf] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(null);

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  function generateCode(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  function handleSubmitCode(e) {
    e.preventDefault();
  }
  function SubmitCode() {
    console.log(codeToCheck.current.value);
    console.log(document.getElementById("message").value);
    if (
      " " + codeToCheck.current.value ===
      document.getElementById("message").value
    ) {
      setCodeError(null);
      setCodeSuccess("Verify Success");
      setTimeout(() => {
        setShowPanel(false);
        setLoading(true);
        signUp(
          emailRef.current.value,
          passRef.current.value,
          setError,
          setSuccess,
          setLoading
        );
        setCodeSuccess(null);
        setCodeError(null);
      }, 2000);
    } else {
      setCodeError("Wrong code! Try again");
      setCodeSuccess(null);
      setLoading(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailRef?.current.value?.length)
      return setError("Please enter a valid email address");

    if (passRef.current.value !== passFirmRef.current.value) {
      return setError("Password don't match!");
    }

    if (passRef.current.value.length < 6) {
      return setError("The password must contain atleast 6 symbols!");
    }
    if (!strongRegex.test(passRef.current.value)) {
      return setError(
        "Error! Please notice. Password must contain: special symbols, numbers, upper letters"
      );
    }
    document.getElementById("user_email").value = emailRef.current.value;
    document.getElementById("message").value = generateCode(7).toUpperCase();

    sendEmail(formValue.current);
    setError("");
    setShowPanel(true);
  }

  return (
    <Card className="shadow">
      <Card.Body>
        <Form ref={formValue} style={{ display: "none" }}>
          <label>Name</label>
          <input type="text" name="user_name" id="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" id="user_email" />
          <label>Message</label>
          <textarea name="message" id="message" />
        </Form>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              ref={emailRef}
              name="user_email"
            />
          </Form.Group>

          <Form.Group id="password" className="mb-3">
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

          <Form.Group id="pass-firm">
            <Form.Label>Confirm Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={isHiddenConf ? "password" : "text"}
                required
                ref={passFirmRef}
                className="me-3"
              />
              <button
                className="btn btn-outline-dark "
                onClick={(e) => {
                  e.preventDefault();
                  setIsHiddenConf(!isHiddenConf);
                }}
              >
                {isHiddenConf ? <Icons.Eye /> : <Icons.EyeSlash />}
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
              Sign up
            </Button>
          )}
        </Form>
      </Card.Body>
      <div className="mb-2 d-flex justify-content-center align-items-baseline">
        <span>Already have an account?</span>
        <button
          className="btn btn-light ms-2"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </div>
      <Modal
        centered
        show={showPanel}
        onHide={() => {
          setShowPanel(false);
          setCodeError(null);
          setCodeSuccess(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Email verification</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {emailRef?.current?.value && (
            <span>
              We've sent the code to the {emailRef?.current?.value}, please
              enter the code you've received <Icons.SendCheck />
            </span>
          )}

          <Form onSubmit={handleSubmitCode}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label>
                <h5>Enter the code:</h5>
              </Form.Label>
              <Form.Control type="email" ref={codeToCheck} />
            </Form.Group>
          </Form>
          {codeError && (
            <Alert className="resetAlertError" variant="danger">
              <Icons.EnvelopeExclamation className="me-2" />
              {codeError}
            </Alert>
          )}
          {codeSuccess && (
            <Alert className="resetAlertError" variant="success">
              <Icons.Check2 className="me-2" />
              {codeSuccess}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={SubmitCode}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
