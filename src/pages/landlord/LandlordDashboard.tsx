import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StarRating from "@/components/shared/StarRating";
import { landlords, properties, reviews } from "@/data/mockData";
import {
  Building2,
  Star,
  MessageSquare,
  TrendingUp,
  Plus,
  Bell,
  CheckCircle,
  Users,
  DollarSign,
  BarChart3,
  Eye,
  Reply,
  ExternalLink,
  PieChart,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const LandlordDashboard = () => {
  // Mock: logged-in landlord is l1 (James MacPherson)
  const landlord = landlords[0];
  const landlordProperties = properties.filter((p) =>
    landlord.propertyIds.includes(p.id)
  );
  const landlordReviews = reviews.filter((r) => r.landlordId === landlord.id);

  // Chart data
  const ratingDistribution = [
    { name: "5 Stars", value: landlordReviews.filter((r) => r.rating === 5).length, color: "hsl(153, 50%, 36%)" },
    { name: "4 Stars", value: landlordReviews.filter((r) => r.rating === 4).length, color: "hsl(40, 62%, 58%)" },
    { name: "3 Stars", value: landlordReviews.filter((r) => r.rating === 3).length, color: "hsl(213, 52%, 50%)" },
    { name: "2 Stars", value: landlordReviews.filter((r) => r.rating === 2).length, color: "hsl(30, 60%, 50%)" },
    { name: "1 Star", value: landlordReviews.filter((r) => r.rating === 1).length, color: "hsl(0, 84%, 60%)" },
  ].filter((d) => d.value > 0);

  const categoryAvg = {
    Maintenance: landlordReviews.reduce((s, r) => s + r.categories.maintenance, 0) / landlordReviews.length,
    Communication: landlordReviews.reduce((s, r) => s + r.categories.communication, 0) / landlordReviews.length,
    Value: landlordReviews.reduce((s, r) => s + r.categories.value, 0) / landlordReviews.length,
    Safety: landlordReviews.reduce((s, r) => s + r.categories.safety, 0) / landlordReviews.length,
  };
  const categoryData = Object.entries(categoryAvg).map(([name, value]) => ({
    name,
    score: Number(value.toFixed(1)),
  }));

  const occupancyData = [
    { name: "Occupied", value: landlordProperties.length, color: "hsl(153, 50%, 36%)" },
    { name: "Vacant", value: 1, color: "hsl(0, 0%, 80%)" },
  ];

  const stats = [
    {
      icon: Building2,
      label: "Properties",
      value: landlordProperties.length,
      sub: `${landlordProperties.length} claimed`,
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: landlord.averageRating.toFixed(1),
      sub: `of 5.0`,
    },
    {
      icon: MessageSquare,
      label: "Reviews",
      value: landlord.totalReviews,
      sub: "total",
    },
    {
      icon: TrendingUp,
      label: "Response Rate",
      value: `${landlord.responseRate}%`,
      sub: "to reviews",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-body text-foreground">
                Landlord Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                {landlord.name}
                {landlord.company && ` · ${landlord.company}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {landlord.verified ? (
                <Badge className="bg-success/10 text-success">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Verified Owner
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  Pending Verification
                </Badge>
              )}
              <Badge variant="outline" className="text-accent-foreground">
                Solo Plan
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charts row */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-body text-foreground flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-primary" />
                    Rating Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={ratingDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {ratingDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        wrapperStyle={{ fontSize: "11px" }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-body text-foreground flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Category Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="score" fill="hsl(213, 52%, 35%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Occupancy chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-body text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Occupancy Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <ResponsiveContainer width={120} height={120}>
                    <RechartsPieChart>
                      <Pie
                        data={occupancyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {occupancyData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-sm">
                        {landlordProperties.length} Occupied
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-border" />
                      <span className="text-sm">1 Vacant</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(
                        (landlordProperties.length /
                          (landlordProperties.length + 1)) *
                          100
                      )}
                      % occupancy rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-body text-foreground">
                  Your Properties
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/landlord/claim">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Claim Property
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/landlord/list-property">
                      <DollarSign className="h-3.5 w-3.5 mr-1" />
                      List for Rent
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {landlordProperties.map((property) => {
                  const propReviews = reviews.filter(
                    (r) => r.propertyId === property.id
                  );
                  return (
                    <Card key={property.id} className="card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">
                                {property.address}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                {property.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {property.city} · {property.bedrooms}BR ·
                              ${property.currentRent}/mo
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <StarRating
                                rating={property.averageRating}
                                size="sm"
                                showValue
                              />
                              <span className="text-xs text-muted-foreground">
                                {propReviews.length} reviews
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/property/${property.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Tenant reviews to respond to */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-body text-foreground">
                  Recent Reviews
                </h2>
                <Badge variant="secondary">{landlordReviews.length} total</Badge>
              </div>
              <div className="space-y-3">
                {landlordReviews.slice(0, 5).map((review) => {
                  const prop = properties.find(
                    (p) => p.id === review.propertyId
                  );
                  return (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={review.rating} size="sm" />
                              <span className="font-semibold text-sm">
                                {review.title}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {prop?.address} · by {review.userName} ·{" "}
                              {review.date}
                            </p>
                            <p className="text-sm text-foreground/80 line-clamp-2">
                              {review.text}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Reply className="h-3.5 w-3.5 mr-1" />
                            Respond
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/landlord/claim">
                    <Plus className="h-4 w-4 mr-2" />
                    Claim a Property
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/landlord/list-property">
                    <DollarSign className="h-4 w-4 mr-2" />
                    List Property for Rent
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={`/landlord/${landlord.id}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Public Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground flex items-center gap-2">
                  <Bell className="h-4 w-4 text-accent" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">
                      New review on 42 University Ave
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">
                      Inquiry on 15 Queen St listing
                    </p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-border mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">
                      Monthly report available
                    </p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card className="border-accent/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Solo Plan — $15/mo
                  </h3>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <p>✓ 1-2 property listings</p>
                  <p>✓ Review notifications</p>
                  <p>✓ Basic analytics</p>
                  <p className="text-foreground/50">✗ Tenant screening</p>
                  <p className="text-foreground/50">✗ Priority support</p>
                </div>
                <Button variant="accent" size="sm" className="w-full" asChild>
                  <Link to="/pricing">Upgrade Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandlordDashboard;
