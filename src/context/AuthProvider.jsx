import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, setAuthToken } from "../lib/api";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getAuthToken());

  const login = useCallback((nextToken) => {
    setAuthToken(nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const handleAuthLogout = () => {
      setAuthToken(null);
      setToken(null);
      navigate("/login", { replace: true });
    };

    const handleStorage = (event) => {
      if (event.key === "token") {
        setToken(event.newValue);
      }
    };

    window.addEventListener("auth:logout", handleAuthLogout);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth:logout", handleAuthLogout);
      window.removeEventListener("storage", handleStorage);
    };
  }, [navigate]);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
