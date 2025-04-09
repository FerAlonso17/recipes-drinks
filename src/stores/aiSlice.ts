import { StateCreator } from "zustand"
import AIService from "../services/AIService"

export type AISlice = {
    recipe:string
    isgenerating:boolean
    generateRecipe: (prompt:string)=>Promise<void>
}

export const createAISlice: StateCreator<AISlice> =(set)=>({
    recipe:'',
    isgenerating:false,
    generateRecipe: async (prompt)=>{
        set({recipe:'',isgenerating:true})//Para cuando se vuelva a generar otra receta, se limpie el state de recipe, y empieze de nuevo
        const data = await AIService.generateRecipe(prompt)

        //para recorrer el elemento iterable y asincrono, ya q la respuesta de la ai va llegando consecutivamene
        for await (const textPart of data){
            set((state=>({
                recipe:state.recipe + textPart
            })))
        }
        set({isgenerating:false})
    }
})