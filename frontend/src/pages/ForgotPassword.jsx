import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { forgotPassword } from "../utils/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      console.log("res", response);
      setLoading(false);
      if (response?.data?.status === "success") {
        setMessage(response?.data?.message);
      } else {
        setBackendError(response?.error);
      }
    } catch (error) {
      setLoading(false);
      setBackendError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        {message && <p className="text-blue-600 text-center mb-4">{message}</p>}
        <form className="space-y-4" onSubmit={handleResetPassword}>
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Back to Login link */}
          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-indigo-600"
            >
              Back to Login
            </Link>
          </div>

          {/* Error message */}
          {backendError && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {backendError}
            </p>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              {loading ? (
                <PulseLoader color="#FFFFFF" size={8} />
              ) : (
                "Forgot Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
