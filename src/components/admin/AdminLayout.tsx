import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { BarChart3, Shield, Brain, LineChart, LogOut, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/admin/detection"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span>Detection</span>
            </Link>
            <Link
              to="/admin/prediction"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Brain className="h-5 w-5" />
              <span>Prediction</span>
            </Link>
            <Link
              to="/admin/analysis"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analysis</span>
            </Link>
            <Link
              to="/admin/forecast"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Forecast</span>
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
} 