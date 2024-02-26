import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function ProfileDetails() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogout() {
        setError("");

        try {
            setLoading(true);
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }

        setLoading(false);
    }

    return (
        <>
            <Card className="signup-card mt-5">
                <Card.Body>
                    <h2 className="signup-title">Profile</h2>
                    {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
                    <div className="profile-info">
                        <strong>Email:</strong> {currentUser.email}
                        <br />
                        <strong>Name:</strong> {currentUser.displayName}
                    </div>
                    <br />
                    <Button disabled={loading} className="submit-button" variant = "danger" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}
