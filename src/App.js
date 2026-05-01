import Dashboard from "./components/Pages/Dashboard";
import LoginPage from "./components/Pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreAuth } from "./redux/slices/authSlice";
import { CircularProgress, Box } from "@mui/material";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Restore auth state khi app mount
  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center bg-gray-100">
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

export default App;