import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./LoginPage.css";
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { setUser, logout } = useAuth();

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isOpen) {
            timeout = setInterval(() => {
                logout();
                onClose();
            }, 5 * 60 * 1000); // 5 minutes auto logout
        }

        return () => clearInterval(timeout);
    }, [isOpen, onClose, logout]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("https://localhost:7287/api/user/login", {
                Email: formData.username,
                Password: formData.password,
            });

            if (response.status === 200) {
                setMessage("Login successful!");
                console.log("user is", response.data);
                setUser(response.data); // Store user in context
                localStorage.setItem("user", JSON.stringify(response.data)); // Store user in local storage
                setTimeout(() => onClose(), 1500);
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overlay">
            <div className="modal">
                <h2>Login</h2>
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
        </motion.div>
    );
};

export default LoginModal;
