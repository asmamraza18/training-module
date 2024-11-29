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
import { AuthContext } from "@/context/AuthProvider";

export default function NavigationBar() {
  // Use the AuthContext
  const { user, isLogin, setIsLogin, setUser } = React.useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser(null);
  };

  console.log("User", user);
  console.log("isLogin", isLogin);

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
                <Link to="/">Logout</Link>
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
