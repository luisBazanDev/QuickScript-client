import { Context, createContext, useState } from "react";

type AuthConextType = {
  username: string;
  setUsername: (username: string) => void;
  token: string | null;
  setToken: (token: string | null) => void;
};

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

const AuthContext: Context<AuthConextType> = createContext<AuthConextType>({
  username,
  setUsername,
  token,
  setToken,
});

export function AuthConextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
