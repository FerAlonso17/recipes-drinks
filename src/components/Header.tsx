import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header(){

    const [searchFilters,setSearchFilters] = useState({
        ingredient:'',
        category:''
    })

    const {pathname} = useLocation()

    const isHome = useMemo(()=>pathname==='/',[pathname])

    const fetchCategories = useAppStore((state)=>state.fetchCategories)
    const categories = useAppStore((state)=>state.categories)
    const searchRecipes = useAppStore((state)=>state.searchRecipes)
    const showNotification = useAppStore((state)=>state.showNotification)

    useEffect(()=>{
        fetchCategories()
    },[])
    
    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text:'All fields are required',
                error:true
            })
            return
        }
        searchRecipes(searchFilters)
    }

    return(
        <header className={isHome ? 'bg-[url(/bg2.jpg)] bg-center bg-cover' : 'bg-emerald-900'}>
            <div className="mx-auto container px-15 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className='w-32' src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to='/'
                            className={({isActive})=> isActive ? 'text-amber-300 font-extrabold text-2xl' : 'text-white font-bold' }
                        >Home</NavLink>
                        <NavLink
                            to='/favorites'
                            className={({isActive})=> isActive ? 'text-amber-300 font-extrabold text-2xl' : 'text-white font-bold' }
                        >Favorites</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form 
                        onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 backdrop-blur-md my-32 p-10 rounded-lg shadow space-y-6"
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white font-extrabold text-lg"
                            >
                                Name or ingredients
                            </label>
                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none bg-emerald-600 text-white"
                                placeholder="Name or ingredients. Example: coffe"
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white font-extrabold text-lg"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none bg-emerald-600 text-white"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value="">--Select--</option>
                                {categories.drinks.map(category=>(
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value='SEARCH RECIPES'
                            className="cursor-pointer bg-lime-500 hover:bg-lime-600 text-white font-extrabold w-full p-2 rounded-lg"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}