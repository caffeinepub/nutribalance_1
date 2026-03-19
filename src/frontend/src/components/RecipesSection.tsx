import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Flame, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Recipe } from "../backend";
import { DietCondition } from "../backend";
import { RecipeDetailModal } from "./RecipeDetailModal";

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

function RecipeImage({ recipe }: { recipe: Recipe }) {
  const primaryCondition = recipe.conditionTags[0] ?? DietCondition.WeightLoss;
  const bg = conditionColors[primaryCondition] ?? "#DDEFE6";
  const emojis: Record<string, string> = {
    [DietCondition.PCOS]: "🥗",
    [DietCondition.Diabetes]: "🫐",
    [DietCondition.CVD]: "🫀",
    [DietCondition.WeightLoss]: "🥦",
    [DietCondition.WeightGain]: "🍗",
  };
  const emoji = emojis[primaryCondition] ?? "🍽️";

  return (
    <div
      className="w-full h-40 flex items-center justify-center text-5xl rounded-t-xl"
      style={{ background: bg }}
    >
      {emoji}
    </div>
  );
}

interface RecipesSectionProps {
  recipes: Recipe[];
  isLoading: boolean;
}

export function RecipesSection({ recipes, isLoading }: RecipesSectionProps) {
  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    let result = recipes;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }
    if (conditionFilter !== "all") {
      result = result.filter((r) =>
        r.conditionTags.includes(conditionFilter as DietCondition),
      );
    }
    return result;
  }, [recipes, search, conditionFilter]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="recipes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">
            Explore Our Recipes
          </h2>
          <p className="text-[#4B5560] text-lg max-w-xl mx-auto">
            Hundreds of delicious recipes tailored to your health condition.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="recipes.search_input"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6);
              }}
              className="pl-9 rounded-full border-border"
            />
          </div>
          <Select
            value={conditionFilter}
            onValueChange={(v) => {
              setConditionFilter(v);
              setVisibleCount(6);
            }}
          >
            <SelectTrigger
              data-ocid="recipes.select"
              className="w-full sm:w-52 rounded-full"
            >
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value={DietCondition.PCOS}>PCOS</SelectItem>
              <SelectItem value={DietCondition.Diabetes}>Diabetes</SelectItem>
              <SelectItem value={DietCondition.CVD}>CVD</SelectItem>
              <SelectItem value={DietCondition.WeightLoss}>
                Weight Loss
              </SelectItem>
              <SelectItem value={DietCondition.WeightGain}>
                Weight Gain
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recipe grid */}
        {isLoading ? (
          <div
            data-ocid="recipes.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
              <div
                key={sk}
                className="rounded-xl overflow-hidden border border-border animate-pulse"
              >
                <div className="h-40 bg-secondary" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-full" />
                  <div className="h-3 bg-secondary rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div
            data-ocid="recipes.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No recipes found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((recipe, i) => (
                <motion.div
                  key={String(recipe.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.07 }}
                  data-ocid={`recipes.item.${i + 1}`}
                  className="rounded-xl overflow-hidden border border-border shadow-xs hover:shadow-card transition-shadow cursor-pointer bg-white"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <RecipeImage recipe={recipe} />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1">
                      {recipe.conditionTags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] font-medium rounded-full px-2"
                          style={{
                            background: conditionColors[tag],
                            color: "#1F5B57",
                          }}
                        >
                          {conditionLabels[tag] ?? tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-[#111111] text-base leading-snug">
                      {recipe.name}
                    </h3>
                    <p className="text-[#4B5560] text-sm leading-relaxed line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {String(recipe.prepTime)} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {String(recipe.calories)} kcal
                      </span>
                    </div>
                    <Button
                      data-ocid={`recipes.card_button.${i + 1}`}
                      size="sm"
                      className="mt-1 bg-[#1F5B57] hover:bg-[#174946] text-white rounded-full text-xs font-semibold w-fit px-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecipe(recipe);
                      }}
                    >
                      View Recipe
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filtered.length > visibleCount && (
              <div className="text-center mt-10">
                <Button
                  data-ocid="recipes.secondary_button"
                  variant="outline"
                  onClick={() => setVisibleCount((v) => v + 6)}
                  className="rounded-full border-[#1F5B57] text-[#1F5B57] hover:bg-[#F0F7F6] font-semibold px-8"
                >
                  Load More Recipes
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </section>
  );
}
