'use client'
import { useState } from "react"

export function AddRecipe({ allRecipes, setAllRecipes, id, setID, categories }) {
    const [newRecipe, setNewRecipe] = useState({
        id: id, name: '', category: '', time: '', ingredients: [''], steps: [''], imageURL: 'default.jpg', source: 'user'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setAllRecipes([...allRecipes, newRecipe])
        setNewRecipe({
            id: id + 1, name: '', category: '', time: '', ingredients: [''], steps: [''], imageURL: '', source: 'user'
        })
        setID(id + 1)
    }

    const addIngredient = () => {
        setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, ''] })
    }

    const addStep = () => {
        setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, ''] })
    }

    return (
        <section id="add-recipes" className="bg-primary mt-12">
            <div className='max-w-5xl m-auto p-8 flex flex-col gap-5'>
                <h1 className="text-white text-3xl font-bold">Add A Recipe</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <p>Recipe Name</p>
                        <input required type="text" className="border w-full rounded-lg p-2" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} />
                    </div>

                    <div>
                        <p>Category</p>
                        <select required defaultValue="" className="w-full rounded-lg p-2" onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}>
                            <option value="" disabled></option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p>Time</p>
                        <input required type="text" className="border w-full rounded-lg p-2" value={newRecipe.time} onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })} />
                    </div>

                    <div>
                        <p>Ingredients</p>
                        {newRecipe.ingredients.map((ingredient, i) => (
                            <Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={i} key={i} />
                        ))}
                        <div><button type="button" className="btn btn-neutral btn-sm font-lato font-normal" onClick={addIngredient}>+ INGREDIENT</button></div>
                    </div>

                    <div>
                        <p>Steps</p>
                        {newRecipe.steps.map((step, i) => (
                            <Step newRecipe={newRecipe} setNewRecipe={setNewRecipe} index={i} key={i} />
                        ))}
                        <div><button type="button" className="btn btn-neutral btn-sm font-lato font-normal" onClick={addStep}>+ STEP</button></div>
                    </div>

                    <div><button type='submit' className="btn mt-3 font-normal font-lato btn-outline">ADD RECIPE</button></div>
                </form>
            </div>
        </section>
    )
}

// INGREDIENT INPUT COMPONENT
function Ingredient({ newRecipe, setNewRecipe, index }) {
    const handleChange = (e) => {
        let newIngredients = newRecipe.ingredients
        newIngredients[index] = e.target.value
        setNewRecipe({ ...newRecipe, ingredients: newIngredients })
    }

    const deleteIngredient = () => {
        let newIngredients = newRecipe.ingredients.toSpliced(index, 1)
        setNewRecipe({ ...newRecipe, ingredients: newIngredients })
    }

    return (
        <div className="join w-full mb-4">
            <input type="text" className="join-item text-black pl-2 w-full" value={newRecipe.ingredients[index]} onChange={handleChange} />
            <button type="button" className="join-item btn font-normal font-lato" onClick={deleteIngredient}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}

// STEP INPUT COMPONENT
function Step({ newRecipe, setNewRecipe, index }) {
    const handleChange = (e) => {
        let newSteps = newRecipe.steps
        newSteps[index] = e.target.value
        setNewRecipe({ ...newRecipe, steps: newSteps })
    }

    const deleteStep = () => {
        let newSteps = newRecipe.steps.toSpliced(index, 1)
        setNewRecipe({ ...newRecipe, steps: newSteps })
    }

    return (
        <div className="join w-full mb-4">
            <input type="text" className="join-item text-black pl-2 w-full" value={newRecipe.steps[index]} onChange={handleChange} />
            <button type="button" className="join-item btn font-normal font-lato" onClick={deleteStep}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    )
}