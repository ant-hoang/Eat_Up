import { csrfFetch } from './csrf';

const GET_COMMENTS = '/comments/getComments'
const POST_COMMENTS = '/comments/postComments'
const DELETE_COMMENT = '/comments/deleteComment'
const UPDATE_COMMENT = 'comments/updateComment'

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments.Comments
  }
}

const postComment = (comment) => ({
  type: POST_COMMENTS,
  payload: comment
})

const deleteComment = (comment, id) => ({
  type: DELETE_COMMENT,
  payload: id,
  message: comment
})

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment
})




export const getAllCommentsThunk = (recipeId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments`)
    if (res.ok) {
      const data = await res.json();
      dispatch(getComments(data));
      return data
    }
  } catch (err) {
    const errors = await err.json()
    return errors
  }
}

export const postNewCommentThunk = (form, recipeId) => async (dispatch) => {
  try {
    const { comment } = form
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment,
      })
    }
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(postComment(data))
      return res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const updateCommentThunk = (form, recipeId) => async (dispatch) => {
  try {
    const { comment } = form
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment
      })
    }
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(updateComment(data))
      return res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}

export const deleteCommentThunk = (recipeId, commentId) => async (dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const res = await csrfFetch(`/api/recipes/${recipeId}/comments`, options)

    if (res.ok) {
      const data = await res.json()
      dispatch(deleteComment(data, commentId))
    } else {
      throw res
    }
  } catch (err) {
    const data = await err.json()
    return data
  }
}


// Reducer
const initialState = { byId: {}, allComments: [] }

function commentReducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case GET_COMMENTS: {
      newState.allComments = action.payload;

      for (let i = 0; i < action.payload.length; i++) {
        let comment = action.payload[i];
        newState.byId[comment.id] = comment
      }
      return newState
    }
    case POST_COMMENTS: {
      let newComment = action.payload
      newState.allComments = [...newState.allComments, newComment]
      newState.byId[newComment.id] = newComment
      return newState;
    }
    case DELETE_COMMENT: {
      const newById = { ...newState.byId };
      delete newById[action.payload]
      newState.byId = newById

      const newAllComments = newState.allComments.filter((comment) => {
        return comment.id !== action.payload
      })

      newState.allComments = newAllComments
      return newState
    }
    case UPDATE_COMMENT: {
      const newArr = [...newState.allComments]
      const newUpdatedId = { ...newState.byId };
      for (let i = 0; i < newArr.length; i++) {
        let currComment = newArr[i];
        if (currComment.id === action.payload.id) {
          newArr[i] = action.payload;
          break;
        }
      }
      newState.allComments = newArr;

      newUpdatedId[action.payload.id] = action.payload;
      newState.byId = newUpdatedId
      return newState
    }
    default:
      return state;
  }
}

export default commentReducer