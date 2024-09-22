import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Error404 from "../pages/Error404";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="admin/*"
          element={
            <ProtectedRoutes>
              <AdminRoutes />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="user/*"
          element={
            <ProtectedRoutes>
              <UserRoutes />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
