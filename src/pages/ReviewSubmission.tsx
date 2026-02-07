import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { properties } from "@/data/mockData";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ReviewSubmission = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property") || "";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState({
    maintenance: 0,
    communication: 0,
    value: 0,
    safety: 0,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const property = properties.find((p) => p.id === propertyId);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <p className="text-muted-foreground mb-6">
              Thank you for helping the PEI rental community. You earned 50 points!
            </p>
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
          {property && (
            <p className="text-muted-foreground mb-6">
              Reviewing: {property.address}, {property.city}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Overall rating */}
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

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review (+50 points)"}
            </Button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ReviewSubmission;
