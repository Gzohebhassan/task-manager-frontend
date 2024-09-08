import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear the token from localStorage
    navigate('/login');  // Redirect to login
  };

  return (
    <nav className="navbar">
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
