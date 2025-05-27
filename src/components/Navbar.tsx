import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Shield, MapPin, Bell, Menu, X, AlertTriangle, LogIn } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationBell } from "./NotificationBell";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "News", href: "/news" },
    { title: "Report Incident", href: "/report-incident" },
    { title: "Safety Alerts", href: "/safety-alerts" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-police" />
            <span className="font-bold text-xl">Crime Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/police/login"
                className="flex items-center gap-2 text-police hover:text-police/80 font-medium"
              >
                <Shield className="h-5 w-5" />
                <span>Police Portal</span>
              </Link>
              <NotificationBell />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                to="/login"
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/police/login"
                className="flex items-center gap-2 text-police hover:text-police/80 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-5 w-5" />
                <span>Police Portal</span>
              </Link>
              <div className="flex items-center gap-4 pt-4">
                <NotificationBell />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 