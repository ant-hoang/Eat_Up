import { useState } from 'react';
import { updateCommentThunk } from '../../store/comment';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import { getAllCommentsThunk } from '../../store/comment';


function EditCommentModal({ props }) {
  const dispatch = useDispatch();
  const currComment = useSelector((state) => state.comments.byId[props.commentId])
  const [comment, setComment] = useState(currComment.comment);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(updateCommentThunk({ comment }, props.recipeId))
      .then(() => dispatch(getAllCommentsThunk(props.recipeId)))
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
        <button className='comment-button' disabled={comment.length < 10 || comment.length > 80} type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditCommentModal;