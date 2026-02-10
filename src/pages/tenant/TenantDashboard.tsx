import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentUser, levels, reviews, properties } from "@/data/mockData";
import {
  Search,
  Camera,
  Shield,
  PenLine,
  Star,
  Home,
  Calendar,
  Trophy,
  Award,
  MapPin,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const TenantDashboard = () => {
  const user = currentUser;
  const currentLevel = levels.find((l) => l.name === user.level)!;
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? ((user.points - currentLevel.minPoints) /
        (nextLevel.minPoints - currentLevel.minPoints)) *
      100
    : 100;

  const userReviews = reviews.filter((r) => r.userId === user.id);
  const [searchQuery, setSearchQuery] = useState("");

  const quickActions = [
    {
      icon: Search,
      title: "Check a Property",
      description: "Look up rental history by address",
      to: "/search",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Camera,
      title: "Move-In Helper",
      description: "Document your rental condition",
      to: "/tenant/move-in",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Shield,
      title: "Dispute Tools",
      description: "Challenge unfair rent increases",
      to: "/dispute-tools",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      icon: PenLine,
      title: "Write a Review",
      description: "Share your rental experience",
      to: "/review",
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-body text-foreground">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your renter dashboard — stay informed, stay protected.
              </p>
            </div>
            <Badge className="bg-accent/15 text-accent-foreground text-sm px-3 py-1">
              {currentLevel.icon} {user.level} · {user.points} pts
            </Badge>
          </div>
        </motion.div>

        {/* Quick property search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-foreground">
                  Check a Property
                </h2>
              </div>
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter an address to check rental history..."
                  className="flex-1"
                />
                <Button asChild>
                  <Link
                    to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Search
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, i) => (
            <Link key={action.title} to={action.to}>
              <Card className="card-hover h-full cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`h-12 w-12 rounded-xl ${action.bg} mx-auto mb-3 flex items-center justify-center`}
                  >
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current rental alert */}
            <Card className="border-success/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Home className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Your Current Rental
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      42 University Ave, Charlottetown
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs">
                      <span className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verified tenant
                      </span>
                      <span className="text-muted-foreground">
                        Rent: $1,250/mo
                      </span>
                      <span className="text-muted-foreground">
                        Since: Mar 2025
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/property/p1">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rent increase alert */}
            <Card className="border-destructive/30 bg-destructive/[0.02]">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Rent Increase Notice
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your landlord has proposed a 4.2% increase — above the
                      2026 PEI limit of 2.0%.
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      asChild
                    >
                      <Link to="/dispute-tools">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Start a Dispute
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-body text-foreground">
                  Your Reviews
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/review">
                    <PenLine className="h-3.5 w-3.5 mr-1" />
                    New Review
                  </Link>
                </Button>
              </div>
              {userReviews.length > 0 ? (
                <div className="space-y-3">
                  {userReviews.map((review) => {
                    const prop = properties.find(
                      (p) => p.id === review.propertyId
                    );
                    return (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating
                                      ? "fill-accent text-accent"
                                      : "text-border"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-semibold text-sm">
                              {review.title}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {prop?.address}, {prop?.city} · {review.date}
                          </p>
                          <p className="text-sm text-foreground/80 line-clamp-2">
                            {review.text}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-2 text-xs"
                          >
                            Posted as: Verified — Anonymous Tenant
                          </Badge>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <PenLine className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-semibold text-foreground">
                      No reviews yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share your experience to earn points!
                    </p>
                    <Button className="mt-3" size="sm" asChild>
                      <Link to="/review">Write Your First Review</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-3xl">
                    {currentLevel.icon}
                  </span>
                  <p className="font-semibold mt-1">{user.level}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.points} points
                  </p>
                </div>
                {nextLevel && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {nextLevel.minPoints - user.points} pts to{" "}
                      {nextLevel.icon} {nextLevel.name}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-secondary rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold">{user.reviewCount}</p>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-2.5 text-center">
                    <p className="text-lg font-bold">
                      {user.joinDate.split("-")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">Joined</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {user.badges.map((badge) => (
                    <div
                      key={badge}
                      className="bg-secondary/50 rounded-lg p-2 text-center text-xs font-medium"
                    >
                      🏅 {badge}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Move-in helper promo */}
            <Card className="border-success/20 bg-success/[0.03]">
              <CardContent className="p-4">
                <Camera className="h-6 w-6 text-success mb-2" />
                <h3 className="font-semibold text-sm text-foreground">
                  Move-In Helper
                </h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Document your unit's condition with timestamped photos. Protects
                  you when moving out.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/tenant/move-in">
                    <Camera className="h-3.5 w-3.5 mr-1" />
                    Start Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TenantDashboard;
