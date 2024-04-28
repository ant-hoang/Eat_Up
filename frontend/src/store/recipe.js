import { csrfFetch } from './csrf';

const GET_RECIPES = '/recipes/getRecipes'
const GET_RECIPE = 'recipes/getRecipe'
const POST_RECIPE = 'recipes/postRecipe'
const DELETE_RECIPE = 'recipes/deleteRecipe'

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

const postRecipe = (recipe) => ({
  type: POST_RECIPE,
  payload: recipe
})

const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  payload: id
})

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

export const postRecipeThunk = (payload) => async (dispatch) => {
  const {title, description, origin, directions, video, image} = payload
  try {
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append('origin', origin)
    formData.append('directions', directions)
    formData.append('files', video)
    formData.append('files', image)

    const option = {
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    }

    const res = await csrfFetch('/api/recipes', option)
    if (res.ok) {
      const data = await res.json()
      dispatch(postRecipe(data))
      return data
    } else {
      throw res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }

    const res = await csrfFetch(`/api/recipes/${recipeId}`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(deleteRecipe(recipeId))
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
    case POST_RECIPE:
      const newRecipe = action.payload
      newState.allRecipes = [...newState.allRecipes, newRecipe]
      newState.byId[newRecipe.id] = newRecipe
      return newState
    case DELETE_RECIPE:
      const newById = {...newState.byId};
      delete newById[action.payload];
      newState.byId = newById

      const newAllRecipes = newState.allRecipes.filter((recipe) => {
        return recipe.id !== action.payload
      })

      newState.allRecipes = newAllRecipes
      
      return newState
    default:
      return state;
  }
}

export default recipeReducer