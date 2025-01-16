import { Client } from "@pcc/shared";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getUser,
  login as loginService,
  logout as logoutService,
} from "../services/loginService";

type AuthState = {
  client: Client | null;
};

type AuthContextProps = {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  autoLogin: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ client: null });

  useEffect(() => {
    autoLogin();
  }, []);

  /**
   * Re-login the user if the token is still valid
   */
  const autoLogin = async () => {
    try {
      const { client } = await getUser();
      setAuth({ client });
    } catch (error) {
      null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { client } = await loginService(email, password);
      setAuth({ client });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setAuth({ client: null });
    logoutService();
    window.location.reload(); // reload to deal with UI sync issues
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
