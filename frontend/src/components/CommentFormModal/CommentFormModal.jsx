import { useState } from 'react';
import { postNewCommentThunk } from '../../store/comment';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getAllCommentsThunk } from '../../store/comment';


function CommentFormModal({recipeId}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(postNewCommentThunk({ comment }, recipeId))
      .then(() => dispatch(getAllCommentsThunk(recipeId)))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Add your comment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Comment
          <textarea
            type="textbox"
            rows={6}
            cols={60}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        {errors.message && (
          <p className='error'>{errors.message}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CommentFormModal;