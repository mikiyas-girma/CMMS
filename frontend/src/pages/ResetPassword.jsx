import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../utils/auth";
import { PulseLoader } from "react-spinners";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [Message, setmessage] = useState("");

  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setLoading(true);

    const response = await resetPassword(password, confirmPassword, token);
    console.log("res", response);
    setLoading(false);
    if (response?.data?.status === "success") {
      setmessage(response?.data?.message);
    }
    if (response?.error) {
      setBackendError(response?.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {Message && <p className="text-blue-600 text-center mb-4">{Message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password"
              required
            />
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? (
              <PulseLoader color="#FFFFFF" size={8} />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
