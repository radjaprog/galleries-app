import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState({});

  const handleLogin = async (data) => {
    const response = await authService.login(data);
    console.log(response);

    if (response.status === 200) {
      setUser(response.data.user);
      history.push("/");
    }

    return response;
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser({});
    alert("You are logged out!");
  };

  const handleRegister = async (data) => {
    const response = await authService.register(data);

    if (response.status === 200) {
      setUser({});
      history.push("/");
    }

    return response;
  };

  const handleRefreshToken = async () => {
    const token = handleGetItemFromLS("token");

    if (token) {
      const { user } = await authService.refresh();
      setUser(user);
    }
  };

  const handleGetItemFromLS = (value) => {
    return localStorage.getItem(value);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        refresh: handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
