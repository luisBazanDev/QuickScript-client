import { createContext, useState } from "react";

type AuthConextType = {
  username: string;
  setUsername: (username: string) => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthConextType | null>(null);

export function AuthConextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("token")
  );

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
