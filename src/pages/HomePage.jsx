import React from "react";
import useAuth from "../stores/Auth-Store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppProvider, SignInPage } from "@toolpad/core";

const HomePage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const providers = [{ id: "credentials", name: "Email and Password" }];

  const handleSignIn = async (provider, formData) => {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const user = await login(data);
      sessionStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        willClose: () => {
          if (user.rol === "Admin") {
            navigate("/admin");
          } else if (user.rol === "User") {
            navigate("/user");
          }
        },
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  };

  return (
    <AppProvider>
      <SignInPage signIn={handleSignIn} providers={providers} />
    </AppProvider>
  );
};

export default HomePage;
