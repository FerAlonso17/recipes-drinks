import { StateCreator } from "zustand"
import { RecipeTotal } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: RecipeTotal[]
    handleClickFavorite: (recipeTotal:RecipeTotal)=>void
    favoriteExist:(id:RecipeTotal['idDrink'])=>boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set,get,api)=>({
    favorites:[],
    handleClickFavorite:(recipeTotal)=> {
        if (get().favoriteExist(recipeTotal.idDrink)) {
            set((state)=>({
                favorites: state.favorites.filter(favorite=>favorite.idDrink!==recipeTotal.idDrink)
            }))
            createNotificationSlice(set,get,api).showNotification({
                text:'Removed from favorites',
                error:false
            })
        } else {
            set((state)=>({
                favorites:[...state.favorites,recipeTotal]
            }))
            createNotificationSlice(set,get,api).showNotification({
                text:'Added from favorites',
                error:false
            })
        }
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
    },
    favoriteExist:(id)=>{
        return get().favorites.some(favorite=>favorite.idDrink===id)
    },
    loadFromStorage:()=>{
        const storageFavorites = localStorage.getItem('favorites')
        if(storageFavorites){
            set({
                favorites: JSON.parse(storageFavorites)
            })
        }
    }
})