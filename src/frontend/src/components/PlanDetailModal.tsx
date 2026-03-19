import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarHeart,
  CheckCircle2,
  Clock,
  Lightbulb,
  PieChart,
  Target,
  Utensils,
  XCircle,
} from "lucide-react";
import type { DietPlan } from "../backend";
import { DietCondition } from "../backend";

interface DietaryGuideline {
  macros: string;
  keyNutrients: { name: string; reason: string }[];
  lifestyleTips: string[];
  sampleMeals: { label: string; description: string }[];
}

const dietaryGuidelines: Record<string, DietaryGuideline> = {
  [DietCondition.PCOS]: {
    macros: "40% complex carbs · 30% lean protein · 30% healthy fats",
    keyNutrients: [
      { name: "Magnesium", reason: "Reduces insulin resistance" },
      { name: "Omega-3", reason: "Reduces inflammation" },
      { name: "Zinc", reason: "Supports hormone production" },
      { name: "Vitamin D", reason: "Improves insulin sensitivity" },
      { name: "Inositol", reason: "Regulates ovulation" },
    ],
    lifestyleTips: [
      "Eat every 3–4 hours to prevent blood sugar spikes",
      "Include anti-inflammatory spices like turmeric and ginger",
      "Choose low-GI foods to manage insulin levels",
      "Avoid crash dieting as it worsens hormonal balance",
    ],
    sampleMeals: [
      { label: "Breakfast", description: "Quinoa berry bowl with almond milk" },
      {
        label: "Lunch",
        description: "Grilled chicken salad with flaxseed dressing",
      },
      {
        label: "Dinner",
        description: "Lentil soup with leafy greens and turmeric",
      },
    ],
  },
  [DietCondition.Diabetes]: {
    macros: "45% low-GI carbs · 25% lean protein · 30% healthy fats",
    keyNutrients: [
      { name: "Fiber", reason: "Slows glucose absorption" },
      { name: "Chromium", reason: "Improves insulin action" },
      { name: "Magnesium", reason: "Reduces insulin resistance" },
      { name: "Omega-3", reason: "Reduces CVD risk" },
      { name: "Vitamin B12", reason: "Nerve health" },
    ],
    lifestyleTips: [
      "Pair every carb with a protein or fat",
      "Check blood sugar 2 hours after meals",
      "Walk 15–20 min after eating",
      "Avoid fruit juices — eat whole fruit instead",
    ],
    sampleMeals: [
      {
        label: "Breakfast",
        description: "Cinnamon oats with walnuts and berries",
      },
      { label: "Lunch", description: "Turkey lettuce wraps with avocado" },
      {
        label: "Dinner",
        description: "Grilled tilapia with roasted broccoli and cauliflower",
      },
    ],
  },
  [DietCondition.CVD]: {
    macros: "50% complex carbs · 20% lean protein · 30% heart-healthy fats",
    keyNutrients: [
      { name: "Omega-3", reason: "Lowers triglycerides" },
      { name: "Fiber", reason: "Reduces LDL cholesterol" },
      { name: "Potassium", reason: "Regulates blood pressure" },
      { name: "Antioxidants", reason: "Reduces oxidative stress" },
      { name: "CoQ10", reason: "Supports heart function" },
    ],
    lifestyleTips: [
      "Use olive oil instead of butter",
      "Limit sodium to under 2300 mg/day",
      "Eat fatty fish at least twice a week",
      "Avoid trans fats and partially hydrogenated oils",
    ],
    sampleMeals: [
      {
        label: "Breakfast",
        description: "Walnut berry overnight oats",
      },
      {
        label: "Lunch",
        description: "Mediterranean chickpea salad with olive oil",
      },
      {
        label: "Dinner",
        description: "Baked salmon with quinoa and steamed broccoli",
      },
    ],
  },
  [DietCondition.WeightLoss]: {
    macros: "40% complex carbs · 35% lean protein · 25% healthy fats",
    keyNutrients: [
      { name: "Protein", reason: "Preserves muscle during calorie deficit" },
      { name: "Fiber", reason: "Keeps you full longer" },
      { name: "Iron", reason: "Maintains energy levels" },
      { name: "Calcium", reason: "Supports metabolism" },
      { name: "Green tea catechins", reason: "Boost fat burning" },
    ],
    lifestyleTips: [
      "Aim for a 300–500 calorie daily deficit",
      "Drink 2–3 L water daily",
      "Never skip breakfast — it regulates hunger hormones",
      "Eat slowly and stop at 80% full",
    ],
    sampleMeals: [
      {
        label: "Breakfast",
        description: "Greek yogurt with berries and chia seeds",
      },
      {
        label: "Lunch",
        description: "Zucchini noodles with turkey bolognese",
      },
      {
        label: "Dinner",
        description: "Baked chicken with roasted asparagus",
      },
    ],
  },
  [DietCondition.WeightGain]: {
    macros: "50% complex carbs · 25% lean protein · 25% healthy fats",
    keyNutrients: [
      { name: "Protein", reason: "Muscle building" },
      { name: "Creatine precursors", reason: "From red meat and fish" },
      { name: "Zinc", reason: "Testosterone and muscle growth" },
      { name: "Vitamin D", reason: "Muscle function" },
      { name: "Complex carbs", reason: "Glycogen replenishment" },
    ],
    lifestyleTips: [
      "Eat 500–700 extra calories above maintenance",
      "Never go more than 3 hours without eating",
      "Train with weights 3–4× per week",
      "Prioritize post-workout nutrition within 30 min",
    ],
    sampleMeals: [
      {
        label: "Breakfast",
        description: "Peanut butter banana smoothie with protein powder",
      },
      {
        label: "Lunch",
        description: "Chicken and sweet potato bowl with avocado",
      },
      {
        label: "Dinner",
        description: "Whole egg and cheese omelette with whole grain toast",
      },
    ],
  },
};

