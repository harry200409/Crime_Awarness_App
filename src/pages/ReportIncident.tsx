import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Clock, Camera, Upload } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon configuration
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDBaIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Surat coordinates
const SURAT_CENTER: [number, number] = [21.1702, 72.8311];

const incidentTypes = [
  "Theft",
  "Assault",
  "Vandalism",
  "Suspicious Activity",
  "Traffic Violation",
  "Cybercrime",
  "Drug-related",
  "Other"
];

// LocationMarker component for handling map clicks
const LocationMarker = ({ onLocationSelect }: { onLocationSelect: (latlng: [number, number]) => void }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
    },
  });
  return null;
};

const ReportIncident = () => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [locationAddress, setLocationAddress] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Function to get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error getting address:", error);
      return "Location selected on map";
    }
  };

  // Function to handle getting current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          const address = await getAddressFromCoordinates(latitude, longitude);
          setLocationAddress(address);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Error",
            description: "Could not get your current location. Please try again or enter manually.",
            variant: "destructive",
          });
          setIsGettingLocation(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsGettingLocation(false);
    }
  };

  const handleLocationSelect = async (newLocation: [number, number]) => {
    setLocation(newLocation);
    const address = await getAddressFromCoordinates(newLocation[0], newLocation[1]);
    setLocationAddress(address);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!location) {
      toast({
        title: "Error",
        description: "Please select a location for the incident",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast to the user
      toast({
        title: "Report Submitted",
        description: "Thank you for your report. Authorities have been notified.",
      });

      // Send notification to admin
      addNotification({
        title: "New Incident Report",
        message: `A new incident has been reported at ${locationAddress}. Requires immediate attention.`,
        type: "warning",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
      setImages(null);
      setZipFile(null);
      setLocation(null);
      setLocationAddress("");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report an Incident</h1>
        <p className="text-muted-foreground mb-6">
          Help keep our community safe by reporting incidents. Your report will be handled confidentially.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help authorities respond effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Incident Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Select location on map or use current location"
                      value={locationAddress}
                      readOnly
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                    >
                      <MapPin className={`h-4 w-4 ${isGettingLocation ? 'animate-pulse' : ''}`} />
                    </Button>
                  </div>
                  <div className="h-[300px] w-full rounded-md overflow-hidden border">
                    <MapContainer
                      center={location || SURAT_CENTER}
                      zoom={13}
                      scrollWheelZoom={false}
                      className="h-full w-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationMarker onLocationSelect={handleLocationSelect} />
                      {location && (
                        <Marker position={location} icon={customIcon}>
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-semibold">Selected Location</h3>
                              <p className="text-sm">{locationAddress}</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on the map to select location or use the location button to use your current location
                  </p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Input
                      id="time"
                      type="time"
                      required
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the incident"
                  required
                  className="min-h-[120px]"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="images">Images (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("camera-upload")?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => setImages(e.target.files)}
                />
                <input
                  id="camera-upload"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => setImages(e.target.files)}
                />
                {images && (
                  <p className="text-sm text-muted-foreground">
                    {images.length} {images.length === 1 ? "image" : "images"} selected
                  </p>
                )}
              </div>

              {/* Zip File Upload */}
              <div className="space-y-2">
                <Label htmlFor="zip">Upload Zip File (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("zip-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Zip File
                  </Button>
                </div>
                <input
                  id="zip-upload"
                  type="file"
                  accept=".zip"
                  className="hidden"
                  onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                />
                {zipFile && (
                  <p className="text-sm text-muted-foreground">
                    {zipFile.name} selected
                  </p>
                )}
              </div>

              {/* Emergency Contact */}
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Emergency Contacts:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Police: 100</li>
                  <li>Ambulance: 108</li>
                  <li>Fire: 101</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Report..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIncident; 