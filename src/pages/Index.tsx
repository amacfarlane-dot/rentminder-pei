import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProvinceSelector from "@/components/home/ProvinceSelector";
import PropertyCard from "@/components/shared/PropertyCard";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase, Property } from "@/lib/supabase";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("current_rent", { ascending: true })
        .limit(10);

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProperties = properties.filter((p) =>
    p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />

      {/* Search Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Search PEI Rentals</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search by address or city..."
                className="pl-10 h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

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
              <h2 className="text-2xl md:text-3xl font-bold">
                {searchTerm ? `Search Results (${filteredProperties.length})` : "Recently Added Properties"}
              </h2>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? "Showing matching properties from PEI registry" : "See rent history across PEI"}
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link to="/search">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">Loading properties...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property, i) => (
                <Link 
                  key={property.id} 
                  to={`/property/${property.id}`}
                  className="block bg-white rounded-xl shadow-sm border p-6 hover:shadow-md hover:border-red-200 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">{property.city}</p>
                      <h3 className="font-semibold text-gray-900">
                        {property.address}
                        {property.unit_number && <span>, Unit {property.unit_number}</span>}
                      </h3>
                    </div>
                    <p className="text-xl font-bold text-red-600">${property.current_rent}</p>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600 mt-2">
                    <span>{property.property_type}</span>
                    <span>•</span>
                    <span>{property.bedrooms} Beds</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-600">No properties found. Try a different search.</p>
            </div>
          )}

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
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" asChild>
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
