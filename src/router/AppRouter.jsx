import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Error404 from "../pages/Error404";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import DashboardLayoutWrapper from "../components/DashboardLayoutWrapper";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        {/* Rutas protegidas con layout */}
        <Route
          path="admin/*"
          element={
            <DashboardLayoutWrapper>
              <ProtectedRoutes>
                <AdminRoutes />
              </ProtectedRoutes>
            </DashboardLayoutWrapper>
          }
        ></Route>
        <Route
          path="user/*"
          element={
            <DashboardLayoutWrapper>
              <ProtectedRoutes>
                <UserRoutes />
              </ProtectedRoutes>
            </DashboardLayoutWrapper>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
