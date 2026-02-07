import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  AlertTriangle,
  CheckCircle,
  FileText,
  Download,
  Gavel,
  Shield,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const ALLOWABLE_INCREASE = 2.0;

const disputeTypes = [
  {
    icon: DollarSign,
    title: "Unlawful Rent Increase",
    desc: "Your landlord is increasing rent beyond the 2.0% annual cap",
    form: "Form 6 – Application to Director",
  },
  {
    icon: Gavel,
    title: "Wrongful Eviction",
    desc: "You're being evicted without proper notice or valid grounds",
    form: "Form 2 – Notice to Quit Response",
  },
  {
    icon: Shield,
    title: "Security Deposit",
    desc: "Dispute over return of security deposit or unlawful deductions",
    form: "Form 6 – Application to Director",
  },
];

const DisputeTools = () => {
  const [currentRent, setCurrentRent] = useState("");
  const [proposedRent, setProposedRent] = useState("");
  const [result, setResult] = useState<{
    increase: number;
    withinLimit: boolean;
    maxAllowed: number;
  } | null>(null);

  const calculate = () => {
    const current = parseFloat(currentRent);
    const proposed = parseFloat(proposedRent);
    if (!current || !proposed || current <= 0) return;

    const increase = ((proposed - current) / current) * 100;
    const maxAllowed = current * (1 + ALLOWABLE_INCREASE / 100);

    setResult({
      increase: parseFloat(increase.toFixed(2)),
      withinLimit: increase <= ALLOWABLE_INCREASE,
      maxAllowed: parseFloat(maxAllowed.toFixed(2)),
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold !text-success-foreground mb-3">
              Dispute Tools
            </h1>
            <p className="text-success-foreground/80 text-lg max-w-2xl mx-auto">
              Know your rights under the PEI Residential Tenancy Act. Calculate if your rent
              increase is lawful and generate dispute forms.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-body text-foreground">
                  <Calculator className="h-5 w-5 text-primary" />
                  Rent Increase Calculator
                </CardTitle>
                <CardDescription>
                  Check if your proposed rent increase is within the 2026 PEI limit of {ALLOWABLE_INCREASE}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Current Monthly Rent ($)
                  </label>
                  <Input
                    type="number"
                    value={currentRent}
                    onChange={(e) => setCurrentRent(e.target.value)}
                    placeholder="e.g. 1200"
                    min="0"
                    step="50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Proposed Monthly Rent ($)
                  </label>
                  <Input
                    type="number"
                    value={proposedRent}
                    onChange={(e) => setProposedRent(e.target.value)}
                    placeholder="e.g. 1300"
                    min="0"
                    step="50"
                  />
                </div>
                <Button onClick={calculate} className="w-full" size="lg">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg border-2 ${
                      result.withinLimit
                        ? "border-success/30 bg-success/5"
                        : "border-destructive/30 bg-destructive/5"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {result.withinLimit ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="font-bold text-lg">
                        {result.increase}% Increase
                      </span>
                      <Badge
                        className={
                          result.withinLimit
                            ? "bg-success text-success-foreground"
                            : "bg-destructive text-destructive-foreground"
                        }
                      >
                        {result.withinLimit ? "Within Limit" : "Exceeds Limit"}
                      </Badge>
                    </div>
                    {!result.withinLimit && (
                      <div className="text-sm space-y-2">
                        <p className="text-destructive font-medium">
                          This increase exceeds the {ALLOWABLE_INCREASE}% allowable limit.
                        </p>
                        <p className="text-muted-foreground">
                          Maximum allowable rent: <strong>${result.maxAllowed}/mo</strong>
                        </p>
                        <p className="text-muted-foreground">
                          You may be entitled to file a dispute with IRAC (Island Regulatory and Appeals Commission).
                        </p>
                      </div>
                    )}
                    {result.withinLimit && (
                      <p className="text-sm text-muted-foreground">
                        This increase is within the {ALLOWABLE_INCREASE}% annual cap set by PEI for 2026.
                      </p>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Dispute types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold font-body text-foreground mb-2">
              Common Dispute Types
            </h2>
            {disputeTypes.map((dt, i) => (
              <Card key={i} className="card-hover cursor-pointer group">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <dt.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold font-body text-foreground group-hover:text-primary transition-colors">
                      {dt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{dt.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        {dt.form}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                </CardContent>
              </Card>
            ))}

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 flex items-center gap-4">
                <Download className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold font-body text-foreground">
                    Download Dispute Form
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a pre-filled IRAC complaint form ready for submission
                  </p>
                </div>
                <Button variant="accent" size="sm" className="ml-auto">
                  Generate
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-secondary/50">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold font-body text-foreground mb-4">
                Know Your Rights Under PEI Law
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 font-body text-foreground">Rent Increases</h4>
                  <p className="text-muted-foreground">
                    Landlords must give 3 months written notice. The 2026 cap is 2.0%. Increases above this require IRAC approval.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 font-body text-foreground">Security Deposits</h4>
                  <p className="text-muted-foreground">
                    Maximum one month's rent. Must be returned within 7 days of lease end, less any lawful deductions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 font-body text-foreground">Eviction</h4>
                  <p className="text-muted-foreground">
                    Landlords need valid grounds and proper notice periods. Contact IRAC if you believe an eviction is wrongful.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default DisputeTools;
