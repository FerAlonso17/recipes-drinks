import { z } from "zod";
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFiltersSchema } from "../utils/recipe-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilters = z.infer<typeof SearchFiltersSchema>
export type Recipes= z.infer<typeof DrinksAPIResponse>
export type Recipe= z.infer<typeof DrinkAPIResponse>
export type RecipeTotal = z.infer<typeof RecipeAPIResponseSchema>