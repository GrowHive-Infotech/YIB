import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "./AuthContext";

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
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
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
            <style>
                {`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            width: 400px;
            text-align: center;
            position: relative;
          }
          .message {
            color: green;
            margin-bottom: 10px;
          }
          .error {
            color: red;
            font-size: 12px;
            margin: 5px 0;
          }
          .input {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
            display: block;
          }
          .input:focus {
            border: 1px solid #007BFF;
          }
          .submit-btn {
            background: #007BFF;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
          }
          .submit-btn:disabled {
            background: #ccc;
          }
          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: red;
            color: white;
            border: none;
            padding: 5px;
            border-radius: 50%;
            cursor: pointer;
          }
        `}
            </style>
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
