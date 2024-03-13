'use client'
import { useState } from "react"

export function ViewRecipe({ recipeToView, setRecipeToView, setInViewMode, allRecipes, setAllRecipes, categories }) {
    const [editMode, setEditMode] = useState(false)

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

    const toggleEditMode = () => {
        const updatedRecipes = allRecipes.map(recipe => recipe.id === recipeToView.id ? recipeToView : recipe)
        setAllRecipes(updatedRecipes)
        setEditMode(!editMode)
    }

    const addIngredient = () => {
        setRecipeToView({ ...recipeToView, ingredients: [...recipeToView.ingredients, ''] })
    }

    const addStep = () => {
        setRecipeToView({ ...recipeToView, steps: [...recipeToView.steps, ''] })
    }

    return (
        <section className='max-w-5xl m-auto p-8'>
            <div className={`h-36 bg-[url('/${recipeToView.imageURL}')] bg-cover bg-center`}>
                <button className="btn btn-primary m-3" onClick={() => setInViewMode(false)}>back</button>
            </div>

            <div className="grid min-[1000px]:grid-cols-3">
                <div className="bg-primary text-white p-5 flex flex-col gap-5">
                    <h2 className="font-bold text-2xl">Ingredients</h2>

                    <ul className={`list-disc flex flex-col gap-2 ${editMode ? '' : 'ml-5'}`}>
                        {recipeToView.ingredients.map((ingredient, i) => (
                            <Ingredient ingredient={ingredient} editMode={editMode} recipeToView={recipeToView} setRecipeToView={setRecipeToView} id={i} key={i} />
                        ))}
                        {editMode ? (
                            <div className="flex justify-end"><button className="btn font-normal font-lato btn-neutral" onClick={addIngredient}>+ ADD INGREDIENT</button></div>
                        ) : ''}
                    </ul>
                </div>

                <div className="p-5 flex flex-col gap-5 min-[1000px]:col-span-2">
                    {!editMode ? (
                        <div className="">
                            <h1 className="text-secondary font-bold text-3xl">{recipeToView.name}</h1>
                            <p className="italic text-accent font-sm">Source: {recipeToView.source}</p>
                            <p className="italic text-accent font-sm">Category: {recipeToView.category}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <label>
                                <span className="font-bold">Recipe Name</span>
                                <input type="text" className="border w-full rounded-lg p-2" value={recipeToView.name} onChange={(e) => setRecipeToView({ ...recipeToView, name: e.target.value })} />
                            </label>

                            <label>
                                <span className="font-bold">Meal Source</span>
                                <input type="text" className="border w-full rounded-lg p-2" value={recipeToView.source} onChange={(e) => setRecipeToView({ ...recipeToView, source: e.target.value })}/>
                            </label>
                            
                            <label>
                                <span className="font-bold">Category</span>
                                <select className="border w-full rounded-lg p-2" onChange={(e) => setRecipeToView({ ...recipeToView, category: e.target.value })}>
                                    {categories.map((category, i) => (
                                        <option key={i} value={category} checked={recipeToView.category === category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}

                    <div><button className="btn font-normal font-lato btn-sm btn-outline btn-primary" onClick={toggleFavorite}>{recipeToView.isFavorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}</button></div>

                    <h2 className="font-bold text-2xl">Steps</h2>

                    <ol className={`list-decimal flex flex-col gap-3 ${editMode ? '' : 'ml-5'}`}>
                        {recipeToView.steps.map((step, i) => (
                            <Step step={step} editMode={editMode} recipeToView={recipeToView} setRecipeToView={setRecipeToView} id={i} key={i} />
                        ))}
                        {editMode ? (
                            <div className="flex justify-end"><button className="btn font-normal font-lato btn-neutral" onClick={addStep}>+ ADD STEP</button></div>
                        ) : ''}
                    </ol>

                    <div>
                        <button className="btn btn-sm font-normal font-lato m-2" onClick={toggleEditMode}>{editMode ? 'SAVE' : 'EDIT'}</button>
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

function Ingredient({ ingredient, editMode, recipeToView, setRecipeToView, id }) {
    const handleChange = (e) => {
        const newIngredients = recipeToView.ingredients
        newIngredients[id] = e.target.value
        setRecipeToView({ ...recipeToView, ingredients: newIngredients })
    }

    const deleteIngredient = () => {
        let newIngredients = recipeToView.ingredients.toSpliced(id, 1)
        setRecipeToView({ ...recipeToView, ingredients: newIngredients })
    }

    return (
        <>
            {!editMode ? (
                <li>{ingredient}</li>
            ) : (
                <div className="join">
                    <textarea className="join-item text-black pl-2 w-full" value={ingredient} onChange={handleChange} />
                    <button className="join-item btn font-normal font-lato" onClick={deleteIngredient}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}
        </>
    )
}

function Step({ step, editMode, recipeToView, setRecipeToView, id }) {
    const handleChange = (e) => {
        const newSteps = recipeToView.steps
        newSteps[id] = e.target.value
        setRecipeToView({ ...recipeToView, steps: newSteps })
    }

    const deleteStep = () => {
        let newSteps = recipeToView.steps.toSpliced(id, 1)
        setRecipeToView({ ...recipeToView, steps: newSteps })
    }

    return (
        <>
            {!editMode ? (
                <li>{step}</li>
            ) : (
                <div className="join">
                    <textarea className="join-item text-black pl-2 w-full border" value={step} onChange={handleChange} />
                    <button className="join-item btn font-normal font-lato" onClick={deleteStep}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}
        </>
    )
}