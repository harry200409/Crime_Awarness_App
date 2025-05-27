import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngTuple } from "leaflet";

// Create a custom icon using inline SVG
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDBaIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Surat coordinates
const SURAT_CENTER: LatLngTuple = [21.1702, 72.8311];
const DEFAULT_ZOOM = 12;

interface CrimeLocation {
  id: number;
  location: LatLngTuple;
  title: string;
  description: string;
}

// Sample crime data - replace with real data from your backend
const sampleCrimes: CrimeLocation[] = [
  {
    id: 1,
    location: [21.1702, 72.8311],
    title: "Sample Crime 1",
    description: "Description of crime 1",
  },
  {
    id: 2,
    location: [21.1852, 72.8111],
    title: "Sample Crime 2",
    description: "Description of crime 2",
  },
];

const CrimeMap: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-police" />
          Crime Map - Surat
        </CardTitle>
        <CardDescription>
          Recent reported incidents across Surat city
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-md overflow-hidden">
          <MapContainer
            center={SURAT_CENTER as [number, number]}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {sampleCrimes.map((crime) => (
              <Marker 
                key={crime.id} 
                position={crime.location}
                icon={customIcon}
              >
                <Popup>
                  <h3 className="font-semibold">{crime.title}</h3>
                  <p>{crime.description}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrimeMap;
