import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Lock, User, Home, Building2, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Tenant-specific
  const [justLooking, setJustLooking] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [landlordName, setLandlordName] = useState("");

  // Landlord-specific
  const [companyName, setCompanyName] = useState("");
  const [numProperties, setNumProperties] = useState("");
  const [phone, setPhone] = useState("");

  // Anonymous review preference
  const [anonymousReviews, setAnonymousReviews] = useState(true);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account created!",
        description:
          role === "tenant"
            ? "Welcome to RentMinder. Start exploring PEI rentals."
            : "Welcome to RentMinder. We'll contact you to verify your account.",
      });
      navigate(role === "tenant" ? "/tenant/dashboard" : "/landlord/dashboard");
    }, 1000);
  };

  return (
    <Layout>
      <div className="container py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <img src={logo} alt="RentMinder" className="h-14 mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-body text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-1">
              Join the PEI rental transparency movement
            </p>
          </div>

          {/* Role selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("tenant")}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                role === "tenant"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <Home
                className={`h-6 w-6 mx-auto mb-2 ${
                  role === "tenant" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="font-semibold text-sm">I'm a Renter</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Search, review & protect your rights
              </p>
            </button>
            <button
              type="button"
              onClick={() => setRole("landlord")}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                role === "landlord"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <Building2
                className={`h-6 w-6 mx-auto mb-2 ${
                  role === "landlord" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <p className="font-semibold text-sm">I'm a Landlord</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage reputation & list properties
              </p>
            </button>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Common fields */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Each account type requires a separate email address.
                  </p>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="pl-10"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                {/* Role-specific fields */}
                <AnimatePresence mode="wait">
                  {role === "tenant" ? (
                    <motion.div
                      key="tenant-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="border-t pt-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox
                            id="justLooking"
                            checked={justLooking}
                            onCheckedChange={(c) => setJustLooking(!!c)}
                          />
                          <Label htmlFor="justLooking" className="text-sm font-normal cursor-pointer">
                            <Eye className="inline h-3.5 w-3.5 mr-1" />
                            I'm just looking — skip rental details for now
                          </Label>
                        </div>

                        <AnimatePresence>
                          {!justLooking && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3 overflow-hidden"
                            >
                              <p className="text-sm font-medium text-foreground">
                                Current Rental Information
                              </p>
                              <div>
                                <Label htmlFor="currentAddress">Address</Label>
                                <Input
                                  id="currentAddress"
                                  value={currentAddress}
                                  onChange={(e) => setCurrentAddress(e.target.value)}
                                  placeholder="123 Main St"
                                  className="mt-1"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor="currentCity">City</Label>
                                  <Input
                                    id="currentCity"
                                    value={currentCity}
                                    onChange={(e) => setCurrentCity(e.target.value)}
                                    placeholder="Charlottetown"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="currentRent">Monthly Rent ($)</Label>
                                  <Input
                                    id="currentRent"
                                    type="number"
                                    value={currentRent}
                                    onChange={(e) => setCurrentRent(e.target.value)}
                                    placeholder="1200"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label htmlFor="moveInDate">Move-in Date</Label>
                                  <Input
                                    id="moveInDate"
                                    type="date"
                                    value={moveInDate}
                                    onChange={(e) => setMoveInDate(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="landlordName">Landlord Name</Label>
                                  <Input
                                    id="landlordName"
                                    value={landlordName}
                                    onChange={(e) => setLandlordName(e.target.value)}
                                    placeholder="Optional"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex items-center space-x-2 mt-4">
                          <Checkbox
                            id="anonymous"
                            checked={anonymousReviews}
                            onCheckedChange={(c) => setAnonymousReviews(!!c)}
                          />
                          <Label htmlFor="anonymous" className="text-sm font-normal cursor-pointer">
                            Post reviews as "Verified — Anonymous Tenant"
                          </Label>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="landlord-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="border-t pt-4 space-y-3">
                        <p className="text-sm font-medium text-foreground">
                          Business Information
                        </p>
                        <div>
                          <Label htmlFor="companyName">Company / Business Name</Label>
                          <Input
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Optional"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(902) 555-0123"
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Required for verification — we'll call to confirm ownership.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="numProperties">Number of Rental Units</Label>
                          <Select
                            value={numProperties}
                            onValueChange={setNumProperties}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2">1–2 units</SelectItem>
                              <SelectItem value="3-10">3–10 units</SelectItem>
                              <SelectItem value="11-50">11–50 units</SelectItem>
                              <SelectItem value="50+">50+ units</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="bg-accent/10 rounded-lg p-3 text-sm text-foreground/80">
                          <p className="font-medium text-accent-foreground mb-1">
                            📞 Verification Required
                          </p>
                          <p className="text-xs text-muted-foreground">
                            After signup, our team will contact you to verify property
                            ownership. You'll need to provide proof of ownership
                            documentation.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading
                    ? "Creating account..."
                    : role === "tenant"
                    ? "Create Renter Account"
                    : "Create Landlord Account"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
