import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StarRating from "@/components/shared/StarRating";
import { properties, landlords, reviews } from "@/data/mockData";
import { getPropertyDetails, standardAmenities } from "@/data/property-details";
import { peiSchoolZones } from "@/data/school-zones";
import { renovations, getIRACAnalysis } from "@/data/renovations";
import { workOrders, getAvgResponseTime, statusLabels } from "@/data/work-orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Bed,
  Bath,
  MapPin,
  DollarSign,
  TrendingUp,
  User,
  ThumbsUp,
  Calendar,
  ArrowLeft,
  PenLine,
  GraduationCap,
  Wrench,
  Hammer,
} from "lucide-react";
import { motion } from "framer-motion";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold font-body text-foreground">Property not found</h1>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/search"><ArrowLeft className="h-4 w-4 mr-2" />Back to search</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const landlord = landlords.find((l) => l.id === property.landlordId);
  const propertyReviews = reviews.filter((r) => r.propertyId === property.id);
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);
  const details = getPropertyDetails(property.id);
  const amenities = details?.amenities.map((k) => standardAmenities.find((a) => a.key === k)).filter(Boolean) ?? [];
  const schools = details?.schoolZoneIds.map((sid) => peiSchoolZones.find((s) => s.id === sid)).filter(Boolean) ?? [];
  const propRenos = renovations.filter((r) => r.propertyId === property.id);
  const iracAnalysis = getIRACAnalysis(propRenos);
  const propWorkOrders = workOrders.filter((o) => o.propertyId === property.id && o.publiclyVisible);
  const avgResponse = getAvgResponseTime(workOrders.filter((o) => o.propertyId === property.id));

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/search"><ArrowLeft className="h-4 w-4 mr-1" />Back to search</Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-body text-foreground">
                    {property.address}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {property.city}, {property.province} {property.postalCode}
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground text-base px-3 py-1">
                  <DollarSign className="h-4 w-4 mr-0.5" />
                  {property.currentRent}/mo
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Badge variant="secondary"><Bed className="h-3.5 w-3.5 mr-1" />{property.bedrooms} Bed</Badge>
                <Badge variant="secondary"><Bath className="h-3.5 w-3.5 mr-1" />{property.bathrooms} Bath</Badge>
                <Badge variant="secondary">{typeLabel}</Badge>
                <div className="flex items-center gap-1.5">
                  <StarRating rating={property.averageRating} showValue />
                  <span className="text-sm text-muted-foreground">({property.reviewCount} reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Rent History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-body text-foreground">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Rent History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {property.rentHistory.map((entry, i) => {
                      const prev = i > 0 ? property.rentHistory[i - 1].rent : null;
                      const increase = prev ? ((entry.rent - prev) / prev * 100).toFixed(1) : null;
                      const overLimit = increase ? parseFloat(increase) > 2.0 : false;
                      return (
                        <div key={entry.date} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{entry.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">${entry.rent}/mo</span>
                            {increase && (
                              <Badge
                                variant="secondary"
                                className={overLimit ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}
                              >
                                +{increase}%
                                {overLimit && " ⚠️"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-body text-foreground">
                  Tenant Reviews ({propertyReviews.length})
                </h2>
                <Button size="sm" asChild>
                  <Link to={`/review?property=${property.id}`}>
                    <PenLine className="h-4 w-4 mr-1" />
                    Add Review
                  </Link>
                </Button>
              </div>

              {propertyReviews.length > 0 ? (
                <div className="space-y-4">
                  {propertyReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={review.rating} size="sm" />
                              <span className="font-semibold text-sm">{review.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              {review.userName} · {review.date}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                            {review.helpfulVotes}
                          </Button>
                        </div>
                        <p className="text-sm text-foreground/80 mt-3">{review.text}</p>
                        <div className="grid grid-cols-4 gap-2 mt-4">
                          {Object.entries(review.categories).map(([cat, val]) => (
                            <div key={cat} className="text-center">
                              <div className="text-xs text-muted-foreground capitalize">{cat}</div>
                              <div className="text-sm font-semibold">{val}/5</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center text-muted-foreground">
                    No reviews yet. Be the first to review this property!
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-body text-foreground">Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((am: any) => (
                        <Badge key={am.key} variant="secondary">{am.label}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* School Zones */}
            {schools.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-body text-foreground">
                      <GraduationCap className="h-5 w-5 text-primary" />School Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {schools.map((s: any) => (
                        <div key={s.id} className="flex justify-between items-center py-1.5 border-b last:border-0">
                          <div>
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.board} · {s.address}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">{s.grades}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Resolved Work Orders */}
            {propWorkOrders.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-body text-foreground">
                      <Wrench className="h-5 w-5 text-primary" />Maintenance History
                      {avgResponse !== null && <span className="text-xs font-normal text-muted-foreground ml-auto">Avg response: {avgResponse}h</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {propWorkOrders.map((wo) => (
                        <div key={wo.id} className="py-2 border-b last:border-0">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium">{wo.title}</p>
                            <Badge variant="secondary" className="text-xs">{statusLabels[wo.status]}</Badge>
                          </div>
                          {wo.resolutionNotes && <p className="text-xs text-muted-foreground mt-1">{wo.resolutionNotes}</p>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Renovations */}
            {propRenos.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-body text-foreground">
                      <Hammer className="h-5 w-5 text-primary" />Renovations &amp; Upgrades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {propRenos.map((r) => (
                      <div key={r.id} className="py-2 border-b last:border-0">
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.description}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">${r.cost.toLocaleString()}</Badge>
                          <Badge variant="secondary" className="text-xs">{r.completedDate}</Badge>
                          {r.iracEligible && <Badge className="bg-success/10 text-success text-xs">IRAC Eligible</Badge>}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-1">IRAC Capital Improvement Progress</p>
                      <Progress value={iracAnalysis.percentOfThreshold} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">${iracAnalysis.eligibleSpent.toLocaleString()} / ${iracAnalysis.threshold.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {landlord && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-body text-foreground">Landlord</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/landlord/${landlord.id}`} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold group-hover:text-primary transition-colors">
                            {landlord.name}
                          </p>
                          {landlord.company && (
                            <p className="text-sm text-muted-foreground">{landlord.company}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <StarRating rating={landlord.averageRating} size="sm" showValue />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Properties</span>
                        <span className="font-medium">{landlord.propertyIds.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response Rate</span>
                        <span className="font-medium">{landlord.responseRate}%</span>
                      </div>
                      {landlord.verified && (
                        <Badge className="bg-success/10 text-success w-full justify-center mt-2">
                          ✓ Verified Landlord
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link to={`/landlord/${landlord.id}`}>View Full Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Dispute CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-5 text-center">
                  <h3 className="font-semibold font-body text-foreground mb-2">
                    Rent Increase Too High?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    PEI's 2026 limit is 2.0%. Check if your increase is lawful.
                  </p>
                  <Button variant="accent" className="w-full" asChild>
                    <Link to="/dispute-tools">Use Dispute Tools</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
