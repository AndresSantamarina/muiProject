import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import useAuth from "../stores/Auth-Store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";

const HomePage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
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
      setError("server", {
        type: "manual",
        message: "Credenciales incorrectas",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        backgroundColor: "background.default",
      }}
    >
      <Grid2
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 item xs={12}>
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            error={!!errors.email}
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-email"
                  label="Email"
                  endAdornment={
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </FormControl>
        </Grid2>

        <Grid2 item xs={12}>
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            error={!!errors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              )}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </FormControl>
        </Grid2>

        {errors.server && (
          <Grid2 item xs={12}>
            <span>{errors.server.message}</span>
          </Grid2>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          Iniciar sesión
        </Button>
      </Grid2>
    </Box>
  );
};

export default HomePage;
