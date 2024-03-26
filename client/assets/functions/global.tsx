import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  token: string | null;
  setAuthToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  setAuthToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const setAuthToken = (token: string | null) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
