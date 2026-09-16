import { useCallback, useEffect, useState } from "react";
import { AuthContextProvider } from "./AuthContext";
import { setAccessToken, clearAccessToken } from "./tokenStore";
import { refreshAccessToken } from "../API/dashboardAxiosInstance";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================

  const setLoginData = useCallback((userData, token) => {
    setUser(userData);

    setAccessToken(token);

    // Store USER data only
    // Never store the JWT here
    if (userData) {
      localStorage.setItem("dashboard_user", JSON.stringify(userData));
    }

    setIsAuthenticated(Boolean(token));
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const clearAuth = useCallback(() => {
    setUser(null);

    clearAccessToken();

    localStorage.removeItem("dashboard_user");

    setIsAuthenticated(false);
  }, []);

  // =========================
  // RESTORE AUTH
  // =========================

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Restore user information
        const savedUser = localStorage.getItem("dashboard_user");

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);

            setUser(parsedUser);
          } catch (error) {
            console.error("Invalid saved user:", error);

            localStorage.removeItem("dashboard_user");
          }
        }

        // Restore access token using refresh cookie
        await refreshAccessToken();

        setIsAuthenticated(true);
      } catch (error) {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [clearAuth]);

  const value = {
    user,
    isAuthenticated,
    loading,
    setLoading,
    setLoginData,
    clearAuth,
  };

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}
