import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample data for crime analysis
const crimeDistribution = [
  { name: 'Theft', value: 35 },
  { name: 'Assault', value: 25 },
  { name: 'Fraud', value: 20 },
  { name: 'Vandalism', value: 15 },
  { name: 'Others', value: 5 },
];

const timeAnalysis = [
  { time: '00-04', count: 15 },
  { time: '04-08', count: 8 },
  { time: '08-12', count: 20 },
  { time: '12-16', count: 25 },
  { time: '16-20', count: 30 },
  { time: '20-24', count: 22 },
];

const demographicData = [
  {
    id: 1,
    category: 'Age Group',
    data: [
      { group: '18-25', percentage: 28 },
      { group: '26-35', percentage: 35 },
      { group: '36-45', percentage: 22 },
      { group: '46+', percentage: 15 },
    ]
  },
  {
    id: 2,
    category: 'Gender',
    data: [
      { group: 'Male', percentage: 65 },
      { group: 'Female', percentage: 35 },
    ]
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analysis = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crime Analysis</h1>
      
      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">Crime Distribution</TabsTrigger>
          <TabsTrigger value="temporal">Temporal Analysis</TabsTrigger>
          <TabsTrigger value="demographic">Demographic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Crime Type Distribution</CardTitle>
              <CardDescription>Distribution of different types of crimes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={crimeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {crimeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temporal">
          <Card>
            <CardHeader>
              <CardTitle>Time-based Analysis</CardTitle>
              <CardDescription>Crime incidents by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Incidents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographic">
          <Card>
            <CardHeader>
              <CardTitle>Demographic Analysis</CardTitle>
              <CardDescription>Crime patterns by demographic factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {demographicData.map((category) => (
                    <Card key={category.id} className="p-4">
                      <h3 className="font-semibold mb-4">{category.category} Distribution</h3>
                      <div className="space-y-2">
                        {category.data.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.group}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500">{item.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis; 