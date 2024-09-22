import { useEffect, useState } from "react";
import useAuth from "../stores/Auth-Store";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoutes = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    verifyAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }
  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
