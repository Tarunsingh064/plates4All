
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticates] = useState(
    !!localStorage.getItem("access")
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticates }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
