import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, AlertTriangle, FileBarChart, Users, TrendingUp, TrendingDown, Clock, MapPin } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const crimeOverTime = [
  { month: 'Jan', violent: 65, property: 120, cyber: 45 },
  { month: 'Feb', violent: 59, property: 110, cyber: 48 },
  { month: 'Mar', violent: 80, property: 140, cyber: 52 },
  { month: 'Apr', violent: 81, property: 135, cyber: 55 },
  { month: 'May', violent: 56, property: 125, cyber: 58 },
  { month: 'Jun', violent: 55, property: 115, cyber: 49 },
];

const crimeDistribution = [
  { name: 'Violent Crime', value: 30 },
  { name: 'Property Crime', value: 45 },
  { name: 'Cybercrime', value: 25 },
];

const responseTime = [
  { time: '0-5', count: 30 },
  { time: '5-10', count: 45 },
  { time: '10-15', count: 25 },
  { time: '15-20', count: 15 },
  { time: '20+', count: 5 },
];

const patrolEfficiency = [
  { name: 'Zone A', efficiency: 85 },
  { name: 'Zone B', efficiency: 75 },
  { name: 'Zone C', efficiency: 90 },
  { name: 'Zone D', efficiency: 70 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentIncidents = [
  {
    id: 1,
    type: 'Theft',
    location: 'Adajan Road',
    time: '2 hours ago',
    status: 'Under Investigation'
  },
  {
    id: 2,
    type: 'Cybercrime',
    location: 'Vesu',
    time: '4 hours ago',
    status: 'Resolved'
  },
  {
    id: 3,
    type: 'Assault',
    location: 'City Light',
    time: '6 hours ago',
    status: 'Pending'
  },
  {
    id: 4,
    type: 'Vandalism',
    location: 'Athwa',
    time: '8 hours ago',
    status: 'Under Investigation'
  }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Crime Analytics Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Incidents</p>
                <h3 className="text-2xl font-bold mt-2">1,069</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" /> 12% decrease
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Patrols</p>
                <h3 className="text-2xl font-bold mt-2">24</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" /> 8% increase
                </p>
              </div>
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <h3 className="text-2xl font-bold mt-2">8.5 min</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" /> 15% faster
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Case Resolution</p>
                <h3 className="text-2xl font-bold mt-2">82%</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" /> 5% improvement
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crime Trends */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Crime Trends Over Time</CardTitle>
            <CardDescription>Monthly breakdown by crime type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crimeOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="violent" 
                    stackId="1"
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="Violent Crime"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="property" 
                    stackId="1"
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Property Crime"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cyber" 
                    stackId="1"
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    name="Cybercrime"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crime Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Type Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crimeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {crimeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
            <CardDescription>Time taken to respond (minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{incident.type}</h4>
                    <p className="text-sm text-muted-foreground">{incident.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{incident.time}</p>
                    <p className={`text-sm ${
                      incident.status === 'Resolved' 
                        ? 'text-green-500' 
                        : incident.status === 'Pending' 
                        ? 'text-yellow-500' 
                        : 'text-blue-500'
                    }`}>
                      {incident.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 