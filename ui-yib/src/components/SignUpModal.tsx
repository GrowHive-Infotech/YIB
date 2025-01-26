import React, { useState } from "react";
import "./SignUp.css"; // CSS file for styling

const SignUpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState("signup"); // Tracks the current step: signup or otp
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate sending OTP
        alert("OTP sent to your email!");
        setStep("otp");
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate OTP verification
        if (otp === "123456") { // Example OTP for testing
            alert("Email verified successfully!");
            setStep("signup");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setOtp("");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{step === "signup" ? "Sign Up" : "Verify OTP"}</h2>

                {step === "signup" ? (
                    <form onSubmit={handleSignUp} className="form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="form">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button type="submit">Verify</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUpModal;
