import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { currentUser, levels, reviews } from "@/data/mockData";
import {
  User,
  Award,
  Star,
  TrendingUp,
  PenLine,
  Calendar,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = currentUser;
  const currentLevel = levels.find((l) => l.name === user.level)!;
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? ((user.points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const userReviews = reviews.filter((r) => r.userId === user.id);

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-20 w-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold font-body text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className="mt-2 bg-accent text-accent-foreground">
                  {currentLevel.icon} {user.level}
                </Badge>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-semibold">{user.points}</span>
                  </div>
                  {nextLevel && (
                    <>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {nextLevel.minPoints - user.points} points to {nextLevel.icon} {nextLevel.name}
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-secondary rounded-lg p-3">
                    <PenLine className="h-4 w-4 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold">{user.reviewCount}</p>
                    <p className="text-xs text-muted-foreground">Reviews</p>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <Calendar className="h-4 w-4 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold">{user.joinDate.split("-")[0]}</p>
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
                  Badges Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {user.badges.map((badge) => (
                    <div
                      key={badge}
                      className="bg-secondary/50 rounded-lg p-2.5 text-center text-xs font-medium"
                    >
                      🏅 {badge}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Levels info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-body text-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  All Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div
                      key={level.name}
                      className={`flex items-center justify-between py-1.5 text-sm ${
                        level.name === user.level ? "font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      <span>
                        {level.icon} {level.name}
                      </span>
                      <span>{level.minPoints}+ pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-body text-foreground">My Reviews</h1>
              <Button size="sm" asChild>
                <Link to="/review">
                  <PenLine className="h-4 w-4 mr-1" />
                  Write Review
                </Link>
              </Button>
            </div>

            {userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "text-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-sm">{review.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{review.date}</p>
                      <p className="text-sm text-foreground/80">{review.text}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {review.helpfulVotes} people found this helpful
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <PenLine className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-semibold font-body text-foreground">No reviews yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your rental experience to earn points and help other tenants.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/review">Write Your First Review</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
