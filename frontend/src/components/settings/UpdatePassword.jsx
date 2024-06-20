import React, { useState } from "react";
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import SidebarWithHeader from "../sidebar/SidebarWithHeader";
import { updatePassword } from "../../utils/auth";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [Message, setmessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    // Add password update logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    if (newPassword !== confirmPassword) {
      setMessage("New Passwords do not match!");
      return;
    }
    setLoading(true);
    const response = await updatePassword(
      oldPassword,
      newPassword,
      confirmPassword
    );
    setLoading(false);
    if (response?.data?.status === "success") {
      setmessage(response?.data?.message);
    }
    if (response?.error) {
      setBackendError(response?.error);
    }
  };

  return (
    <SidebarWithHeader>
      <div className="bg-white p-8 rounded-lg shadow-md w-full mx-auto mt-10 max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
        {Message && <p className="text-blue-600 text-center mb-4">{Message}</p>}

        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex mt-8 items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <HiMiniEye /> : <HiMiniEyeSlash />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-0 mt-8 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <HiMiniEye /> : <HiMiniEyeSlash />}
            </span>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex mt-8 items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <HiMiniEye /> : <HiMiniEyeSlash />}
            </span>
          </div>
          {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )}
          {Message && (
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Back to Login
            </Link>
          )}
          {backendError && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {backendError}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? (
              <PulseLoader color="#FFFFFF" size={8} />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </SidebarWithHeader>
  );
};

export default UpdatePassword;
