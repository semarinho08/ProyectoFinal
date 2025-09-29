/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    toast.success(`Bienvenido, ${username.name}`);
    setUser(username);
  };

  const logout = () => {
    toast.info("Sesión cerrada");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
