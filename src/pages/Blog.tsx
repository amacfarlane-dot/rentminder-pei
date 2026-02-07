import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/mockData";
import { Calendar, Clock, BookOpen, ArrowRight, Search, Scale, Home, FileQuestion } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["All", "Rent Control", "Disputes", "Tenant Rights", "Guides"];
const categoryIcons: Record<string, typeof Scale> = {
  "Rent Control": Scale,
  Disputes: FileQuestion,
  "Tenant Rights": BookOpen,
  Guides: Home,
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Resources & Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about renting in PEI, tenant rights, and dispute processes.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => {
            const Icon = categoryIcons[post.category] || BookOpen;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full card-hover group cursor-pointer">
                  <div className="h-36 bg-secondary/50 flex items-center justify-center">
                    <Icon className="h-10 w-10 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold font-body text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readTime} min
                        </span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is the allowable rent increase for 2026 in PEI?",
                a: "The Island Regulatory and Appeals Commission (IRAC) has set the 2026 allowable rent increase at 2.0%. Landlords cannot increase rent beyond this without IRAC approval.",
              },
              {
                q: "How much notice must a landlord give for a rent increase?",
                a: "Landlords must provide at least 3 months written notice before implementing a rent increase in PEI.",
              },
              {
                q: "Can my landlord evict me without reason?",
                a: "No. Under the PEI Residential Tenancy Act, landlords must have valid grounds for eviction and provide proper notice periods. If you believe your eviction is wrongful, you can file a complaint with IRAC.",
              },
              {
                q: "How do I file a dispute with IRAC?",
                a: "You can file a dispute by completing the appropriate application form (usually Form 6) and submitting it to IRAC. RentMinder's dispute tools can help you generate pre-filled forms.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <h3 className="font-semibold font-body text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Blog;
