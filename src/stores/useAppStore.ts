import { create } from "zustand";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a)=>({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))