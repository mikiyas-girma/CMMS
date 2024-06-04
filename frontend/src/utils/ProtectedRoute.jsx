import { getUserAuthStatus } from "./login";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuth, role } = getUserAuthStatus();

  if (!isAuth) {
    return <Navigate to="/404" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
