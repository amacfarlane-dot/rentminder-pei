import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { properties, landlords } from "@/data/mockData";
import { propertyDetails, standardAmenities, nearbyPlaceIcons, type NearbyPlace } from "@/data/property-details";
import { peiSchoolZones } from "@/data/school-zones";
import { renovations, getIRACAnalysis } from "@/data/renovations";
import { workOrders, getAvgResponseTime } from "@/data/work-orders";
import StarRating from "@/components/shared/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Bed,
  Bath,
  DollarSign,
  MapPin,
  GraduationCap,
  Wrench,
  TrendingUp,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const PropertyComparison = () => {
  const [searchParams] = useSearchParams();
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
  const selected = ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean) as typeof properties;

  if (selected.length < 2) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold font-body text-foreground mb-4">Compare Properties</h1>
          <p className="text-muted-foreground mb-6">Select at least 2 properties from search results to compare.</p>
          <Button asChild><Link to="/search"><ArrowLeft className="h-4 w-4 mr-2" />Back to Search</Link></Button>
        </div>
      </Layout>
    );
  }

  const cols = selected.length;

  return (
    <Layout>
      <div className="container py-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/search"><ArrowLeft className="h-4 w-4 mr-1" />Back to search</Link>
        </Button>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold font-body text-foreground mb-6"
        >
          Property Comparison
        </motion.h1>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="location">Location &amp; Schools</TabsTrigger>
            <TabsTrigger value="rent">Rent &amp; Renovations</TabsTrigger>
          </TabsList>

          {/* ────── OVERVIEW ────── */}
          <TabsContent value="overview">
            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {selected.map((p) => {
                const ll = landlords.find((l) => l.id === p.landlordId);
                const propOrders = workOrders.filter((o) => o.propertyId === p.id);
                const avgResp = getAvgResponseTime(propOrders);
                return (
                  <Card key={p.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-body text-foreground leading-snug">
                        <Link to={`/property/${p.id}`} className="hover:text-primary transition-colors">{p.address}</Link>
                      </CardTitle>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}, {p.province}</p>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-success" /><span className="font-semibold">${p.currentRent}/mo</span></div>
                      <div className="flex items-center gap-2"><Bed className="h-4 w-4 text-muted-foreground" />{p.bedrooms} Bed</div>
                      <div className="flex items-center gap-2"><Bath className="h-4 w-4 text-muted-foreground" />{p.bathrooms} Bath</div>
                      <div className="flex items-center gap-1.5"><StarRating rating={p.averageRating} size="sm" showValue /><span className="text-xs text-muted-foreground">({p.reviewCount})</span></div>
                      {ll && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">Landlord</p>
                          <Link to={`/landlord/${ll.id}`} className="font-medium hover:text-primary transition-colors">{ll.name}</Link>
                          <div className="flex items-center gap-1 mt-1"><StarRating rating={ll.averageRating} size="sm" /></div>
                          <p className="text-xs text-muted-foreground mt-1">Response rate: {ll.responseRate}%</p>
                        </div>
                      )}
                      {avgResp !== null && (
                        <div className="flex items-center gap-2 pt-1"><Wrench className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs">Avg response: {avgResp}h</span></div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ────── AMENITIES ────── */}
          <TabsContent value="amenities">
            <Card>
              <CardContent className="p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Amenity</th>
                      {selected.map((p) => <th key={p.id} className="text-center py-2 px-2 font-medium">{p.address.split(",")[0]}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {standardAmenities.map((am) => {
                      const hasAny = selected.some((p) => propertyDetails.find((pd) => pd.propertyId === p.id)?.amenities.includes(am.key));
                      if (!hasAny) return null;
                      return (
                        <tr key={am.key} className="border-t">
                          <td className="py-2 pr-4 text-muted-foreground">{am.label}</td>
                          {selected.map((p) => {
                            const has = propertyDetails.find((pd) => pd.propertyId === p.id)?.amenities.includes(am.key);
                            return <td key={p.id} className="text-center py-2">{has ? <span className="text-success font-bold">✓</span> : <span className="text-muted-foreground/40">—</span>}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ────── LOCATION & SCHOOLS ────── */}
          <TabsContent value="location">
            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {selected.map((p) => {
                const pd = propertyDetails.find((d) => d.propertyId === p.id);
                const schools = pd?.schoolZoneIds.map((sid) => peiSchoolZones.find((s) => s.id === sid)).filter(Boolean) ?? [];
                return (
                  <Card key={p.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-body text-foreground">{p.address}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      {schools.length > 0 && (
                        <div>
                          <p className="font-medium flex items-center gap-1.5 mb-2"><GraduationCap className="h-4 w-4 text-primary" />School Zones</p>
                          <ul className="space-y-1">
                            {schools.map((s: any) => (
                              <li key={s.id} className="text-muted-foreground">
                                <span className="font-medium text-foreground">{s.name}</span>
                                <span className="text-xs ml-1">({s.grades})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {pd && pd.nearbyPlaces.length > 0 && (
                        <div>
                          <p className="font-medium mb-2">Nearby</p>
                          <ul className="space-y-1">
                            {pd.nearbyPlaces.map((np, i) => (
                              <li key={i} className="flex justify-between text-muted-foreground">
                                <span>{np.name}</span>
                                <span className="text-xs">{np.distanceKm} km</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ────── RENT & RENOVATIONS ────── */}
          <TabsContent value="rent">
            <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {selected.map((p) => {
                const propRenos = renovations.filter((r) => r.propertyId === p.id);
                const analysis = getIRACAnalysis(propRenos);
                return (
                  <Card key={p.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-body text-foreground">{p.address}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium flex items-center gap-1.5 mb-2"><TrendingUp className="h-4 w-4 text-primary" />Rent History</p>
                        {p.rentHistory.map((rh, i) => {
                          const prev = i > 0 ? p.rentHistory[i - 1].rent : null;
                          const pct = prev ? (((rh.rent - prev) / prev) * 100).toFixed(1) : null;
                          return (
                            <div key={rh.date} className="flex justify-between text-muted-foreground py-1 border-b last:border-0">
                              <span>{rh.date}</span>
                              <span className="font-medium text-foreground">${rh.rent}{pct && <span className={`text-xs ml-1 ${parseFloat(pct) > 2 ? "text-destructive" : "text-success"}`}>+{pct}%</span>}</span>
                            </div>
                          );
                        })}
                      </div>
                      {propRenos.length > 0 && (
                        <div>
                          <p className="font-medium mb-2">Renovations</p>
                          {propRenos.map((r) => (
                            <div key={r.id} className="py-1 border-b last:border-0">
                              <p className="text-foreground">{r.title}</p>
                              <p className="text-xs text-muted-foreground">${r.cost.toLocaleString()} · {r.completedDate}{r.iracEligible && " · IRAC eligible"}</p>
                            </div>
                          ))}
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">IRAC Threshold Progress</p>
                            <Progress value={analysis.percentOfThreshold} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">${analysis.eligibleSpent.toLocaleString()} / ${analysis.threshold.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PropertyComparison;
