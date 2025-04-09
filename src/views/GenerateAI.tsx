import { useAppStore } from "../stores/useAppStore"

export default function GenerateAI() {

    const showNotification = useAppStore(state => state.showNotification)
    const generateRecipe = useAppStore(state => state.generateRecipe)
    const recipe = useAppStore(state => state.recipe)
    const isgenerating = useAppStore(state => state.isgenerating)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //se crea un nuevo objeto de FormData y se obtiene el campo prompt
        const form = new FormData(e.currentTarget)
        const prompt = form.get('prompt') as string

        if (prompt.trim() === '') {
            showNotification({
                text: 'Field is required',
                error: true
            })
            return
        }
        await generateRecipe(prompt)
    }

    return (
        <>
            <h1 className="text-6xl font-extrabold">Generate recipe with AI</h1>

            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col space-y-3 py-10'
                >
                    <div className="relative">
                        <input
                            name="prompt"
                            id="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Generate a recipe with ingredients. Ej. Tequila and Strawberry Drink"
                        />
                        <button
                            type="submit"
                            aria-label="Enviar"
                            disabled={isgenerating}
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isgenerating?'cursor-not-allowed opacity-50':''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>

                { isgenerating && <p className="text-center animate-blink">Generating...</p>}
                <div className="py-10 whitespace-pre-wrap">
                    {recipe}
                </div>
            </div>

        </>
    )
}
