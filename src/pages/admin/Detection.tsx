import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample data - replace with actual data from your backend
const patternData = [
  { month: 'Jan', theft: 65, assault: 28, fraud: 42 },
  { month: 'Feb', theft: 59, assault: 32, fraud: 38 },
  { month: 'Mar', theft: 80, assault: 41, fraud: 45 },
  { month: 'Apr', theft: 81, assault: 34, fraud: 52 },
  { month: 'May', theft: 56, assault: 29, fraud: 48 },
  { month: 'Jun', theft: 55, assault: 25, fraud: 44 },
];

const hotspots = [
  { id: 1, area: 'Varachha', crimeType: 'Theft', incidents: 25, riskLevel: 'High' },
  { id: 2, area: 'Adajan', crimeType: 'Assault', incidents: 18, riskLevel: 'Medium' },
  { id: 3, area: 'Katargam', crimeType: 'Fraud', incidents: 15, riskLevel: 'Medium' },
  { id: 4, area: 'Vesu', crimeType: 'Theft', incidents: 12, riskLevel: 'Low' },
];

const Detection = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crime Pattern Detection</h1>
      
      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patterns">Crime Patterns</TabsTrigger>
          <TabsTrigger value="hotspots">Crime Hotspots</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle>Crime Pattern Analysis</CardTitle>
              <CardDescription>Monthly crime patterns across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patternData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="theft" stroke="#8884d8" />
                    <Line type="monotone" dataKey="assault" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="fraud" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotspots">
          <Card>
            <CardHeader>
              <CardTitle>Crime Hotspots</CardTitle>
              <CardDescription>Areas with high crime activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {hotspots.map((hotspot) => (
                    <Card key={hotspot.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{hotspot.area}</h3>
                          <p className="text-sm text-gray-500">{hotspot.crimeType}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={
                            hotspot.riskLevel === 'High' ? 'destructive' :
                            hotspot.riskLevel === 'Medium' ? 'warning' : 'default'
                          }>
                            {hotspot.riskLevel}
                          </Badge>
                          <span className="text-sm font-medium">
                            {hotspot.incidents} incidents
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Unusual patterns and outliers in crime data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Card className="p-4 border-l-4 border-yellow-500">
                    <h3 className="font-semibold">Sudden Spike in Theft Cases</h3>
                    <p className="text-sm text-gray-500">80% increase in Varachha area compared to last month</p>
                    <Button variant="outline" size="sm" className="mt-2">Investigate</Button>
                  </Card>
                  <Card className="p-4 border-l-4 border-red-500">
                    <h3 className="font-semibold">Unusual Pattern Detected</h3>
                    <p className="text-sm text-gray-500">Multiple fraud cases reported in Adajan within 24 hours</p>
                    <Button variant="outline" size="sm" className="mt-2">Investigate</Button>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Detection; 