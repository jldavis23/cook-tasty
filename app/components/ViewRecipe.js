'use client'

export function ViewRecipe({ recipeToView, setRecipeToView, setInViewMode, allRecipes, setAllRecipes }) {

    const toggleFavorite = () => {
        const updatedRecipes = allRecipes.map((recipe) => {
            if (recipe.id === recipeToView.id) {
                setRecipeToView({ ...recipe, isFavorite: !recipe.isFavorite })
                return { ...recipe, isFavorite: !recipe.isFavorite }
            } else {
                return recipe
            }
        })
        setAllRecipes(updatedRecipes)
    }

    const deleteRecipe = () => {
        const updatedRecipes = allRecipes.filter(recipe => recipe.id !== recipeToView.id)
        setAllRecipes(updatedRecipes)
        setInViewMode(false)
        window.scrollTo(0, 0);
    }

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

                    <div><button className="btn font-normal font-lato btn-sm btn-outline btn-primary" onClick={toggleFavorite}>{recipeToView.isFavorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}</button></div>

                    <h2 className="font-bold text-2xl">Steps</h2>

                    <ol className="list-decimal ml-5 flex flex-col gap-3">
                        {recipeToView.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>

                    <div>
                        <button className="btn btn-sm font-normal font-lato m-2">EDIT</button>
                        <button className="btn btn-sm font-normal font-lato m-2" onClick={() => document.getElementById('delete_modal').showModal()}>DELETE</button>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="text-xl">Are you sure you want to delete the <span className="font-bold">{recipeToView.name}</span> recipe?</h3>
                    <div className="modal-action">
                        <div>
                            <button className="btn font-normal font-lato mr-2" onClick={deleteRecipe}>YES</button>
                            <button className="btn font-formal font-lato" onClick={() => document.getElementById('delete_modal').close()}>NO</button>
                        </div>
                    </div>
                </div>
            </dialog>

        </section>
    )
}