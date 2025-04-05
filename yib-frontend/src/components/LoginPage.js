import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { CSSTransition } from "react-transition-group";
import "./LoginPage.css";
import "./fade.css"; // We'll add simple fade-in/fade-out CSS here
import {host} from "./constants";
const LoginModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { setUser, logout } = useAuth();

    useEffect(() => {
        let timeout;

        if (isOpen) {
            timeout = setInterval(() => {
                logout();
                onClose();
            }, 5 * 60 * 1000); // Auto logout after 5 minutes
        }

        return () => clearInterval(timeout);
    }, [isOpen, onClose, logout]);

    useEffect(() => {
        if (isOpen) {
            setFormData({ username: "", password: "" });
            setErrors({ username: "", password: "" });
            setMessage("");
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = { username: "", password: "" };
        if (!formData.username) newErrors.username = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(`${host}/api/user/login`, {
                Email: formData.username,
                Password: formData.password,
            });

            if (response.status === 200) {
                setMessage("Login successful!");
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setTimeout(() => onClose(), 1500);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data?.message || "Login failed.");
            } else if (error.request) {
                setMessage("No response from server. Please check your connection.");
            } else {
                setMessage("Something went wrong. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <div className="overlay">
                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
                    <h2 id="login-title">Login</h2>
                    {message && <p className="message">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="input"
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <button className="close" onClick={onClose}>X</button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default LoginModal;
