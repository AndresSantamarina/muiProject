import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../stores/Auth-Store";


const AdminRoutes = () => {
    const {user} = useAuth()
    const location = useLocation()

    const validRoutes = [
        "/admin",
        "/admin/users",
        "admin/routines"
    ]

    if(user?.rol !== "Admin"){
        return <Navigate to="/error" replace/>
    }

    return (
        <div>
            
        </div>
    );
};

export default AdminRoutes;