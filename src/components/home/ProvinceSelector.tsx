import { provinces } from "@/data/mockData";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const ProvinceSelector = () => (
  <section className="py-12 bg-muted/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Available Across Canada
        </h2>
        <p className="text-muted-foreground">
          Currently active in Prince Edward Island. More provinces coming soon.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {provinces.map((prov) => (
          <motion.button
            key={prov.code}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              prov.active
                ? "bg-accent text-accent-foreground gold-glow border-2 border-accent shadow-md"
                : "bg-card text-muted-foreground border border-border opacity-60 cursor-not-allowed"
            }`}
            disabled={!prov.active}
          >
            {prov.active && <MapPin className="h-3.5 w-3.5" />}
            {prov.name}
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

export default ProvinceSelector;
