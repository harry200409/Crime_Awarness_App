import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import Community from "./pages/Community";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReportIncident from "./pages/ReportIncident";
import SafetyAlerts from "./pages/SafetyAlerts";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "./contexts/NotificationContext";
import PoliceLogin from "./pages/PoliceLogin";
import PoliceDashboard from "./pages/police/Dashboard";

// Admin pages
import Detection from "./pages/admin/Detection";
import Prediction from "./pages/admin/Prediction";
import Analysis from "./pages/admin/Analysis";
import Forecast from "./pages/admin/Forecast";
import Dashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout><Outlet /></Layout>}>
                  <Route index element={<Home />} />
                  <Route path="news" element={<News />} />
                  <Route path="community" element={<Community />} />
                  <Route path="about" element={<About />} />
                  <Route path="report-incident" element={<ReportIncident />} />
                  <Route path="safety-alerts" element={<SafetyAlerts />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>

                {/* Police routes */}
                <Route path="/police/login" element={<Layout><PoliceLogin /></Layout>} />
                <Route path="/police/dashboard" element={<Layout><PoliceDashboard /></Layout>} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="detection" element={<Detection />} />
                  <Route path="prediction" element={<Prediction />} />
                  <Route path="analysis" element={<Analysis />} />
                  <Route path="forecast" element={<Forecast />} />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
