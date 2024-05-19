import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Dashboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); // State to manage loading status
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
        .then(res=> {
            if(res.data.status) {
                setLoading(false); // Set loading to false when authentication is successful
            } else {
                navigate('/'); // Redirect to login page if user is not authenticated
            }
        })
        .catch(err => {
            toast.error("An error occurred. Please try again.");
            console.log(err);
        });
    }, [navigate]); // Add navigate to dependencies to avoid react-hooks/exhaustive-deps warning

    const handleLogout = () => {
        // Perform logout action here
        axios.get('http://localhost:3000/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login');
                } else {
                    toast.error("Logout failed. Please try again.");
                }
            })
            .catch(err => {
                toast.error("An error occurred. Please try again.");
                console.log(err);
            });
    };

    return (
        <div className="dashboard-container">
            {loading ? ( // Render loading message while waiting for authentication response
                <div className="loading-message">Loading...</div>
            ) : (
                <div className="dashboard-content">
                    <h1>Dashboard</h1>
                    <p>Welcome here</p>
                </div>
            )}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <ToastContainer /> {/* Toast container for displaying error messages */}
        </div>
    )
}

export default Dashboard
