// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteRecipeThunk } from '../../store/recipe';
import './DeleteRecipe.css'


function DeleteRecipeModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [errors, setErrors] = useState({})

  const handleDelete = (e) => {
    e.preventDefault()

    return dispatch(deleteRecipeThunk(recipeId))
      .then(() => { navigate('/') })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(`/recipes/${recipeId}`)
  }

  return (
    <>
      <div className="delete-container">
        <h1 className="delete-text">Confirm Delete</h1>
        <h3 className="delete-text">Are you sure you want to delete this recipe?</h3>
        <div className="delete-button red">
          <button className="red-button" id="red-button" onClick={handleDelete}>Yes (Delete Recipe)</button>
        </div>
        <div className="delete-button gray">
          <button className="gray-button" id="gray-button" onClick={handleCancel}>No (Keep Recipe)</button>
        </div>
      </div>
    </>
  );
}

export default DeleteRecipeModal;