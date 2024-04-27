import { csrfFetch } from './csrf';

const GET_RECIPES = '/recipes/getRecipes'
const GET_RECIPE = 'recipes/getRecipe'

const getRecipes = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes.Recipes
  }
}

const getRecipe = (recipe) => {
  return {
    type: GET_RECIPE,
    payload: recipe.recipeJSON
  }
}

export const getAllRecipesThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/recipes')
    if (res.ok) {
      const data = await res.json();
      dispatch(getRecipes(data));
      return data
    }
  } catch (err) {
    const errors = err.json()
    return errors
  }
}

export const getOneRecipeThunk = (recipeId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/recipes/${recipeId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getRecipe(data))
      return data
    } else {
      throw res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
} 

// Reducer
const initialState = { byId: {}, allRecipes: [] }

function recipeReducer(state = initialState, action) {
  let newState = {...state}
  switch(action.type) {
    case GET_RECIPES:
      newState.allRecipes = action.payload;

      for (let i = 0; i < action.payload.length; i++) {
        let recipe = action.payload[i];
        newState.byId[recipe.id] = recipe
      }
      return newState
    case GET_RECIPE:
      const recipe = action.payload
      newState.allRecipes = [recipe]
      newState.byId[recipe.id] = recipe
      return newState
    default:
      return state;
  }
}

export default recipeReducer