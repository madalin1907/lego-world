import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
      <>
        <Card className="signup-card mt-5">
          <Card.Body>
            <h2 className="signup-title">Log In</h2>
            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-group" id="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required className="form-control" />
              </Form.Group>
              <Form.Group className="form-group" id="password">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required className="form-control" />
              </Form.Group>
              <Button disabled={loading} className="submit-button" type="submit">
                Log In
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="text-center mt-2">
          Need an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </>
  );
}