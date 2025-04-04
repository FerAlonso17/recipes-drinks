import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
    const recipes = useAppStore((state)=>state.recipes)
    const hasDrinks = useMemo(() => recipes.drinks.length, [recipes])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Recipes</h1>
            {hasDrinks ? 
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                        {recipes.drinks.map(recipe =>(
                            <DrinkCard
                                key={recipe.idDrink}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                ):
                (
                    <p className="my-10 text-center text-2xl">
                        There aren't results yet, use the form for finder recipes
                    </p>
                )
            }
        </>
    )
}