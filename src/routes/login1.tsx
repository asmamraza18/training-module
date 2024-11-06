import { TabsRoot, TabsList1, TabsTrigger1, TabsContent1 } from '@/components/ui/tabs';
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
import { createFileRoute } from '@tanstack/react-router';
import { useState } from "react";


export const Route = createFileRoute('/login1')({
  component: Login1,
})

export default function Login1() {

  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      console.log("Login attempted with:", { email, password });
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
    } else {
      setError("");
      console.log("Login attempted with:", { email, password, confirmPassword });
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  };

  return (
      <TabsRoot defaultValue="tab1">
        <TabsList1 aria-label="Manage your account" >
          <TabsTrigger1 className="border-t-4 border-l-4 rounded-md" value="tab1">
            Register
          </TabsTrigger1>
          <TabsTrigger1 className=" border-t-4 border-x-4 rounded-md" value="tab2">
            Login
          </TabsTrigger1>
        </TabsList1>

        <TabsContent1 value="tab1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
                Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Create your new account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegisterSubmit}>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="space-y-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              </fieldset>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardFooter>
            </form>

        </TabsContent1>

        <TabsContent1 value="tab2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
                Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Please sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLoginSubmit}>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </CardContent>
              </fieldset>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardFooter>
            </form>
                    
        </TabsContent1>
      </TabsRoot>
  );
}