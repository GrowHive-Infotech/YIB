import React, { useState } from "react";
import { motion } from "framer-motion";

interface LoginModalProps {
    isOpen: boolean;
    onClose: any;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose } ) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const closeform = () => {
        console.log("close clicked", onClose);
        onClose();
    }

    const validate = () => {
        const newErrors: typeof errors = { username: "", password: "" };
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Login Successful", formData);
            // Proceed with login logic
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={overlayStyle}
        >
            <div style={modalStyle}>
                <h2 style={headerStyle}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={fieldContainerStyle}>
                        <label htmlFor="username" style={labelStyle}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, borderColor: errors.username ? "red" : "#ccc" }}
                        />
                        {errors.username && <p style={errorStyle}>{errors.username}</p>}
                    </div>

                    <div style={fieldContainerStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{ ...inputStyle, borderColor: errors.password ? "red" : "#ccc" }}
                        />
                        {errors.password && <p style={errorStyle}>{errors.password}</p>}
                    </div>

                    <button type="submit" style={submitButtonStyle}>Login</button>
                </form>
                <div style={linkContainerStyle}>
                    <a href="#" style={linkStyle}>Forgot Password?</a>
                    <span style={separatorStyle}>|</span>
                    <a href="#" style={linkStyle}>Forgot Username?</a>
                </div>
                <button style={closeButtonStyle} onClick={closeform}>X</button>
            </div>
        </motion.div>
    );
};

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "400px",
    position: "relative",
};

const headerStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center",
};

const fieldContainerStyle: React.CSSProperties = {
    marginBottom: "15px",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontSize: "0.9rem",
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
};

const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "5px",
};

const submitButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
};

const linkContainerStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "0.9rem",
};

const linkStyle: React.CSSProperties = {
    color: "#007BFF",
    textDecoration: "none",
    cursor: "pointer",
};

const separatorStyle: React.CSSProperties = {
    margin: "0 10px",
    color: "#666",
};

const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    color: "#666",
    cursor: "pointer",
};

export default LoginModal;
