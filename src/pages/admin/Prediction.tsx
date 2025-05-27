import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample prediction data - replace with actual data from your ML model
const predictionData = [
  { area: 'Varachha', current: 45, predicted: 52 },
  { area: 'Adajan', current: 38, predicted: 35 },
  { area: 'Katargam', current: 32, predicted: 40 },
  { area: 'Vesu', current: 28, predicted: 25 },
];

const riskAssessments = [
  {
    id: 1,
    area: 'Varachha',
    riskLevel: 'High',
    factors: ['Previous incidents', 'Population density', 'Time of year'],
    prediction: '15% increase in theft cases expected'
  },
  {
    id: 2,
    area: 'Adajan',
    riskLevel: 'Medium',
    factors: ['Economic indicators', 'Recent patterns'],
    prediction: 'Stable crime rate with minor fluctuations'
  },
];

const Prediction = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crime Prediction</h1>
      
      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forecast">Crime Forecast</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Crime Forecast Analysis</CardTitle>
              <CardDescription>Current vs Predicted Crime Rates by Area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current Rate" />
                    <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Rate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Area-wise crime risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {riskAssessments.map((assessment) => (
                    <Card key={assessment.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{assessment.area}</h3>
                          <Badge variant={
                            assessment.riskLevel === 'High' ? 'destructive' :
                            assessment.riskLevel === 'Medium' ? 'secondary' : 'default'
                          }>
                            {assessment.riskLevel} Risk
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contributing Factors:</p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {assessment.factors.map((factor, index) => (
                              <Badge key={index} variant="outline">{factor}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{assessment.prediction}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
              <CardDescription>Long-term crime trend predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold">Seasonal Pattern Detected</h3>
                  <p className="text-sm text-gray-500">
                    Historical data suggests a 20% increase in street crimes during festival seasons
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </Card>
                <Card className="p-4 border-l-4 border-green-500">
                  <h3 className="font-semibold">Improving Trend</h3>
                  <p className="text-sm text-gray-500">
                    Vehicle theft cases predicted to decrease by 15% in next quarter
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prediction; 