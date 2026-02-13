import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { properties } from "@/data/mockData";
import { ArrowLeft, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock: properties the current user has confirmed living in
const confirmedProperties = [
  { propertyId: "p1", address: "42 University Ave, Charlottetown", hasReview: false },
  { propertyId: "p2", address: "15 Queen St, Charlottetown", hasReview: true },
  { propertyId: "p3", address: "88 Water St, Summerside", hasReview: false },
];

const ReviewSubmission = () => {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("property") || "";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedPropertyId, setSelectedPropertyId] = useState(preselectedId);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState({
    maintenance: 0,
    communication: 0,
    value: 0,
    safety: 0,
  });
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [leaseEndDate, setLeaseEndDate] = useState("");
  const [heatIncluded, setHeatIncluded] = useState(false);
  const [electricityIncluded, setElectricityIncluded] = useState(false);
  const [parkingIncluded, setParkingIncluded] = useState(false);
  const [internetIncluded, setInternetIncluded] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [postAnonymously, setPostAnonymously] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedConfirmed = confirmedProperties.find(
    (cp) => cp.propertyId === selectedPropertyId
  );
  const alreadyReviewed = selectedConfirmed?.hasReview ?? false;
  const property = properties.find((p) => p.id === selectedPropertyId);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPropertyId) {
      toast({ title: "Please select a property", variant: "destructive" });
      return;
    }
    if (alreadyReviewed) {
      toast({
        title: "Already reviewed",
        description: "You can only submit one review per property. Please edit your existing review instead.",
        variant: "destructive",
      });
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    if (wordCount < 100) {
      toast({
        title: "Review too short",
        description: `Please write at least 100 words (currently ${wordCount}).`,
        variant: "destructive",
      });
      return;
    }
    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "You must agree to the Terms & Conditions to submit a review.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({ title: "Review submitted!", description: "+50 points earned!" });
    }, 1500);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-body text-foreground mb-2">
              Review Submitted!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for helping the PEI rental community. You earned 50 points!
            </p>
            {postAnonymously && (
              <p className="text-sm text-muted-foreground mb-4">
                Your review will be displayed as <span className="font-semibold">Verified Anonymous Renter</span>.
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link to="/profile">View Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/search">Browse Properties</Link>
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
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold font-body text-foreground mb-1">Write a Review</h1>
          <p className="text-muted-foreground mb-6">
            Share your rental experience to help other PEI tenants.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property selection */}
            <Card>
              <CardContent className="p-5">
                <Label className="mb-3 block">Select Property *</Label>
                <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a property you've lived in" />
                  </SelectTrigger>
                  <SelectContent>
                    {confirmedProperties.map((cp) => (
                      <SelectItem key={cp.propertyId} value={cp.propertyId}>
                        {cp.address}
                        {cp.hasReview ? " (reviewed)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {alreadyReviewed && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      You've already reviewed this property.{" "}
                      <Link to="/profile" className="underline font-medium">
                        Edit your review
                      </Link>{" "}
                      instead.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lease details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground">
                  Lease Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="rentalStart">Rental Start Date *</Label>
                    <Input
                      id="rentalStart"
                      type="date"
                      value={rentalStartDate}
                      onChange={(e) => setRentalStartDate(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leaseEnd">Lease End Date</Label>
                    <Input
                      id="leaseEnd"
                      type="date"
                      value={leaseEndDate}
                      onChange={(e) => setLeaseEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">What was included in your rent?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox id="ri-heat" checked={heatIncluded} onCheckedChange={(c) => setHeatIncluded(!!c)} />
                      <Label htmlFor="ri-heat" className="text-sm font-normal cursor-pointer">Heat</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ri-elec" checked={electricityIncluded} onCheckedChange={(c) => setElectricityIncluded(!!c)} />
                      <Label htmlFor="ri-elec" className="text-sm font-normal cursor-pointer">Electricity</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ri-parking" checked={parkingIncluded} onCheckedChange={(c) => setParkingIncluded(!!c)} />
                      <Label htmlFor="ri-parking" className="text-sm font-normal cursor-pointer">Parking</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ri-internet" checked={internetIncluded} onCheckedChange={(c) => setInternetIncluded(!!c)} />
                      <Label htmlFor="ri-internet" className="text-sm font-normal cursor-pointer">Internet</Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="ri-furnished" checked={furnished} onCheckedChange={(c) => setFurnished(!!c)} />
                  <Label htmlFor="ri-furnished" className="text-sm font-normal cursor-pointer">Unit was furnished</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <Label className="mb-3 block">Overall Rating *</Label>
                <StarRating rating={rating} size="lg" interactive onChange={setRating} />
              </CardContent>
            </Card>

            {/* Category ratings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground">
                  Rate Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categories).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="capitalize">{key}</Label>
                    <StarRating
                      rating={val}
                      size="sm"
                      interactive
                      onChange={(v) => setCategories((prev) => ({ ...prev, [key]: v }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Written review */}
            <div>
              <Label htmlFor="title">Review Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <Label htmlFor="text">Your Review * (min 100 words)</Label>
                <span
                  className={`text-xs ${
                    wordCount >= 100 ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {wordCount}/100 words
                </span>
              </div>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience living at this property. What was the landlord like? How was maintenance handled? Would you recommend it?"
                rows={6}
                required
              />
            </div>

            {/* Document upload */}
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Upload rent documents (optional)</p>
              <p className="text-xs text-muted-foreground mt-1">
                Lease agreements, rent receipts, or increase notices
              </p>
              <Button variant="outline" size="sm" className="mt-3" type="button">
                Choose Files
              </Button>
            </div>

            {/* Anonymous posting */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="anonymous"
                    checked={postAnonymously}
                    onCheckedChange={(checked) => setPostAnonymously(checked === true)}
                  />
                  <div className="grid gap-1 leading-none">
                    <Label htmlFor="anonymous" className="cursor-pointer font-medium">
                      Post anonymously
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Your name will appear as <span className="font-semibold">"Verified Anonymous Renter"</span> on the property page. Your identity remains protected.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <div className="grid gap-1 leading-none">
                    <Label htmlFor="terms" className="cursor-pointer font-medium">
                      I agree to the Terms & Conditions *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By submitting, I confirm this review is truthful and based on my personal experience.{" "}
                      <Link to="/terms" className="text-primary underline">
                        Read full terms
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || alreadyReviewed}
            >
              {loading ? "Submitting..." : "Submit Review (+50 points)"}
            </Button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ReviewSubmission;
