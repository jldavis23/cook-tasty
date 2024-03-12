'use client'
import recipeData from './data/recipes.json'
import { useState } from 'react';

export default function Home() {
    const categories = [...new Set(recipeData.map(recipe => recipe.category))];
    const [recipes, setRecipes] = useState(recipeData)

    const filterRecipes = (c) => {
        if (c === 'all') {
            setRecipes(recipeData)
        } else if (c === 'favorites') {
            setRecipes(recipeData.filter(recipe => recipe.isFavorite)) //going to have to change
        } else {
            setRecipes(recipeData.filter(recipe => recipe.category === c))
        }
    }

    return (
        <main>
            <div className="h-[70px]"></div>

            <div className="max-w-5xl m-auto p-8 flex flex-col gap-5">
                <h1 className="text-secondary text-3xl font-bold">All Recipes</h1>

                <div className="filter-btns">
                    <input className="join-item btn btn-outline font-normal" type="radio" name="categories" aria-label="all" onClick={() => filterRecipes('all')} />
                    {categories.map((category, i) => (
                        <input key={i} className="join-item btn btn-outline font-normal" type="radio" name="categories" aria-label={category} onClick={() => filterRecipes(category)}/>
                    ))}
                    <input className="join-item btn btn-outline font-normal" type="radio" name="categories" aria-label="favorites" onClick={() => filterRecipes('favorites')}/>
                </div>

                <div className='grid grid-cols-2 gap-5'>
                    {recipes.map((recipe) => (
                        <figure key={recipe.id} className='shadow-md cursor-pointer hover:shadow-2xl transition-all'>
                            <img src={recipe.imageURL} alt={recipe.name}/>
                            <figcaption className='p-3 flex flex-col gap-2'>
                                <h2 className='font-bold text-lg'>{recipe.name}</h2>
                                <div className='flex justify-between text-sm'>
                                    <p className='text-primary font-lato'>{recipe.category.toUpperCase()}</p>
                                    <p className='text-accent'>{recipe.time}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

        </main>
    )
}