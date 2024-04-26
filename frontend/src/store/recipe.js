import { csrfFetch } from './csrf';

const GET_RECIPES = '/recipes/getRecipes'

const getRecipes = (recipes) => {
  return {
    type: GET_RECIPES,
    payload: recipes.Recipes
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
    default:
      return state;
  }
}

export default recipeReducer