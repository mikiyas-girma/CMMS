import { getUserAuthStatus } from "./login";
import { Navigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuth, role } = getUserAuthStatus();

  if (!isAuth) {
    return <PageNotFound />;
  }

  if (requiredRole && role !== requiredRole) {
    return <PageNotFound />;
  }

  return children;
};

export default ProtectedRoute;
