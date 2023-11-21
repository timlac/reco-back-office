import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;