interface PlanDetailModalProps {
  plan: DietPlan | null;
  conditionTitle: string;
  isLoading: boolean;
  onClose: () => void;
  onConsult: () => void;
}

export function PlanDetailModal({
  plan,
  conditionTitle,
  isLoading,
  onClose,
  onConsult,
}: PlanDetailModalProps) {
  const guidelines = plan ? dietaryGuidelines[plan.condition] : null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="plans.modal"
        className="max-w-3xl w-full max-h-[90vh] p-0 overflow-hidden"
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-[#111111]">
            {plan?.name ?? conditionTitle} — Dietary Guidelines
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-5rem)]">
          {isLoading || !plan ? (
            <div
              data-ocid="plans.loading_state"
              className="p-8 text-center text-muted-foreground"
            >
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              Loading plan details...
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="font-semibold text-[#1F5B57] text-base mb-2">
                  Overview
                </h3>
                <p className="text-[#4B5560] text-sm leading-relaxed">
                  {plan.overview}
                </p>
              </div>

              {/* Recommended & Avoid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#1F5B57] text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Recommended Foods
                  </h3>
                  <ul className="space-y-1.5">
                    {plan.recommendedFoods.map((food) => (
                      <li
                        key={food}
                        className="flex items-center gap-2 text-sm text-[#4B5560]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1F5B57] text-base mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Foods to Avoid
                  </h3>
                  <ul className="space-y-1.5">
                    {plan.foodsToAvoid.map((food) => (
                      <li
                        key={food}
                        className="flex items-center gap-2 text-sm text-[#4B5560]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meal Timing Tips */}
              {plan.mealTimingTips && (
                <div className="rounded-xl p-4 bg-[#DDEFE6]">
                  <h3 className="font-semibold text-[#1F5B57] text-base mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Meal Timing Tips
                  </h3>
                  <p className="text-[#4B5560] text-sm leading-relaxed">
                    {plan.mealTimingTips}
                  </p>
                </div>
              )}

              {/* Dietary Guidelines */}
              {guidelines && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1F5B57] text-base flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Dietary Guidelines
                  </h3>

                  {/* Macros */}
                  <div className="rounded-xl border border-[#DDEFE6] bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PieChart className="w-4 h-4 text-[#1F5B57]" />
                      <span className="font-semibold text-sm text-[#111111]">
                        Macronutrient Targets
                      </span>
                    </div>
                    <p className="text-sm text-[#4B5560] font-medium">
                      {guidelines.macros}
                    </p>
                  </div>

                  {/* Key Nutrients */}
                  <div className="rounded-xl border border-[#DDEFE6] bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-[#1F5B57]" />
                      <span className="font-semibold text-sm text-[#111111]">
                        Key Nutrients to Focus On
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {guidelines.keyNutrients.map((n) => (
                        <li
                          key={n.name}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#1F5B57] mt-1.5 flex-shrink-0" />
                          <span>
                            <span className="font-medium text-[#111111]">
                              {n.name}
                            </span>
                            <span className="text-[#4B5560]">
                              {" "}
                              — {n.reason}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lifestyle Tips */}
                  <div className="rounded-xl border border-[#DDEFE6] bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-[#1F5B57]" />
                      <span className="font-semibold text-sm text-[#111111]">
                        Lifestyle Tips
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {guidelines.lifestyleTips.map((tip) => (
                        <li
                          key={tip}
                          className="flex items-start gap-2 text-sm text-[#4B5560]"
                        >
                          <span className="text-[#1F5B57] font-bold mt-0.5">
                            →
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Meals */}
                  <div className="rounded-xl border border-[#DDEFE6] bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Utensils className="w-4 h-4 text-[#1F5B57]" />
                      <span className="font-semibold text-sm text-[#111111]">
                        Sample Meal Ideas
                      </span>
                    </div>
                    <div className="space-y-2">
                      {guidelines.sampleMeals.map((meal) => (
                        <div
                          key={meal.label}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="px-2 py-0.5 rounded-full bg-[#DDEFE6] text-[#1F5B57] font-semibold text-xs flex-shrink-0">
                            {meal.label}
                          </span>
                          <span className="text-[#4B5560]">
                            {meal.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Consultation CTA */}
              <div className="rounded-xl bg-gradient-to-br from-[#1F5B57] to-[#2D7A74] p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-semibold text-white text-base mb-1">
                    Want a Personalized Plan?
                  </h4>
                  <p className="text-sm text-[#A8D8BC]">
                    Our nutritionists will craft a plan tailored specifically
                    for you.
                  </p>
                </div>
                <Button
                  data-ocid="plans.open_modal_button"
                  onClick={onConsult}
                  className="bg-white text-[#1F5B57] hover:bg-[#DDEFE6] font-semibold whitespace-nowrap flex items-center gap-2"
                >
                  <CalendarHeart className="w-4 h-4" />
                  Book a Consultation
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
