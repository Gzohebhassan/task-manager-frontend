// src/api/auth.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Adjust as needed

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, credentials);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Handle Google login
export const googleLogin = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/google`, { id_token: token });
    return response;
  } catch (error) {
    console.error('Error with Google login:', error);
    throw error;
  }
};
