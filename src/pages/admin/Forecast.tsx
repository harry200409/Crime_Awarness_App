import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample forecast data
const yearlyForecast = [
  { year: '2022', actual: 450, forecast: null },
  { year: '2023', actual: 420, forecast: null },
  { year: '2024', actual: 380, forecast: 380 },
  { year: '2025', actual: null, forecast: 350 },
  { year: '2026', actual: null, forecast: 330 },
  { year: '2027', actual: null, forecast: 310 },
];

const areaForecasts = [
  {
    id: 1,
    area: 'Varachha',
    currentTrend: 'Decreasing',
    forecast: '15% reduction expected by 2025',
    confidenceLevel: 'High',
    factors: ['Increased policing', 'Community engagement', 'CCTV coverage']
  },
  {
    id: 2,
    area: 'Adajan',
    currentTrend: 'Stable',
    forecast: 'Expected to maintain current levels',
    confidenceLevel: 'Medium',
    factors: ['Population stability', 'Economic factors']
  },
];

const seasonalPatterns = [
  {
    season: 'Festival Season',
    riskLevel: 'High',
    description: 'Historical data shows increased theft during festivals',
    recommendations: [
      'Increase police presence in crowded areas',
      'Public awareness campaigns',
      'Special patrol units'
    ]
  },
  {
    season: 'Summer',
    riskLevel: 'Medium',
    description: 'Moderate increase in street crimes',
    recommendations: [
      'Focus on tourist areas',
      'Night patrols',
      'Community watch programs'
    ]
  }
];

const Forecast = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crime Forecast</h1>
      
      <Tabs defaultValue="yearly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="yearly">Yearly Forecast</TabsTrigger>
          <TabsTrigger value="area">Area-wise Forecast</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle>Long-term Crime Forecast</CardTitle>
              <CardDescription>Historical data and future predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      name="Actual Crime Rate"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#82ca9d"
                      name="Forecasted Rate"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle>Area-wise Forecasts</CardTitle>
              <CardDescription>Detailed area-based crime predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {areaForecasts.map((forecast) => (
                    <Card key={forecast.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{forecast.area}</h3>
                          <Badge variant="outline">
                            Confidence: {forecast.confidenceLevel}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Current Trend: </span>
                            {forecast.currentTrend}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">Forecast: </span>
                            {forecast.forecast}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contributing Factors:</p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {forecast.factors.map((factor, index) => (
                              <Badge key={index} variant="secondary">{factor}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Pattern Analysis</CardTitle>
              <CardDescription>Seasonal crime patterns and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {seasonalPatterns.map((pattern, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{pattern.season}</h3>
                          <Badge variant={
                            pattern.riskLevel === 'High' ? 'destructive' :
                            pattern.riskLevel === 'Medium' ? 'secondary' : 'default'
                          }>
                            {pattern.riskLevel} Risk
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{pattern.description}</p>
                        <div>
                          <p className="text-sm font-medium mb-2">Recommendations:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {pattern.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-gray-600">{rec}</li>
                            ))}
                          </ul>
                        </div>
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

export default Forecast; 