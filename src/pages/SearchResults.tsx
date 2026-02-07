import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

const propertyTypes = ["All", "Apartment", "House", "Condo", "Duplex", "Townhouse"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "highest", label: "Highest Rated" },
  { value: "most", label: "Most Reviewed" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (selectedType !== "All") {
      result = result.filter(
        (p) => p.type === selectedType.toLowerCase()
      );
    }

    result = result.filter(
      (p) => p.currentRent >= priceRange[0] && p.currentRent <= priceRange[1]
    );

    switch (sortBy) {
      case "highest":
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "most":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "price-low":
        result.sort((a, b) => a.currentRent - b.currentRent);
        break;
      case "price-high":
        result.sort((a, b) => b.currentRent - a.currentRent);
        break;
    }

    return result;
  }, [query, selectedType, sortBy, priceRange]);

  return (
    <Layout>
      <div className="bg-card border-b">
        <div className="container py-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by address, city, or landlord..."
                className="pl-10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 space-y-4"
            >
              {/* Property type filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type}
                      size="sm"
                      variant={selectedType === type ? "default" : "outline"}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Price Range: ${priceRange[0]} – ${priceRange[1]}
                </label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    placeholder="Min"
                    className="w-28"
                  />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    placeholder="Max"
                    className="w-28"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Sort By
                </label>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      size="sm"
                      variant={sortBy === opt.value ? "default" : "outline"}
                      onClick={() => setSortBy(opt.value)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container py-8">
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          {query && ` for "${query}"`}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground font-body">No properties found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
