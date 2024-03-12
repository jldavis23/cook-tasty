'use client'

export function ViewRecipe({ recipeToView, setRecipeToView, setInViewMode, allRecipes, setAllRecipes }) {
    return (
        <section className='max-w-5xl m-auto p-8'>
            <div className={`h-36 bg-[url('/${recipeToView.imageURL}')] bg-cover bg-center`}>
                <button className="btn btn-primary m-3" onClick={() => setInViewMode(false)}>back</button>
            </div>

            <div className="grid min-[1000px]:grid-cols-3">
                <div className="bg-primary text-white p-5 flex flex-col gap-5">
                    <h2 className="font-bold text-2xl">Ingredients</h2>

                    <ul className="list-disc ml-5">
                        {recipeToView.ingredients.map((ingredient, i) => (
                            <li key={i} >{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-5 flex flex-col gap-5 min-[1000px]:col-span-2">
                    <div>
                        <h1 className="text-secondary font-bold text-3xl">{recipeToView.name}</h1>
                        <p className="italic text-accent font-sm">Source: {recipeToView.source}</p>
                    </div>

                    <div><button className="btn font-normal font-lato btn-sm btn-outline btn-primary">ADD TO FAVORITES</button></div>

                    <h2 className="font-bold text-2xl">Steps</h2>

                    <ol className="list-decimal ml-5 flex flex-col gap-3">
                        {recipeToView.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>

                    <div>
                        <button className="btn btn-sm font-normal font-lato m-2">EDIT</button>
                        <button className="btn btn-sm font-normal font-lato m-2">DELETE</button>
                    </div>
                </div>


            </div>

        </section>
    )
}