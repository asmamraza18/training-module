import {
  TabsRoot,
  TabsList1,
  TabsTrigger1,
  TabsContent1,
} from "@/components/ui/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

export default function Auth() {
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
    } else {
      setLoginError("");

      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError("Please fill in all fields");
    } else {
      setRegisterError("");

      toast({
        title: "User created",
        description: "You have successfully created an account",
      });
    }
  };

  return (
    <div className="flex flex-1 items-start justify-center mt-14">
      <Tabs defaultValue={activeTab} className="max-w-md w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center">
                Please sign in to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-red-500">{loginError}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Register
              </CardTitle>
              <CardDescription className="text-center">
                Please create an account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-password">Confirm Password</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {registerError && (
                  <p className="text-sm text-red-500">{registerError}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
