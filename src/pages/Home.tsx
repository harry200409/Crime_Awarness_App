import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Surat Crime Connect</h1>
          <p className="text-xl text-muted-foreground">
            Keeping our community safe through awareness and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Report Incidents
              </CardTitle>
              <CardDescription>
                Report crimes and suspicious activities in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/report-incident">Report Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Safety Alerts
              </CardTitle>
              <CardDescription>
                Stay informed about safety concerns in your neighborhood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/safety-alerts">View Alerts</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Community Safety
              </CardTitle>
              <CardDescription>
                Learn about safety initiatives and crime prevention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/community">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>
              Important numbers for immediate assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <h3 className="font-semibold mb-2">Police</h3>
                <p className="text-2xl font-bold">100</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <h3 className="font-semibold mb-2">Ambulance</h3>
                <p className="text-2xl font-bold">108</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <h3 className="font-semibold mb-2">Fire</h3>
                <p className="text-2xl font-bold">101</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
            <CardDescription>
              Recent news and safety alerts in Surat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Bell className="h-5 w-5" />
                <div>
                  <h4 className="font-semibold">Community Safety Meeting</h4>
                  <p className="text-sm text-muted-foreground">
                    Join us this Saturday for a community safety awareness program
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <AlertTriangle className="h-5 w-5" />
                <div>
                  <h4 className="font-semibold">Traffic Advisory</h4>
                  <p className="text-sm text-muted-foreground">
                    Major road work on Ring Road - expect delays
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home; 