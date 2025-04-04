import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Recipe, Recipes, RecipeTotal, SearchFilters } from "../types"

export type RecipesSliceType = {
    categories:Categories
    recipes:Recipes
    selectedRecipe: RecipeTotal
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters:SearchFilters)=>Promise<void>
    selectRecipe: (id:Recipe['idDrink']) => Promise<void>
    closeModal:()=>void
}

export const createRecipeSlice: StateCreator<RecipesSliceType>=(set)=>({
    categories:{
        drinks:[]
    },
    recipes:{
        drinks:[]
    },
    selectedRecipe: {} as RecipeTotal,
    modal: false,
    fetchCategories: async()=>{
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async(searchFilters)=>{
        const recipes = await getRecipes(searchFilters)
        set({
            recipes
        })
    },
    selectRecipe: async(id)=>{
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal:true
        })
    },
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipe: {} as RecipeTotal
        })
    }
})