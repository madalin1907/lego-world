import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
      <>
        <Card className="signup-card mt-5">
          <Card.Body>
            <h2 className="signup-title">Sign Up</h2>
            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-group" id="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required className="form-control" />
              </Form.Group>
              <Form.Group className="form-group" id="name">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required className="form-control" />
              </Form.Group>
              <Form.Group className="form-group" id="password">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required className="form-control" />
              </Form.Group>
              <Form.Group className="form-group" id="password-confirm">
                <Form.Label className="form-label">Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required className="form-control" />
              </Form.Group>
              <Button disabled={loading} className="submit-button" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-2">
          Already have an account? <Link to="/login" className="text-link">Log In</Link>
        </div>
      </>
  );
}