import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthLogic";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";

export default function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const passFirmRef = useRef();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [code, SetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHiddenConf, setIsHiddenConf] = useState(true);

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const { signUp } = useAuth();

  const navigate = useNavigate();

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
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
    SetCode(generateString(7).toUpperCase());

    setError("");
    setLoading(true);
    signUp(
      emailRef.current.value,
      passRef.current.value,
      setError,
      setSuccess,
      setLoading
    );
  }
  return (
    <Card className="shadow">
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required ref={emailRef} />
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
    </Card>
  );
}
