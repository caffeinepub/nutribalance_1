import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onPlansClick: () => void;
  onRecipesClick: () => void;
}

export function HeroSection({
  onPlansClick,
  onRecipesClick,
}: HeroSectionProps) {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center min-h-[calc(100vh-4rem)] gap-12 py-16 lg:py-0">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-[#DDEFE6] text-[#1F5B57] rounded-full px-4 py-1.5 text-sm font-medium w-fit">
              <Sparkles className="w-4 h-4" />
              Personalized Nutrition Science
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#111111] leading-tight tracking-tight">
              Eat Smart, <span className="text-[#1F5B57]">Live Better</span>
            </h1>
            <p className="text-lg text-[#4B5560] leading-relaxed">
              Tailored diet plans for PCOS, Diabetes, Cardiovascular Health,
              Weight Loss &amp; Gain — plus hundreds of condition-friendly
              recipes crafted by nutrition experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                data-ocid="hero.primary_button"
                onClick={onPlansClick}
                size="lg"
                className="bg-[#1F5B57] hover:bg-[#174946] text-white rounded-full px-8 font-semibold text-base gap-2"
              >
                View My Plan <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                onClick={onRecipesClick}
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-[#1F5B57] text-[#1F5B57] hover:bg-[#F0F7F6] font-semibold text-base"
              >
                Explore Recipes
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              {[
                { num: "5+", label: "Conditions Covered" },
                { num: "100+", label: "Expert Recipes" },
                { num: "7-Day", label: "Meal Plans" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#1F5B57]">
                    {stat.num}
                  </div>
                  <div className="text-xs text-[#4B5560] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-end items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative blobs */}
              <div
                className="absolute -top-8 -right-8 w-64 h-64 rounded-full opacity-50"
                style={{ background: "#DDEFE6" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-40"
                style={{ background: "#D4EAF7" }}
              />
              <img
                src="/assets/generated/hero-woman-salad.dim_600x700.jpg"
                alt="Woman eating a healthy salad"
                className="relative z-10 w-full object-cover rounded-3xl shadow-2xl"
                style={{ maxHeight: "560px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
