import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { loginRequest } from "../client/auth";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { token, setToken, username, setUsername } = context;
  const isLogged = !!token;

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const data = await loginRequest(username, password);
    if (data) {
      setToken(data.access_token);
      setUsername(data.username);
      return true;
    } else {
      return false;
    }
  };

  const register = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const data = await loginRequest(username, password);
    if (data) {
      setToken(data.access_token);
      setUsername(data.username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUsername("");
  };

  return {
    isLogged,
    token,
    login,
    register,
    logout,
  };
}