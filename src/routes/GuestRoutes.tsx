import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/ai-interview-dashboard" replace />;
    }

    return <Outlet />;
};

export default GuestRoutes;