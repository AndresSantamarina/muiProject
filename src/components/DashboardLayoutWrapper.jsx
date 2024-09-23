import { AppProvider, DashboardLayout } from "@toolpad/core";
import useAuth from "../stores/Auth-Store";
import {
  ContactMail,
  Description,
  FitnessCenter,
  Payment,
  People,
} from "@mui/icons-material";
import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const DashboardLayoutWrapper = ({ children }) => {
  const { user, logout, login } = useAuth();
  const [session, setSession] = React.useState({
    user: {
      name: user?.nombre || "Usuario",
      email: user?.email || "usuario@example.com",
      image:
        user?.imagen ||
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    },
  });

  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        login();
      },
      signOut: () => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Tu sesión se cerrará",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, cerrar sesión",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            logout();
            Swal.fire({
              title: "Cerrando sesión",
              text: "Serás redirigido al inicio.",
              timer: 1000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
      },
    }),
    [logout]
  );

  const getNavigation = () => {
    if (user?.rol === "Admin") {
      return [
        { segment: "admin", title: "Inicio", icon: <Description /> },
        { segment: "admin/users", title: "Usuarios", icon: <People /> },
        {
          segment: "admin/routines",
          title: "Rutinas",
          icon: <FitnessCenter />,
        },
      ];
    }
    if (user?.rol === "User") {
      return [
        { segment: "user", title: "Inicio", icon: <Description /> },
        {
          segment: "user/routines",
          title: "Rutinas",
          icon: <FitnessCenter />,
        },
        { segment: "user/payments", title: "Pagos", icon: <Payment /> },
        { segment: "user/contact", title: "Contacto", icon: <ContactMail /> },
      ];
    }
    return [];
  };

  const homeRoute = user?.rol === "Admin" ? "/admin" : "/user";

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={getNavigation()}
      branding={{
        logo: (
          <Link to={homeRoute}>
            <img src="https://mui.com/static/logo.png" alt="MUI logo" />
          </Link>
        ),
        title: (
          <Link
            to={homeRoute}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            MUI
          </Link>
        ),
      }}
      // theme={demoTheme}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutWrapper;
