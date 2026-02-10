import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Plus,
  CheckCircle,
  ArrowLeft,
  Upload,
  Trash2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PhotoEntry {
  id: string;
  room: string;
  notes: string;
  timestamp: string;
  fileName: string;
}

const rooms = [
  "Kitchen",
  "Living Room",
  "Bedroom 1",
  "Bedroom 2",
  "Bathroom",
  "Hallway",
  "Entrance",
  "Laundry",
  "Basement",
  "Exterior",
  "Other",
];

const MoveInHelper = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoEntry[]>([
    {
      id: "1",
      room: "Kitchen",
      notes: "Small scratch on countertop near sink",
      timestamp: "2026-02-10 09:30 AM",
      fileName: "kitchen_counter.jpg",
    },
    {
      id: "2",
      room: "Bathroom",
      notes: "Caulking around tub is slightly discolored",
      timestamp: "2026-02-10 09:35 AM",
      fileName: "bathroom_tub.jpg",
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState("Kitchen");
  const [notes, setNotes] = useState("");

  const handleAddPhoto = () => {
    const newPhoto: PhotoEntry = {
      id: Date.now().toString(),
      room: selectedRoom,
      notes: notes,
      timestamp: new Date().toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      fileName: `${selectedRoom.toLowerCase().replace(" ", "_")}_${Date.now()}.jpg`,
    };
    setPhotos([...photos, newPhoto]);
    setNotes("");
    toast({
      title: "Photo logged",
      description: `${selectedRoom} documentation saved with timestamp.`,
    });
  };

  const handleRemove = (id: string) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/tenant/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Camera className="h-5 w-5 text-success" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-body text-foreground">
                Move-In Helper
              </h1>
              <p className="text-sm text-muted-foreground">
                Document your unit's condition with timestamped photos
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Add new photo */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-body text-foreground">
                Add Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Room / Area</Label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full mt-1.5 h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  {rooms.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Photo</Label>
                <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click or drag to upload
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe any existing damage or conditions..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <Button onClick={handleAddPhoto} className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Entry
              </Button>

              <div className="bg-accent/10 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Photos are automatically timestamped.
                  Document scratches, stains, appliance condition, and any
                  pre-existing damage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Photo log */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">
                Documentation Log ({photos.length} entries)
              </h2>
              {photos.length > 0 && (
                <Button variant="outline" size="sm">
                  Export PDF
                </Button>
              )}
            </div>

            {photos.length > 0 ? (
              <div className="space-y-3">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <Camera className="h-6 w-6 text-muted-foreground/40" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {photo.room}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {photo.timestamp}
                              </span>
                            </div>
                            <p className="text-sm text-foreground/80">
                              {photo.notes || "No notes added."}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {photo.fileName}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(photo.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Camera className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-semibold text-foreground">
                    No photos yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start documenting your unit's condition.
                  </p>
                </CardContent>
              </Card>
            )}

            {photos.length > 0 && (
              <Card className="mt-4 border-success/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Your documentation is saved
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All entries are timestamped and stored securely.
                      You can export a PDF report for your records.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoveInHelper;
