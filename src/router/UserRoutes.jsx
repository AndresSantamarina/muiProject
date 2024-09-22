import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../stores/Auth-Store";


const UserRoutes = () => {
    const {user} = useAuth()
    const location = useLocation()

    const validRoutes = [
        "/user",
        "/user/routines",
        "/user/payments",
        "/user/contact"
    ]

    if(user?.rol !== "User"){
        return <Navigate to="/error" replace/>
    }

    return (
        <div>
            
        </div>
    );
};

export default UserRoutes;