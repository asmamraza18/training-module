import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, ArrowRight, ShieldCheck, Wrench } from "lucide-react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-6 md:py-24 lg:py-32 xl:py-48 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                  WELCOME TO HYE UniKL MITEC
                </h1>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl text-gray-600 dark:text-blue-400">
                  Job Safety Analysis (Welding Machine) Training Module
                </h2>
                <p className="mx-auto max-w-[800px] text-gray-600 md:text-xl dark:text-gray-300 mt-4">
                  Comprehensive safety training for welding professionals. Learn critical safety protocols, risk
                  assessment, and best practices to ensure a secure working environment.
                </p>
              </div>
              <div className="space-x-4 mt-6">
                <Button asChild>
                  <Link to="/auth">Start Training</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">Safety Modules</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Key Safety Training Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <ShieldCheck className="w-8 h-8 mb-2 text-gray-600" />
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  Comprehensive analysis of potential hazards in welding environments. Learn to identify and mitigate
                  risks before they become accidents.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Wrench className="w-8 h-8 mb-2 text-gray-600" />
                  <CardTitle>Equipment Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  Detailed training on proper welding machine handling, maintenance, and protective equipment usage.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-8 h-8 mb-2 text-gray-600" />
                  <CardTitle>Personal Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  Essential guidelines for personal protective equipment (PPE) and safe working practices in welding
                  environments.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Prioritize Your Safety Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
                  Empower yourself with critical welding safety knowledge. Protect yourself and your colleagues with
                  comprehensive training.
                </p>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/auth">
                  Access Training Modules <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Hye UniKL MITEC. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Safety Policies
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Training Disclaimer
          </Link>
        </nav>
      </footer>
    </div>
  );
}
