import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import {host} from "./constants";
const API_BASE_URL = `${host}/api/otp`;

const SignUpModal = ({ onClose }) => {
    const [step, setStep] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const sendOtp = async (email) => {
        try {
            await axios.post(`${API_BASE_URL}/generate`, `"${email}"`, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success("OTP sent to your email!");
            setStep("otp");
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/verify`, { email, otp }, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data) {
                toast.success("OTP Verified Successfully!");
                setStep("username");
            } else {
                toast.error("Invalid OTP. Please try again.");
            }
        } catch (error) {
            toast.error("OTP Verification Failed. Please try again.");
        }
    };

    const saveUser = async (email, password, username) => {
        try {
            await axios.post(`${host}/api/user`, { email, password, username }, {
                headers: { "Content-Type": "application/json" },
            });
            toast.success("User Registered Successfully!");
            setTimeout(() => {
                onClose();
                navigate("/");
            }, 2000);
        } catch (error) {
            toast.error("Failed to register user. Please try again.");
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        await sendOtp(email);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        await verifyOtp(email, otp);
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        await saveUser(email, password, username);
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>
                    {step === "signup"
                        ? "Sign Up"
                        : step === "otp"
                        ? "Verify OTP"
                        : "Set Username"}
                </h2>

                {step === "signup" && (
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
                )}

                {step === "otp" && (
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

                {step === "username" && (
                    <form onSubmit={handleSaveUser} className="form">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUpModal;
