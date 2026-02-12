import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  DollarSign,
  Camera,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { peiSchoolZones } from "@/data/school-zones";
import { standardAmenities } from "@/data/property-details";

const ListProperty = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [selectedProperty, setSelectedProperty] = useState("");
  const [askingRent, setAskingRent] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [description, setDescription] = useState("");
  const [petPolicy, setPetPolicy] = useState("");
  const [parking, setParking] = useState("");
  const [leaseLength, setLeaseLength] = useState("");
  const [heatIncluded, setHeatIncluded] = useState(false);
  const [waterIncluded, setWaterIncluded] = useState(false);
  const [internetIncluded, setInternetIncluded] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [allowInquiries, setAllowInquiries] = useState(true);
  const [selectedSchoolZones, setSelectedSchoolZones] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleSchoolZone = (id: string) =>
    setSelectedSchoolZones((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleAmenity = (key: string) =>
    setSelectedAmenities((prev) => prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Listing published!",
      description: "Your property is now visible to tenants on RentMinder.",
    });
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-16 text-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-body text-foreground mb-2">
              Listing Published!
            </h1>
            <p className="text-muted-foreground mb-6">
              Tenants can now find and inquire about your property on RentMinder.
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link to="/landlord/dashboard">Back to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/landlord/list-property">List Another</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/landlord/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-body text-foreground">
                List Property for Rent
              </h1>
              <p className="text-sm text-muted-foreground">
                Make your property visible to PEI renters
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-body text-foreground">
                Property & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Property</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a claimed property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">42 University Ave, Charlottetown</SelectItem>
                    <SelectItem value="p2">15 Queen St, Charlottetown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Asking Rent ($/month)</Label>
                  <Input
                    type="number"
                    value={askingRent}
                    onChange={(e) => setAskingRent(e.target.value)}
                    placeholder="1250"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label>Available Date</Label>
                  <Input
                    type="date"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Lease Length</Label>
                <Select value={leaseLength} onValueChange={setLeaseLength}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month-to-month</SelectItem>
                    <SelectItem value="6months">6 months</SelectItem>
                    <SelectItem value="1year">1 year</SelectItem>
                    <SelectItem value="2years">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Listing Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what makes this property great for tenants..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-body text-foreground">
                Details & Inclusions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Pet Policy</Label>
                  <Select value={petPolicy} onValueChange={setPetPolicy}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allowed">Pets Allowed</SelectItem>
                      <SelectItem value="cats">Cats Only</SelectItem>
                      <SelectItem value="no">No Pets</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Parking</Label>
                  <Select value={parking} onValueChange={setParking}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="included">Included</SelectItem>
                      <SelectItem value="extra">Available (extra)</SelectItem>
                      <SelectItem value="street">Street Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Utilities Included</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="heat" checked={heatIncluded} onCheckedChange={(c) => setHeatIncluded(!!c)} />
                    <Label htmlFor="heat" className="text-sm font-normal">Heat</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="water" checked={waterIncluded} onCheckedChange={(c) => setWaterIncluded(!!c)} />
                    <Label htmlFor="water" className="text-sm font-normal">Water</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="internet" checked={internetIncluded} onCheckedChange={(c) => setInternetIncluded(!!c)} />
                    <Label htmlFor="internet" className="text-sm font-normal">Internet</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label>Photos</Label>
                <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                  <Camera className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload listing photos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-body text-foreground">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {standardAmenities.map((am) => (
                  <div key={am.key} className="flex items-center gap-2">
                    <Checkbox
                      id={`am-${am.key}`}
                      checked={selectedAmenities.includes(am.key)}
                      onCheckedChange={() => toggleAmenity(am.key)}
                    />
                    <Label htmlFor={`am-${am.key}`} className="text-sm font-normal cursor-pointer">{am.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* School Zones */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-body text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />School Zones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">Select all schools in the catchment area for this property.</p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {peiSchoolZones.map((sz) => (
                  <div key={sz.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`sz-${sz.id}`}
                      checked={selectedSchoolZones.includes(sz.id)}
                      onCheckedChange={() => toggleSchoolZone(sz.id)}
                    />
                    <Label htmlFor={`sz-${sz.id}`} className="text-sm font-normal cursor-pointer flex-1">
                      {sz.name} <span className="text-xs text-muted-foreground">({sz.grades} · {sz.city})</span>
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSchoolZones.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedSchoolZones.map((id) => {
                    const sz = peiSchoolZones.find((s) => s.id === id);
                    return sz ? <Badge key={id} variant="secondary" className="text-xs">{sz.name}</Badge> : null;
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-body text-foreground">
                Contact & Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="inquiries"
                  checked={allowInquiries}
                  onCheckedChange={(c) => setAllowInquiries(!!c)}
                />
                <Label htmlFor="inquiries" className="text-sm font-normal cursor-pointer">
                  <MessageSquare className="inline h-3.5 w-3.5 mr-1" />
                  Allow in-app inquiries from tenants
                </Label>
              </div>
              <div>
                <Label>External Listing URL (optional)</Label>
                <Input
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://kijiji.ca/... or https://realtor.ca/..."
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  <ExternalLink className="inline h-3 w-3 mr-0.5" />
                  Link to your listing on another platform
                </p>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            Publish Listing
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ListProperty;
