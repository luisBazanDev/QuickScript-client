import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { loginRequest, registerRequest } from "../client/auth";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const isLogged = !!context.token;

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const data = await loginRequest(username, password);
    if (data) {
      context.setToken(data.access_token);
      context.setUsername(data.username);
      return true;
    } else {
      return false;
    }
  };

  const register = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const data = await registerRequest(username, password);
    if (data) {
      context.setToken(data.access_token);
      context.setUsername(data.username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    context.setToken(null);
    context.setUsername("");
  };

  return {
    isLogged,
    login,
    register,
    logout,
  };
}
