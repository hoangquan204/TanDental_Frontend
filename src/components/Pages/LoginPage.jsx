import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      // giả lập API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login:", form);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper
        elevation={6}
        className="w-[900px] h-[500px] flex rounded-2xl overflow-hidden"
      >
        {/* LEFT - LOGO */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-500 mb-2">
              Dental<span className="text-yellow-500">SO</span>
            </div>
            <p className="text-gray-500 text-sm">Hệ thống quản lý nha khoa</p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-[80%]">
            <h2 className="text-3xl font-bold mb-6">Login</h2>

            {/* EMAIL */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {/* PASSWORD */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ACTION */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-blue-500 text-sm cursor-pointer hover:underline">
                Forgot password?
              </span>

              <Button
                variant="contained"
                className="rounded-full px-6"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
