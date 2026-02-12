import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, MapPin, DollarSign, GitCompareArrows } from "lucide-react";
import StarRating from "./StarRating";
import type { Property } from "@/data/mockData";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
  index?: number;
  isComparing?: boolean;
  onToggleCompare?: () => void;
}

const PropertyCard = ({ property, index = 0, isComparing, onToggleCompare }: PropertyCardProps) => {
  const typeLabels: Record<string, string> = {
    apartment: "Apartment",
    house: "House",
    condo: "Condo",
    duplex: "Duplex",
    townhouse: "Townhouse",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/property/${property.id}`}>
        <Card className={`card-hover overflow-hidden group ${isComparing ? "ring-2 ring-primary" : ""}`}>
          {/* Image placeholder */}
          <div className="h-40 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 navy-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-foreground">
                {typeLabels[property.type]}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-success text-success-foreground">
                <DollarSign className="h-3 w-3 mr-0.5" />{property.currentRent}/mo
              </Badge>
            </div>
            {onToggleCompare && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(); }}
                className={`absolute top-3 right-3 p-1.5 rounded-md transition-colors ${isComparing ? "bg-primary text-primary-foreground" : "bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground"}`}
              >
                <GitCompareArrows className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center justify-center h-full text-muted-foreground/40">
              <MapPin className="h-12 w-12" />
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground font-body group-hover:text-primary transition-colors">
              {property.address}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {property.city}, {property.province} {property.postalCode}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={property.averageRating} size="sm" />
                <span className="text-xs text-muted-foreground">
                  ({property.reviewCount})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
