import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DietPlan, Recipe } from "../backend";
import { DietCondition } from "../backend";
import { useActor } from "./useActor";

export function useInitializeData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.initializeData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dietPlans"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}

export function useAllDietPlans() {
  const { actor, isFetching } = useActor();
  return useQuery<DietPlan[]>({
    queryKey: ["dietPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDietPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllRecipes() {
  const { actor, isFetching } = useActor();
  return useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecipes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDietPlanByCondition(condition: DietCondition | null) {
  const { actor, isFetching } = useActor();
  return useQuery<DietPlan | null>({
    queryKey: ["dietPlan", condition],
    queryFn: async () => {
      if (!actor || !condition) return null;
      return actor.getDietPlanByCondition(condition);
    },
    enabled: !!actor && !isFetching && !!condition,
  });
}

export function useRecipesByCondition(condition: DietCondition | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Recipe[]>({
    queryKey: ["recipesByCondition", condition],
    queryFn: async () => {
      if (!actor || !condition) return [];
      return actor.getRecipesByCondition(condition);
    },
    enabled: !!actor && !isFetching && !!condition,
  });
}

export { DietCondition };
