import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;