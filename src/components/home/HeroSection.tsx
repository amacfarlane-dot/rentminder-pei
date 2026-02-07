import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import peiHero from "@/assets/pei-hero.jpg";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* PEI background image */}
      <div className="absolute inset-0">
        <img src={peiHero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 navy-gradient opacity-85" />
      </div>

      <div className="relative container py-16 md:py-24">
        {/* Rent increase banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 hero-gradient px-6 py-3 rounded-full shadow-lg">
            <Shield className="h-5 w-5 text-success-foreground" />
            <span className="text-success-foreground font-bold text-sm md:text-base">
              2026 PEI Allowable Rent Increase: 2.0%
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-4 leading-tight !text-primary-foreground">
            Know Before You Rent.
            <br />
            <span className="text-accent">Fight Unfair Increases.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            Research rental history, read landlord reviews, and dispute unlawful rent increases on Prince Edward Island.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto"
        >
          <div className="relative flex items-center bg-card rounded-xl shadow-2xl overflow-hidden">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter an address, neighborhood, or landlord name"
              className="flex-1 h-14 pl-12 pr-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-body"
            />
            <Button type="submit" size="lg" className="m-1.5 rounded-lg">
              <span className="hidden sm:inline mr-1">Search</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.form>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-primary-foreground/70 text-sm"
        >
          <span>🏠 1,200+ Properties</span>
          <span>⭐ 3,400+ Reviews</span>
          <span>👤 800+ Landlords</span>
          <span>📋 500+ Disputes Filed</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
