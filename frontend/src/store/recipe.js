import { csrfFetch } from './csrf';

const GET_RECIPES = '/recipes/getRecipes'
const GET_RECIPE = 'recipes/getRecipe'
const POST_RECIPE = 'recipes/postRecipe'
const DELETE_RECIPE = 'recipes/deleteRecipe'
const UPDATE_RECIPE = 'recipes/updateRecipe'
const ADD_INGREDIENT = 'recipes/addIngredient'
const DELETE_INGREDIENT = 'recipes/deleteIngredient'

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

const deleteRecipe = (recipeId, dataObj) => ({
  type: DELETE_RECIPE,
  recipeId,
  message: dataObj
})

const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  payload: recipe
})

const addIngredient = (recipe, recipeId) => ({
  type: ADD_INGREDIENT,
  payload: recipe,
  recipeId
})

const deleteIngredient = (ingredientId, dataObj, recipeId) => ({
  type: DELETE_INGREDIENT,
  ingredientId,
  message: dataObj,
  recipeId
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
  const { title, description, origin, directions, video, image } = payload
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
      console.log("RECIPE_DATA: ", data)
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
      headers: { 'Content-Type': 'application/json' }
    }

    const res = await csrfFetch(`/api/recipes/${recipeId}`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(deleteRecipe(recipeId, data))
    } else {
      throw res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const updateRecipeThunk = (payload, recipeId) => async (dispatch) => {
  const { title, description, origin, directions, video, image } = payload
  try {
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append('origin', origin)
    formData.append('directions', directions)
    formData.append('files', video)
    formData.append('files', image)

    const option = {
      method: "PUT",
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    }

    const res = await csrfFetch(`/api/recipes/${recipeId}`, option)
    if (res.ok) {
      const data = await res.json()
      dispatch(updateRecipe(data))
      return data
    } else {
      throw res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const addIngredientThunk = (payload, recipeId) => async (dispatch) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }

  try {
    const res = await csrfFetch(`/api/recipes/${recipeId}/ingredients`, options)

    if (res.ok) {
      const data = await res.json()
      await dispatch(addIngredient(data, recipeId))
      return data
    } else {
      throw res
    }

  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const deleteIngredientThunk = (recipeId, ingredientId) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    const res = await csrfFetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(deleteIngredient(ingredientId, data, recipeId))
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
    let newState = { ...state }
    switch (action.type) {
      case GET_RECIPES: {
        newState.allRecipes = action.payload;

        for (let i = 0; i < action.payload.length; i++) {
          let recipe = action.payload[i];
          newState.byId[recipe.id] = recipe
        }
        return newState
      }
      case GET_RECIPE: {
        const recipe = action.payload
        newState.allRecipes = [recipe]
        newState.byId[recipe.id] = recipe
        return newState
      }
      case POST_RECIPE: {
        const newRecipe = action.payload
        newState.allRecipes = [...newState.allRecipes, newRecipe]
        newState.byId[newRecipe.id] = newRecipe
        return newState
      }
      case DELETE_RECIPE: {
        const newById = { ...newState.byId };
        delete newById[action.recipeId];
        newState.byId = newById

        const newAllRecipes = newState.allRecipes.filter((recipe) => {
          return recipe.id !== action.recipeId
        })

        newState.allRecipes = newAllRecipes

        return newState
      }
      case UPDATE_RECIPE: {
        const newArr = [...newState.allRecipes]
        const newUpdatedId = { ...newState.byId };
        for (let i = 0; i < newArr.length; i++) {
          let currRecipe = newArr[i];
          if (currRecipe.id === action.payload.id) {
            newArr[i] = action.payload;
            break;
          }
        }
        newState.allRecipes = newArr;

        newUpdatedId[action.payload.id] = action.payload;
        newState.byId = newUpdatedId
        return newState
      }
      case ADD_INGREDIENT: {
        const newArr = [...newState.allRecipes]
        const newUpdatedId = {...newState.byId}
        console.log("Ingredient_Array: ", newArr)
        for (let i = 0; i < newArr.length; i++) {
          let currRecipe = newArr[i];
          if (currRecipe.id === action.recipeId) {
            newArr[i].Ingredients.push(action.payload)
            delete newArr[i].Ingredients[newArr[i].Ingredients.length - 1].recipeId
            break
          }
        }
        newState.allRecipes = newArr
        
        newUpdatedId[action.recipeId].Ingredients.push(action.payload)
        delete newUpdatedId[action.recipeId].Ingredients[newUpdatedId[action.recipeId].Ingredients.length - 1].recipeId
        newState.byId = newUpdatedId
        return newState
      }
      case DELETE_INGREDIENT: {
        const newById = {...newState.byId}
        newState.byId = newById

        const newAllRecipes = [...newState.allRecipes]
        newState.allRecipes = newAllRecipes
        return newState
      }
      default:
        return state;
    }
  }

  export default recipeReducer