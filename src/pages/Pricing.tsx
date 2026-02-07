import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Building2, Users, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Solo",
    price: 15,
    period: "month",
    desc: "For individual landlords with 1-2 units",
    icon: Building2,
    features: [
      "Monitor up to 2 properties",
      "Respond to reviews",
      "Basic analytics dashboard",
      "Email notifications",
      "Dispute tracking",
    ],
    popular: false,
  },
  {
    name: "Manager",
    price: 39,
    period: "month",
    desc: "For property managers with 3-10 units",
    icon: Users,
    features: [
      "Monitor up to 10 properties",
      "Respond to reviews",
      "Advanced analytics & trends",
      "Priority notifications",
      "Dispute management tools",
      "Competitive market analysis",
      "Team access (2 users)",
    ],
    popular: true,
  },
  {
    name: "Portfolio",
    price: 79,
    period: "month",
    desc: "For companies with 11-50 units",
    icon: Briefcase,
    features: [
      "Monitor up to 50 properties",
      "Priority review responses",
      "Full analytics suite",
      "Real-time notifications",
      "Advanced dispute management",
      "Market intelligence reports",
      "Team access (5 users)",
      "API access",
      "Dedicated support",
    ],
    popular: false,
  },
];

const Pricing = () => (
  <Layout>
    <section className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Plans for Landlords
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your portfolio. All plans include a 14-day free trial.
            Tenants always use RentMinder for free.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`h-full relative ${
                  plan.popular
                    ? "border-2 border-accent shadow-lg gold-glow"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-3">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="h-12 w-12 rounded-xl bg-secondary mx-auto mb-3 flex items-center justify-center">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-body text-foreground">{plan.name}</CardTitle>
                  <CardDescription>{plan.desc}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground font-body">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "accent" : "outline"}
                    size="lg"
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices in CAD. Cancel anytime. No credit card required for trial.
        </motion.p>
      </div>
    </section>
  </Layout>
);

export default Pricing;
