import { Bell, AlertTriangle, Info, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for alerts (in a real app, this would come from an API)
const alerts = [
  {
    id: 1,
    type: "Emergency",
    title: "Flash Flood Warning",
    description: "Heavy rainfall expected in low-lying areas. Please avoid travel if possible.",
    location: "Surat City Center",
    date: "2024-03-20",
    time: "15:30",
    severity: "high",
  },
  {
    id: 2,
    type: "Crime",
    title: "Suspicious Activity Reported",
    description: "Multiple reports of suspicious individuals in the area. Stay vigilant.",
    location: "Adajan Area",
    date: "2024-03-20",
    time: "14:45",
    severity: "medium",
  },
  {
    id: 3,
    type: "Traffic",
    title: "Major Road Closure",
    description: "Construction work on Ring Road. Expected delays of 30-45 minutes.",
    location: "Ring Road",
    date: "2024-03-20",
    time: "12:00",
    severity: "low",
  },
];

const SafetyAlerts = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5" />;
      case "crime":
        return <Bell className="h-5 w-5" />;
      case "traffic":
        return <Info className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Safety Alerts</h1>
            <p className="text-muted-foreground">
              Stay informed about important safety alerts in your area
            </p>
          </div>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Subscribe to Alerts
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="crime">Crime</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="city-center">City Center</SelectItem>
              <SelectItem value="adajan">Adajan</SelectItem>
              <SelectItem value="ring-road">Ring Road</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <CardTitle className="text-xl">{alert.title}</CardTitle>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{alert.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(`${alert.date} ${alert.time}`).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contacts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Police</h3>
                <p className="text-2xl font-bold">100</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Ambulance</h3>
                <p className="text-2xl font-bold">108</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Fire</h3>
                <p className="text-2xl font-bold">101</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyAlerts; 