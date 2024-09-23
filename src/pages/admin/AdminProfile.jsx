import React, { useEffect } from "react";
import useAuth from "../../stores/Auth-Store";
import { Avatar, Box, Grid2, Typography } from "@mui/material";

const AdminProfile = () => {
  const { user, getUserById, updateUser } = useAuth.getState();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.id) {
        await getUserById(user.id);
      }
    };
    fetchUser();
  }, [user?.id, getUserById]);

  const handleUserUpdated = async (updatedUser) => {
    if (user?.id) {
      await updateUser(user.id, updatedUser);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        backgroundColor: "background.default",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={4} display="flex" justifyContent="center">
          <Avatar
            alt={user?.nombre || "Usuario"}
            src={
              user?.imagen ||
              "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            }
            sx={{ width: 120, height: 120 }}
          />
        </Grid2>
        <Grid2 item xs={12} sm={8}>
          <Typography variant="h5">
            {user?.nombre} {user?.apellido}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {user?.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Rol: {user?.rol}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AdminProfile;
