'use client'
import recipeData from './data/recipes.json'
import { useState, useEffect } from 'react';
import { ViewRecipe } from './components/ViewRecipe';

export default function Home() {
    const [categories, setCategories] = useState([...new Set(recipeData.map(recipe => recipe.category))])
    const [allRecipes, setAllRecipes] = useState(recipeData)
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [inViewMode, setInViewMode] = useState(false)
    const [recipeToView, setRecipeToView] = useState({})
    const [filterApplied, setFilterApplied] = useState('all')

    useEffect(() => {
        if (filterApplied === 'all') {
            setFilteredRecipes(allRecipes)
        } else if (filterApplied === 'favorites') {
            setFilteredRecipes(allRecipes.filter(recipe => recipe.isFavorite))
        } else {
            setFilteredRecipes(allRecipes.filter(recipe => recipe.category === filterApplied))
        }
    }, [filterApplied, allRecipes])

    const openRecipe = (recipe) => {
        setRecipeToView(recipe)
        setInViewMode(true)
        window.scrollTo(0, 0);
    }

    return (
        <main>
            <div className="h-[70px]"></div>

            {!inViewMode ? (
                <section className='max-w-5xl m-auto p-8 flex flex-col gap-5'>
                    <h1 className="text-secondary text-3xl font-bold">All Recipes</h1>

                    {/* Filter by Category Buttons */}
                    <div className="filter-btns flex flex-col flex-wrap min-[575px]:flex-row">
                        <input className="btn btn-outline font-normal" type="radio" name="categories" aria-label="all" onChange={() => setFilterApplied('all')} checked={filterApplied === 'all'} />
                        {categories.map((category, i) => (
                            <input key={i} className="btn btn-outline font-normal" type="radio" name="categories" aria-label={category} onChange={() => setFilterApplied(category)} checked={filterApplied === category} />
                        ))}
                        <input className="btn btn-outline font-normal" type="radio" name="categories" aria-label="favorites" onChange={() => setFilterApplied('favorites')} checked={filterApplied === 'favorites'} />
                    </div>

                    {/* List of Recipes */}
                    <div className='grid min-[575px]:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredRecipes.length ? (
                            filteredRecipes.map((recipe) => (
                                <figure key={recipe.id} className='shadow-md cursor-pointer hover:shadow-2xl transition-all' onClick={() => openRecipe(recipe)}>
                                    <img src={recipe.imageURL} alt={recipe.name} />
                                    <figcaption className='p-5 flex flex-col gap-2'>
                                        <h2 className='font-bold text-lg'>{recipe.name}</h2>
                                        <div className='flex justify-between text-sm'>
                                            <p className='text-primary font-lato'>{recipe.category.toUpperCase()}</p>
                                            <p className='text-accent'>{recipe.time}</p>
                                        </div>
                                    </figcaption>
                                </figure>
                            ))
                        ) : (
                            <p className='my-7'>No recipes to show</p>
                        )}

                    </div>
                </section>
            ) : (
                <ViewRecipe recipeToView={recipeToView} setRecipeToView={setRecipeToView} setInViewMode={setInViewMode} allRecipes={allRecipes} setAllRecipes={setAllRecipes} categories={categories}/>
            )}



        </main>
    )
}