// frontend/src/components/LoginFormModal/LoginFormModal.jsx

// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Modals
import { useModal } from '../../context/Modal';

// Thunks
import { deleteIngredientThunk } from '../../store/recipe';
import { getOneRecipeThunk } from '../../store/recipe';

// CSS
import './DeleteIngredient.css'


function DeleteIngredientModal({ props }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault()

    return dispatch(deleteIngredientThunk(parseInt(props.recipeId), props.ingredientId))
      .then(() => dispatch(getOneRecipeThunk(props.recipeId)))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  const handleCancel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    closeModal()
  }

  return (
    <>
      <div className="delete-container">
        {errors.message && (
          <p className='error'>{errors.message}</p>
        )}
        <h1 className="delete-text">Confirm Delete</h1>
        <h3 className="delete-text">Are you sure you want to delete this ingredient?</h3>
        <div className="delete-button red">
          <button className="red-button" id="red-button" onClick={handleDelete}>Yes (Delete ingredient)</button>
        </div>
        <div className="delete-button gray">
          <button className="gray-button" id="gray-button" onClick={handleCancel}>No (Keep ingredient)</button>
        </div>
      </div>
    </>
  );
}

export default DeleteIngredientModal;