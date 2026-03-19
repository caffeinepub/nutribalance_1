import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Droplets,
  FlowerIcon,
  Heart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { DietPlan } from "../backend";
import { DietCondition } from "../backend";
import { ConsultancyModal } from "./ConsultancyModal";
import { PlanDetailModal } from "./PlanDetailModal";

interface PlanCardConfig {
  condition: DietCondition;
  title: string;
  description: string;
  bgColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const planConfigs: PlanCardConfig[] = [
  {
    condition: DietCondition.PCOS,
    title: "PCOS",
    description:
      "Hormone-balancing nutrition to manage PCOS symptoms and support reproductive health.",
    bgColor: "#DDEFE6",
    iconBg: "#A8D8BC",
    icon: <FlowerIcon className="w-6 h-6 text-[#1F5B57]" />,
  },
  {
    condition: DietCondition.Diabetes,
    title: "Diabetes",
    description:
      "Blood sugar management through low-glycemic eating patterns and balanced macros.",
    bgColor: "#D4EAF7",
    iconBg: "#A0CCE8",
    icon: <Droplets className="w-6 h-6 text-[#1F5B57]" />,
  },
  {
    condition: DietCondition.CVD,
    title: "Cardiovascular Disease",
    description:
      "Heart-healthy eating plans focused on reducing inflammation and improving lipid profiles.",
    bgColor: "#F3CFCB",
    iconBg: "#E8A8A2",
    icon: <Heart className="w-6 h-6 text-[#1F5B57]" />,
  },
  {
    condition: DietCondition.WeightLoss,
    title: "Weight Loss",
    description:
      "Sustainable calorie-deficit plans with satisfying, nutrient-dense foods.",
    bgColor: "#E7F0E0",
    iconBg: "#BDDBA8",
    icon: <TrendingDown className="w-6 h-6 text-[#1F5B57]" />,
  },
  {
    condition: DietCondition.WeightGain,
    title: "Weight Gain",
    description:
      "High-calorie, protein-rich meal plans for healthy muscle and mass building.",
    bgColor: "#F6D7CE",
    iconBg: "#E8B8A8",
    icon: <TrendingUp className="w-6 h-6 text-[#1F5B57]" />,
  },
];

interface PlansSectionProps {
  plans: DietPlan[];
  isLoading: boolean;
}

export function PlansSection({ plans, isLoading }: PlansSectionProps) {
  const [selectedCondition, setSelectedCondition] =
    useState<DietCondition | null>(null);
  const [consultCondition, setConsultCondition] = useState<
    string | undefined
  >();
  const [consultOpen, setConsultOpen] = useState(false);

  const getPlanForCondition = (condition: DietCondition) =>
    plans.find((p) => p.condition === condition) ?? null;

  const handleConsult = (conditionTitle: string) => {
    setConsultCondition(conditionTitle);
    setConsultOpen(true);
  };

  return (
    <section id="plans" className="py-20" style={{ background: "#F5F7F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">
            Tailored Nutrition Plans
          </h2>
          <p className="text-[#4B5560] text-lg max-w-2xl mx-auto">
            Evidence-based dietary guidance crafted for your specific health
            condition.
          </p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full px-10"
        >
          <CarouselContent className="-ml-4">
            {planConfigs.map((config, i) => (
              <CarouselItem
                key={config.condition}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl p-6 flex flex-col gap-4 shadow-card hover:shadow-lg transition-shadow h-full"
                  style={{ background: config.bgColor }}
                  data-ocid={`plans.card.${i + 1}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: config.iconBg }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111111] text-base mb-1">
                      {config.title}
                    </h3>
                    <p className="text-[#4B5560] text-sm leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                  <Button
                    data-ocid={`plans.card_button.${i + 1}`}
                    variant="ghost"
                    size="sm"
                    className="mt-auto w-fit px-0 text-[#1F5B57] font-semibold hover:bg-transparent hover:underline text-sm"
                    onClick={() => setSelectedCondition(config.condition)}
                    disabled={isLoading}
                  >
                    Learn More →
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="-left-4 border-[#1F5B57] text-[#1F5B57] hover:bg-[#1F5B57] hover:text-white"
            data-ocid="plans.pagination_prev"
          />
          <CarouselNext
            className="-right-4 border-[#1F5B57] text-[#1F5B57] hover:bg-[#1F5B57] hover:text-white"
            data-ocid="plans.pagination_next"
          />
        </Carousel>
      </div>

      {selectedCondition && (
        <PlanDetailModal
          plan={getPlanForCondition(selectedCondition)}
          conditionTitle={
            planConfigs.find((c) => c.condition === selectedCondition)?.title ??
            ""
          }
          isLoading={isLoading}
          onClose={() => setSelectedCondition(null)}
          onConsult={() => {
            const title =
              planConfigs.find((c) => c.condition === selectedCondition)
                ?.title ?? "";
            setSelectedCondition(null);
            handleConsult(title);
          }}
        />
      )}

      <ConsultancyModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        defaultCondition={consultCondition}
      />
    </section>
  );
}
