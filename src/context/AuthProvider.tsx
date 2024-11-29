import React from "react";
import { useEffect, useState } from "react";

export const AuthContext = React.createContext<{
  isLogin: boolean;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLogin: false,
  user: null,
  setUser: () => {},
  setIsLogin: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setIsLogin(true);
        setUser(JSON.parse(storedUser));
      }
    };

    checkSession();
  }, []);

  return <AuthContext.Provider value={{ isLogin, user, setUser, setIsLogin }}>{children}</AuthContext.Provider>;
}
