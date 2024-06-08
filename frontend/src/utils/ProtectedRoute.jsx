import { getUserAuthStatus } from "./auth";
import { Navigate, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useEffect, useState } from "react";
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuth, role } = getUserAuthStatus();

  if (!isAuth) {
    return <PageNotFound />;
  }

  if (requiredRole && role !== requiredRole) {
    return <PageNotFound />;
  }

  return children;
};

export const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = getUserAuthStatus();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuth, navigate]);

  if (!isAuth && showMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl mb-4">You are not logged in</h2>
          <p className="text-gray-700 mb-4">
            Please log in to access the page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};
