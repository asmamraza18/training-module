"use client";

import { Link } from "@tanstack/react-router";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { eq } from "drizzle-orm";
import db, { users } from "../lib/db";

export const AuthContext = React.createContext({
  isLogin: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLogin(true);
        setUser(JSON.parse(storedUser));
      }
    };

    checkSession();
  }, []);

  const login = async (email: any) => {
    try {
      // Find user by email
      const [foundUser] = await db.select().from(users).where(eq(users.email, email));

      if (!foundUser) {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  const logout = () => {
    // Clear login state
    setLogin(false);
    setUser(null);

    // Remove from local storage
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ isLogin, user, login, logout }}>{children}</AuthContext.Provider>;
}

export default function NavigationBar() {
  // Use the AuthContext
  const { isLogin, user, logout } = React.useContext(AuthContext);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {!isLogin ? (
          // Navigation for unauthenticated users
          <>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/auth" className={navigationMenuTriggerStyle()}>
                Account
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          // Navigation for authenticated users
          <>
            <NavigationMenuItem>
              <Link to="/dashboard" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/module" className={navigationMenuTriggerStyle()}>
                Modules
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <span className="px-4 py-2 text-sm text-gray-600">Welcome, {user?.name || "User"}</span>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button onClick={logout} className={navigationMenuTriggerStyle()}>
                Logout
              </button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
