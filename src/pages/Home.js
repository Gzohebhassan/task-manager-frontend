import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css'; // Import your CSS

const Home = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    // Handle Google login success
    const { credential } = response;
    if (credential) {
      // You may want to save the token or user info in local storage or context here
      navigate('/tasks'); // Redirect to TaskBoardPage
    } else {
      // Handle error case
      console.error('Google login failed:', response);
    }
  };

  const handleGoogleFailure = (error) => {
    // Handle Google login failure
    console.error('Google login error:', error);
  };

  return (
    <div className="home-page">
      <h1>TASK MANAGER HOME</h1>
      <div className="options">
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Replace with your Google client ID */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            className="google-login-btn"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Home;
