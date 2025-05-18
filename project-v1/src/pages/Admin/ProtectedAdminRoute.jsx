import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" />;
  if (user.role !== "admin") return <Navigate to="/not-authorized" />;

  return children;
};

export default ProtectedAdminRoute;
