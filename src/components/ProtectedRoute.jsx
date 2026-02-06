import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contaxt/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    //  Not logged in
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    //  Logged in (Firebase verified)
    return children;
};

export default AdminRoute;
