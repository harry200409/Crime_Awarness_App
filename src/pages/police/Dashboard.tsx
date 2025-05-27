import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileText,
  BarChart3,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with actual data from your backend
const sampleCases = [
  {
    id: 1,
    type: "Theft",
    location: "Adajan",
    date: "2024-03-20",
    status: "pending",
    priority: "high",
    description: "Mobile phone theft reported near Adajan market",
  },
  {
    id: 2,
    type: "Vandalism",
    location: "Vesu",
    date: "2024-03-19",
    status: "investigating",
    priority: "medium",
    description: "Property damage reported at Vesu residential complex",
  },
  {
    id: 3,
    type: "Assault",
    location: "City Light",
    date: "2024-03-18",
    status: "resolved",
    priority: "high",
    description: "Physical altercation between two individuals",
  },
];

const analyticsData = [
  { name: 'Theft', count: 15 },
  { name: 'Assault', count: 8 },
  { name: 'Vandalism', count: 12 },
  { name: 'Traffic', count: 20 },
  { name: 'Others', count: 5 },
];

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [filteredCases, setFilteredCases] = useState(sampleCases);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("policeAuth") === "true";
    if (!isAuthenticated) {
      navigate("/police/login");
    }

    // Apply filters
    let filtered = [...sampleCases];
    if (statusFilter !== "all") {
      filtered = filtered.filter((case_) => case_.status === statusFilter);
    }
    if (priorityFilter !== "all") {
      filtered = filtered.filter((case_) => case_.priority === priorityFilter);
    }
    setFilteredCases(filtered);
  }, [statusFilter, priorityFilter, navigate]);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      investigating: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return <Badge className={statusStyles[status as keyof typeof statusStyles]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-orange-100 text-orange-800",
      low: "bg-gray-100 text-gray-800",
    };
    return <Badge className={priorityStyles[priority as keyof typeof priorityStyles]}>{priority}</Badge>;
  };

  const handleLogout = () => {
    localStorage.removeItem("policeAuth");
    navigate("/police/login");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-police" />
          <div>
            <h1 className="text-2xl font-bold">Police Dashboard</h1>
            <p className="text-muted-foreground">Manage cases and view analytics</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleCases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleCases.filter((c) => c.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investigating</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleCases.filter((c) => c.status === "investigating").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sampleCases.filter((c) => c.status === "resolved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Case Analytics</CardTitle>
            <CardDescription>Distribution of cases by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleCases.slice(0, 3).map((case_) => (
                <div key={case_.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                  <div className="flex-1">
                    <h4 className="font-semibold">{case_.type}</h4>
                    <p className="text-sm text-muted-foreground">{case_.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {case_.location}
                      <Calendar className="h-4 w-4 ml-2" />
                      {case_.date}
                    </div>
                  </div>
                  {getStatusBadge(case_.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>View and manage all reported cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell>{case_.id}</TableCell>
                    <TableCell>{case_.type}</TableCell>
                    <TableCell>{case_.location}</TableCell>
                    <TableCell>{case_.date}</TableCell>
                    <TableCell>{getStatusBadge(case_.status)}</TableCell>
                    <TableCell>{getPriorityBadge(case_.priority)}</TableCell>
                    <TableCell className="max-w-xs truncate">{case_.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoliceDashboard; 