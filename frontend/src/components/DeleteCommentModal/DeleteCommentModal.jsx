// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteCommentThunk } from '../../store/comment';
import './DeleteComment.css'


function DeleteCommentModal({props}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault()

    return dispatch(deleteCommentThunk(props.recipeId, props.commentId))
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
        <h3 className="delete-text">Are you sure you want to delete this comment?</h3>
        <div className="delete-button red">
          <button className="red-button" id="red-button" onClick={handleDelete}>Yes (Delete Comment)</button>
        </div>
        <div className="delete-button gray">
          <button className="gray-button" id="gray-button" onClick={handleCancel}>No (Keep Comment)</button>
        </div>
      </div>
    </>
  );
}

export default DeleteCommentModal;