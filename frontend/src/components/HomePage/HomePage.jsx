import './HomePage.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipesThunk } from '../../store/recipe'
import { MdOutlineThumbUpOffAlt } from "react-icons/md";

function HomePage() {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes.allRecipes);

  useEffect(() => {
    const getData = async () => {
      dispatch(getAllRecipesThunk())
    }
    getData()

  }, [dispatch])

  return (
    <div className='recipe-container' id='recipe-container'>
      {recipes.length ? recipes.map((recipe) => {
        return (
          <div key={recipe.id} className='recipe-block' id='recipe-block'>
            <div className="recipe-link" id="recipe-link">
              <img src={recipe.images} alt="recipe" className="recipe-image" id="recipe-image"></img>
              <div className='recipe-box' id='recipe-box'>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>

                <div className='recipe-like' id='recipe-like'>
                  <p className='recipe-num-like' id='recipe-num-like'>{recipe.numLikes}</p>
                  <p className='recipe-like-icon' id='recipe-like-icon'>
                    <MdOutlineThumbUpOffAlt />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }) : <span>loading...</span>}
    </div>
  )
}

export default HomePage