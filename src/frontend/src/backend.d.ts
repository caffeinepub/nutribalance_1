import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DayMeal {
    day: string;
    breakfast: string;
    lunch: string;
    snacks: string;
    dinner: string;
}
export interface Recipe {
    id: bigint;
    fat: bigint;
    carbs: bigint;
    calories: bigint;
    name: string;
    description: string;
    conditionTags: Array<DietCondition>;
    instructions: Array<string>;
    imageUrl: string;
    prepTime: bigint;
    ingredients: Array<string>;
    protein: bigint;
}
export interface DietPlan {
    id: bigint;
    mealTimingTips: string;
    name: string;
    overview: string;
    foodsToAvoid: Array<string>;
    recommendedFoods: Array<string>;
    mealPlan: Array<DayMeal>;
    condition: DietCondition;
}
export enum DietCondition {
    CVD = "CVD",
    PCOS = "PCOS",
    WeightGain = "WeightGain",
    WeightLoss = "WeightLoss",
    Diabetes = "Diabetes"
}
export interface backendInterface {
    getAllDietPlans(): Promise<Array<DietPlan>>;
    getAllRecipes(): Promise<Array<Recipe>>;
    getDietPlanByCondition(condition: DietCondition): Promise<DietPlan | null>;
    getRecipeById(id: bigint): Promise<Recipe | null>;
    getRecipesByCondition(condition: DietCondition): Promise<Array<Recipe>>;
    initializeData(): Promise<void>;
}
