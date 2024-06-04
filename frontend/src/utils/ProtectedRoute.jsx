import { getUserAuthStatus } from "./login";
import { Navigate, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
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

  if (!isAuth) {
    navigate("/");
  }

  return children;
};
