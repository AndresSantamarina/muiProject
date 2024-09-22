import { Navigate, Outlet, Route, Routes} from "react-router-dom";
import useAuth from "../stores/Auth-Store";
import AdminProfile from "../pages/admin/AdminProfile";
import UsersList from "../pages/admin/UsersList";
import RoutinesList from "../pages/admin/RoutinesList";


const AdminRoutes = () => {
    const {user} = useAuth()

    if(user?.rol !== "Admin"){
        return <Navigate to="/error" replace/>
    }

    return (
        <Routes>
        {/* Anidamos las rutas dentro del segmento "/admin" */}
        <Route path="/" element={<AdminProfile />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/routines" element={<RoutinesList />} />
        {/* El Outlet se utiliza para representar rutas anidadas */}
        <Route path="*" element={<Outlet />} />
      </Routes>
    );
};

export default AdminRoutes;