import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../styles/api";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded);
      setAuthError(null);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || "Login failed";
      setAuthError(message);
      return {
        success: false,
        error: message,
      };
    }
  };

  const register = async (arg1, email, password) => {
    try {
      const payload =
        typeof arg1 === "object" && arg1 !== null
          ? { username: arg1.username, email: arg1.email, password: arg1.password }
          : { username: arg1, email, password };

      const res = await api.post("/auth/register", payload);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser(decoded);
      setAuthError(null);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || "Registration failed";
      setAuthError(message);
      return {
        success: false,
        error: message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthError(null);
  };

  const requestPasswordReset = async (email) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Request failed",
      };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Password reset failed",
      };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    error: authError,
    clearErrors: () => setAuthError(null),
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
