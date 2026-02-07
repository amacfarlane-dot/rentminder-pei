import { motion } from "framer-motion";
import {
  Search,
  Star,
  FileText,
  Gavel,
  Eye,
  MessageSquare,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const tenantFeatures = [
  { icon: Search, title: "Search Rental History", desc: "Look up any property's rent history and past tenant experiences" },
  { icon: Star, title: "Read Reviews", desc: "Real reviews from real tenants about landlords and properties" },
  { icon: FileText, title: "Document Payments", desc: "Keep track of your rent payments and lease details" },
  { icon: Gavel, title: "Generate Dispute Forms", desc: "Auto-fill IRAC complaint forms when rent increases exceed 2.0%" },
];

const landlordFeatures = [
  { icon: Eye, title: "Monitor Reputation", desc: "See what tenants are saying and track your ratings over time" },
  { icon: MessageSquare, title: "Respond to Reviews", desc: "Engage with tenant feedback and resolve issues publicly" },
  { icon: BarChart3, title: "Competitive Intelligence", desc: "See how your properties compare to similar rentals nearby" },
  { icon: ShieldCheck, title: "Dispute Management", desc: "Track and respond to disputes with documentation tools" },
];

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof Search;
  title: string;
  desc: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="flex gap-4 p-4 rounded-xl card-hover hover:bg-card hover:shadow-sm border border-transparent hover:border-border"
  >
    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h4 className="font-semibold text-sm font-body text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
    </div>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Built for Everyone in PEI's Rental Market
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Whether you're renting or renting out, RentMinder gives you the transparency you need.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        {/* Tenants */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full hero-gradient flex items-center justify-center">
              <span className="text-success-foreground text-sm font-bold">T</span>
            </div>
            <h3 className="text-xl font-bold font-body text-foreground">For Tenants</h3>
          </div>
          <div className="space-y-2">
            {tenantFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>

        {/* Landlords */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground text-sm font-bold">L</span>
            </div>
            <h3 className="text-xl font-bold font-body text-foreground">For Landlords</h3>
          </div>
          <div className="space-y-2">
            {landlordFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
