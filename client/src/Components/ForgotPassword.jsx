import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await Axios.post("http://localhost:3000/auth/forgot-password", { email });
            setLoading(false);
            if (response.data.status) {
                toast.success("Check your email for the reset password link.");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(response.data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setLoading(false);
            toast.error("Error sending email. Please try again later.");
            console.log(err);
        }
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
