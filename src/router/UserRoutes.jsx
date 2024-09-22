import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import useAuth from "../stores/Auth-Store";
import UserProfile from "../pages/user/UserProfile";
import Routines from "../pages/user/Routines";
import Payments from "../pages/user/Payments";
import ContactUs from "../pages/user/ContactUs";


const UserRoutes = () => {
    const {user} = useAuth()

    if(user?.rol !== "User"){
        return <Navigate to="/error" replace/>
    }
    
    return (
        <Routes>
        {/* Anidamos las rutas dentro del segmento "/user" */}
        <Route path="/" element={<UserProfile />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* El Outlet se utiliza para representar rutas anidadas */}
        <Route path="*" element={<Outlet />} />
      </Routes>
    );
};

export default UserRoutes;