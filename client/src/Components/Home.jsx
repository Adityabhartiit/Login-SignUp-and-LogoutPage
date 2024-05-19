import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(res => {
      if(res.data.status) {
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handleDashboardClick = () => {
    const isAuthenticated = true; // Replace this with your authentication logic
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      toast.error("You need to log in first."); // Show error toast if not logged in
    }
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Home Page</h1>
      <button className="home-button" onClick={handleDashboardClick}>Dashboard</button>
      <br /> <br />
      <button className="home-button" onClick={handleLogout}>Login</button>
      <ToastContainer /> {/* Toast container for displaying error messages */}
    </div>
  )
}

export default Home
