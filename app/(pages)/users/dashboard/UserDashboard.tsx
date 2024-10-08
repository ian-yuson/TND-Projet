"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Instagram,
  Facebook,
  MessageSquare,
  User,
  ClipboardList,
  CheckSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useState } from "react";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export function UserDashboard() {
  // State to track which component to display
  const [activeComponent, setActiveComponent] = useState("Profile");

  // Function to handle component selection
  const renderComponent = () => {
    switch (activeComponent) {
      case "Analytics":
        return <h1>Analytics</h1>;
      case "AvailableExams":
        return <h1>Available Exams</h1>;
      case "TakenExams":
        return <h1>Taken Exams</h1>;
      case "Profile":
      default:
        return <h1>Default</h1>;
    }
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">TND Incorporation</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="#"
                onClick={() => setActiveComponent("Analytics")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ClipboardList className="h-4 w-4" />
                Available Exam's
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CheckSquare className="h-4 w-4" />
                Taken Exam's
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Challenge a friend's
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected with us on social media.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="ghost" asChild>
                  <Link href="https://www.instagram.com" target="_blank">
                    <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="https://www.facebook.com" target="_blank">
                    <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="https://discord.com" target="_blank">
                    <MessageSquare className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ClipboardList className="h-5 w-5" />
                  Available Exam's
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <CheckSquare className="h-5 w-5" />
                  Taken Exam's
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Challenge a friend's
                </Link>
              </nav>
              <div className="mt-auto">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                    <CardDescription>
                      Stay connected with us on social media.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-4">
                    <Button variant="ghost" asChild>
                      <Link href="https://www.instagram.com" target="_blank">
                        <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href="https://www.facebook.com" target="_blank">
                        <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href="https://discord.com" target="_blank">
                        <MessageSquare className="h-6 w-6 text-muted-foreground hover:text-primary" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* Render the selected component */}
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}
