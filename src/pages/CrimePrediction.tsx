import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon configuration
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Surat coordinates
const SURAT_CENTER = [21.1702, 72.8311];
const SURAT_BOUNDS = [
  [21.0702, 72.7311], // Southwest
  [21.2702, 72.9311], // Northeast
];

const zones = [
  {
    name: "Athwa",
    coordinates: [21.1789, 72.8089],
    riskLevel: "moderate"
  },
  {
    name: "Rander",
    coordinates: [21.2088, 72.7947],
    riskLevel: "low"
  },
  {
    name: "Katargam",
    coordinates: [21.2229, 72.8339],
    riskLevel: "high"
  },
  {
    name: "Varachha",
    coordinates: [21.2041, 72.8724],
    riskLevel: "moderate"
  },
  {
    name: "Udhna",
    coordinates: [21.1702, 72.8411],
    riskLevel: "high"
  },
  {
    name: "Limbayat",
    coordinates: [21.1789, 72.8589],
    riskLevel: "moderate"
  },
  {
    name: "Sarthana",
    coordinates: [21.2229, 72.8911],
    riskLevel: "low"
  },
  {
    name: "Adajan",
    coordinates: [21.1889, 72.7947],
    riskLevel: "low"
  },
];

const CrimePrediction = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate prediction calculation
    // In real application, this would make an API call to your ML model
    setTimeout(() => {
      const randomPrediction = Math.floor(Math.random() * 100);
      setPrediction(randomPrediction);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crime Prediction</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Form */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone">Zone</Label>
                <Select 
                  required
                  value={selectedZone}
                  onValueChange={setSelectedZone}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((zone) => (
                      <SelectItem key={zone.name} value={zone.name.toLowerCase()}>
                        {zone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Specific Location</Label>
                <Input 
                  id="location" 
                  placeholder="Enter specific location or landmark"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Predict Crime Probability"}
              </Button>
            </form>

            {prediction !== null && (
              <div className="mt-6 p-4 border rounded-lg bg-muted">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Crime Probability</h3>
                    <p className="text-3xl font-bold mt-2">{prediction}%</p>
                  </div>
                  <AlertTriangle 
                    className={`h-12 w-12 ${
                      prediction > 70 
                        ? "text-red-500" 
                        : prediction > 30 
                        ? "text-yellow-500" 
                        : "text-green-500"
                    }`} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {prediction > 70 
                    ? "High risk area. Extra caution advised." 
                    : prediction > 30 
                    ? "Moderate risk. Stay alert." 
                    : "Lower risk area. Normal precautions advised."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Card */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] w-full rounded-lg overflow-hidden border">
              <MapContainer
                center={SURAT_CENTER as [number, number]}
                zoom={12}
                maxBounds={SURAT_BOUNDS as [[number, number], [number, number]]}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {zones.map((zone) => (
                  <Marker 
                    key={zone.name}
                    position={zone.coordinates as [number, number]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{zone.name}</h3>
                        <p className={`text-sm ${
                          zone.riskLevel === "high" 
                            ? "text-red-500" 
                            : zone.riskLevel === "moderate"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}>
                          Risk Level: {zone.riskLevel.charAt(0).toUpperCase() + zone.riskLevel.slice(1)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrimePrediction; 