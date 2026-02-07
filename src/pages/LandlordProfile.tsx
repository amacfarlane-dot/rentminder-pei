import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import PropertyCard from "@/components/shared/PropertyCard";
import { landlords, properties, reviews } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, CheckCircle, MessageSquare, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const LandlordProfile = () => {
  const { id } = useParams();
  const landlord = landlords.find((l) => l.id === id);

  if (!landlord) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold font-body text-foreground">Landlord not found</h1>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/search"><ArrowLeft className="h-4 w-4 mr-2" />Back to search</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const landlordProperties = properties.filter((p) =>
    landlord.propertyIds.includes(p.id)
  );
  const landlordReviews = reviews.filter((r) => r.landlordId === landlord.id);

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/search"><ArrowLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold font-body text-foreground">
                      {landlord.name}
                    </h1>
                    {landlord.verified && (
                      <Badge className="bg-success/10 text-success">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {landlord.company && (
                    <p className="text-muted-foreground mb-3">{landlord.company}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={landlord.averageRating} showValue />
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />{landlord.totalReviews} reviews
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-4 w-4" />{landlord.propertyIds.length} properties
                    </span>
                    <span className="text-muted-foreground">
                      {landlord.responseRate}% response rate
                    </span>
                  </div>
                </div>
                {!landlord.verified && (
                  <Button variant="accent">Claim This Profile</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Properties */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold font-body text-foreground mb-4">
            Properties ({landlordProperties.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landlordProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </motion.div>

        {/* All reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold font-body text-foreground mb-4">
            All Reviews ({landlordReviews.length})
          </h2>
          <div className="space-y-4">
            {landlordReviews.map((review) => {
              const prop = properties.find((p) => p.id === review.propertyId);
              return (
                <Card key={review.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <Link
                        to={`/property/${review.propertyId}`}
                        className="hover:text-primary transition-colors"
                      >
                        {prop?.address}, {prop?.city}
                      </Link>
                      · {review.date}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="font-semibold text-sm">{review.title}</span>
                    </div>
                    <p className="text-sm text-foreground/80">{review.text}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />{review.userName}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LandlordProfile;
