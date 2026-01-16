import React from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // If backend has logout API (recommended)
      await axiosInstance.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage / auth data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      // Redirect to admin login
      navigate("/admin-login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;