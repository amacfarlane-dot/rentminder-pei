import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/shared/StarRating";
import { properties, reviews, landlords } from "@/data/mockData";
import {
  Building2,
  Star,
  MessageSquare,
  TrendingUp,
  Bell,
  ArrowUpCircle,
  Eye,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Simulate landlord data (l1 - James MacPherson)
  const landlord = landlords[0];
  const myProperties = properties.filter((p) =>
    landlord.propertyIds.includes(p.id)
  );
  const myReviews = reviews.filter((r) => r.landlordId === landlord.id);
  const recentReviews = myReviews.slice(0, 3);

  const stats = [
    {
      label: "Total Properties",
      value: myProperties.length,
      icon: Building2,
      color: "text-primary",
    },
    {
      label: "Average Rating",
      value: landlord.averageRating.toFixed(1),
      icon: Star,
      color: "text-accent",
    },
    {
      label: "Total Reviews",
      value: landlord.totalReviews,
      icon: MessageSquare,
      color: "text-success",
    },
    {
      label: "Response Rate",
      value: `${landlord.responseRate}%`,
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-body text-foreground">
              Landlord Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {landlord.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              Solo Plan
            </Badge>
            <Button variant="accent" size="sm" asChild>
              <Link to="/pricing">
                <ArrowUpCircle className="h-4 w-4 mr-1" />
                Upgrade
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold font-body">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Properties */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-body text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  My Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myProperties.map((prop) => {
                    const propReviews = reviews.filter(
                      (r) => r.propertyId === prop.id
                    );
                    return (
                      <div
                        key={prop.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors"
                      >
                        <div>
                          <Link
                            to={`/property/${prop.id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {prop.address}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {prop.city} · ${prop.currentRent}/mo ·{" "}
                            {prop.bedrooms}BR
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <StarRating
                            rating={prop.averageRating}
                            size="sm"
                            showValue
                          />
                          <Badge variant="secondary">
                            {propReviews.length} reviews
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/property/${prop.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications / Recent reviews */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-body text-foreground flex items-center gap-2">
                  <Bell className="h-4 w-4 text-accent" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => {
                    const prop = properties.find(
                      (p) => p.id === review.propertyId
                    );
                    return (
                      <div key={review.id} className="border-b last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{review.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {prop?.address} · by {review.userName}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <ArrowUpCircle className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold font-body text-foreground mb-1">
                  Upgrade to Manager
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get advanced analytics, competitive insights, and team access.
                </p>
                <Button variant="accent" className="w-full" asChild>
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
