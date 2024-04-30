import { useState } from 'react';
import { updateCommentThunk } from '../../store/comment';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getAllCommentsThunk } from '../../store/comment';


function EditCommentModal({ recipeId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(updateCommentThunk({ comment }, recipeId))
      .then(() => dispatch(getAllCommentsThunk(recipeId)))
      .then(closeModal)
  };

  return (
    <>
      <h1 className='comment-header'>Edit your comment</h1>
      <form className='comment-form' onSubmit={handleSubmit}>
        <label className='comment-label'>
          <textarea
            type="textbox"
            rows={6}
            cols={60}
            placeholder='Leave a comment...(10 characters or more)'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        {comment.length > 80 ? (
          <p className='error'>Comment cannot be more than 80 characters</p>
        ) : ''}
        <button className='comment-button' disabled={comment.length < 10} type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditCommentModal;