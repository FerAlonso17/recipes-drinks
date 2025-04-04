import { useAppStore } from "../stores/useAppStore"
import { Recipe } from "../types"

type DrinkCardProps = {
    recipe: Recipe
}
export default function DrinkCard({recipe}:DrinkCardProps) {

    const selectRecipe= useAppStore((state)=>state.selectRecipe)
    
    return (
        <div className=" border shadow-lg">
            <div className="overflow-hidden">
                <img 
                    src={recipe.strDrinkThumb} 
                    alt={`Imagen de ${recipe.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{recipe.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
                    onClick={()=>selectRecipe(recipe.idDrink)}
                >
                    See recipes
                </button>
            </div>
        </div>
    )
}
