// src/api/tasks.js
import axios from 'axios';

// Base URL for the API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all tasks
export const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Create a new task
export const createTask = async (task, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, task, {
        headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
            'Content-Type': 'application/json'
        }
    });
    return response;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, updatedData, token) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/tasks/${taskId}`,
            updatedData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in headers
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data; // Return response data directly
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.delete(
        `${BASE_URL}/tasks/${taskId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in headers
                'Content-Type': 'application/json'
            }
        }
    );;
    return response;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
