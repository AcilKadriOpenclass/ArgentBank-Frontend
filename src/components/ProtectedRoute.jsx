import { selectIsAuthenticated } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userConnected = useSelector(selectIsAuthenticated);
  return userConnected ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
