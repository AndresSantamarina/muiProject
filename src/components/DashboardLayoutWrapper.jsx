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
        logout();
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

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={getNavigation()}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MUI",
      }}
      // theme={demoTheme}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutWrapper;
