import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProvinceSelector from "@/components/home/ProvinceSelector";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />

      {/* Featured properties */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Recently Reviewed Properties</h2>
              <p className="text-muted-foreground mt-1">See what tenants are saying across PEI</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/search">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-8 md:hidden">
            <Button variant="outline" asChild>
              <Link to="/search">
                View all properties <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ProvinceSelector />

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center navy-gradient rounded-2xl p-10 md:p-16 shadow-2xl"
          >
            <h2 className="text-2xl md:text-4xl font-bold !text-primary-foreground mb-4">
              Ready to Take Control of Your Rental Experience?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Join thousands of PEI renters and landlords building a more transparent rental market.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <Link to="/search">Browse Properties</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
