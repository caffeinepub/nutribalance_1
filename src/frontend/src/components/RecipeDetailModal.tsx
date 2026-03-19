import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Beef, Clock, Droplets, Flame, Wheat } from "lucide-react";
import type { Recipe } from "../backend";
import { DietCondition } from "../backend";

const conditionColors: Record<string, string> = {
  [DietCondition.PCOS]: "#DDEFE6",
  [DietCondition.Diabetes]: "#D4EAF7",
  [DietCondition.CVD]: "#F3CFCB",
  [DietCondition.WeightLoss]: "#E7F0E0",
  [DietCondition.WeightGain]: "#F6D7CE",
};

const conditionLabels: Record<string, string> = {
  [DietCondition.PCOS]: "PCOS",
  [DietCondition.Diabetes]: "Diabetes",
  [DietCondition.CVD]: "CVD",
  [DietCondition.WeightLoss]: "Weight Loss",
  [DietCondition.WeightGain]: "Weight Gain",
};

const conditionEmojis: Record<string, string> = {
  [DietCondition.PCOS]: "🥗",
  [DietCondition.Diabetes]: "🫐",
  [DietCondition.CVD]: "🫀",
  [DietCondition.WeightLoss]: "🥦",
  [DietCondition.WeightGain]: "🍗",
};

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  const primaryCondition = recipe.conditionTags[0] ?? DietCondition.WeightLoss;
  const bg = conditionColors[primaryCondition] ?? "#DDEFE6";
  const emoji = conditionEmojis[primaryCondition] ?? "🍽️";

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="recipes.modal"
        className="max-w-2xl w-full max-h-[90vh] p-0 overflow-hidden"
      >
        {/* Recipe image header */}
        <div
          className="w-full h-36 flex items-center justify-center text-6xl"
          style={{ background: bg }}
        >
          {emoji}
        </div>

        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-xl font-bold text-[#111111]">
            {recipe.name}
          </DialogTitle>
          <div className="flex flex-wrap gap-1 mt-1">
            {recipe.conditionTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] font-medium rounded-full px-2"
                style={{ background: conditionColors[tag], color: "#1F5B57" }}
              >
                {conditionLabels[tag] ?? tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-16rem)]">
          <div className="px-6 pb-6 space-y-6">
            <p className="text-[#4B5560] text-sm leading-relaxed">
              {recipe.description}
            </p>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-3">
              {[
                {
                  icon: <Flame className="w-4 h-4" />,
                  label: "Calories",
                  value: String(recipe.calories),
                  unit: "kcal",
                },
                {
                  icon: <Beef className="w-4 h-4" />,
                  label: "Protein",
                  value: String(recipe.protein),
                  unit: "g",
                },
                {
                  icon: <Wheat className="w-4 h-4" />,
                  label: "Carbs",
                  value: String(recipe.carbs),
                  unit: "g",
                },
                {
                  icon: <Droplets className="w-4 h-4" />,
                  label: "Fat",
                  value: String(recipe.fat),
                  unit: "g",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: bg }}
                >
                  <div className="flex justify-center text-[#1F5B57] mb-1">
                    {m.icon}
                  </div>
                  <div className="font-bold text-[#111111] text-sm">
                    {m.value}
                    <span className="text-[10px] text-muted-foreground ml-0.5">
                      {m.unit}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#4B5560]">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-[#4B5560]">
              <Clock className="w-4 h-4" />
              <span>
                Prep time:{" "}
                <strong className="text-[#111111]">
                  {String(recipe.prepTime)} minutes
                </strong>
              </span>
            </div>

            <Separator />

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-[#1F5B57] text-base mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="flex items-center gap-2 text-sm text-[#4B5560]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F5B57] flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructions */}
            <div>
              <h3 className="font-semibold text-[#1F5B57] text-base mb-3">
                Instructions
              </h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: steps are ordered
                  <li key={i} className="flex gap-3 text-sm text-[#4B5560]">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1F5B57] text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
