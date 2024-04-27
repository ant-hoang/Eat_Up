import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneRecipeThunk } from '../../store/recipe'
import { getAllCommentsThunk } from '../../store/comment'
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import OpenModalButton from '../OpenModalButton'
import CommentFormModal from '../CommentFormModal/CommentFormModal'
import EditCommentModal from '../EditCommentModal/EditCommentModal'
import DeleteCommentModal from '../DeleteCommentModal/DeleteCommentModal'
import LoginFormModal from '../LoginFormModal'


import video from '../../videos/Gordon_Ramsay.mp4'
import './RecipeDetails.css'


function RecipeDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState({})

  const { recipeId } = useParams()
  const user = useSelector((state) => state.session.user)
  const recipe = useSelector((state) => state.recipes.byId[recipeId])
  const comments = useSelector((state) => state.comments.allComments).reverse()

  let findComment = false
  if (user) findComment = !comments.find((comment) => comment.userId === user.id)

  useEffect(() => {
    const getData = async () => {
      await dispatch(getOneRecipeThunk(recipeId))
        .then(async () => { await dispatch(getAllCommentsThunk(recipeId)) })
        .then(() => { setIsLoaded(true) })
    }
    getData()
  }, [])

  console.log("USER: ", user)
  console.log("RECIPE: ", recipe)
  console.log("COMMENTS: ", comments)

  return (
    <>
      {isLoaded &&
        <>
          {user && user.id === recipe.userId ?
            <div className='recipe-title' id='recipe-title'>
              <div>
                <h3>Welcome back owner</h3>
                <button>Edit Recipe</button>
                <button>Delete Recipe</button>
              </div>
            </div> : ''}
          <h1 className='recipe-title' id='recipe-title'>{recipe.title}</h1>

          <p className='recipe-description' id='recipe-description'>{recipe.description}</p>

          <div id="media-player">
            <video src={video} width="800" height="500" controls>
            </video>
          </div>

          <div className='recipe-user-likes' id='recipe-user-likes'>
            {recipe.User && <a className='recipe-user-info' id='recipe-user-info'>created by @{recipe.User.username}</a>}
            <div className='recipe-detail-like' id='recipe-detail-like'>
              <p className='recipe-num-like' id='recipe-num-like'>{recipe.numLikes}</p>
              <p className='recipe-like-icon' id='recipe-like-icon'>
                <MdOutlineThumbUpOffAlt />
              </p>
            </div>
          </div>

          <div className='recipe-ingredients' id='recipe-ingredients'>
            {user && user.id === recipe.userId ? <button>Add an ingredient</button> : ''}
            <h3>Ingredients:</h3>
            {recipe.Ingredients && recipe.Ingredients.map((ingredient) => {
              return (<ul>
                <li>
                  {ingredient.quantity} {ingredient.metric} - {ingredient.name} {user && user.id === recipe.userId ? <button>Delete</button> : ''}
                </li>
              </ul>)
            })}
          </div>

          <div className='recipe-ingredients' id='recipe-ingredients'>
            <h3>Directions:</h3>
            <p>{recipe.directions}</p>
          </div>

          <div className='recipe-ingredients' id='recipe-ingredients'>
            <h3>Comments:</h3>
            {findComment && user.id !== recipe.userId ?

              <OpenModalButton
                buttonText={"Add a comment"}
                modalComponent={<CommentFormModal recipeId={recipeId}/>}
              />

              : ''}
            {comments.length ? comments.map((comment) => {
              return (
                <>
                  <p>@{comment.User && comment.User.username}</p>
                  <p>{comment.comment}</p>
                  {user && comment.userId === user.id ? 
                    <OpenModalButton
                      buttonText={"Edit comment"}
                      modalComponent={<EditCommentModal recipeId={recipeId} />}
                    />
                  : ''}
                  {user && comment.userId === user.id ? 
                    <OpenModalButton
                      buttonText={"Delete comment"}
                      modalComponent={<DeleteCommentModal props={{commentId: comment.id, recipeId}}/>}
                    />
                  : ''}
                </>
              )
            }) : <p>Be the first to comment this recipe!</p>}
          </div>
        </>
      }
    </>
  )
}

export default RecipeDetails