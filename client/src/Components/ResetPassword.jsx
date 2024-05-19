import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
      password,
    })
      .then(response => {
        if (response.data.status) {
          toast.success("Password changed successfully!");
          setTimeout(() => navigate('/login'), 2000); // Delay to show the toast message before navigation
        } else {
          toast.error(response.data.message || "Error resetting password. Please try again.");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Error resetting password. Please try again.");
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
