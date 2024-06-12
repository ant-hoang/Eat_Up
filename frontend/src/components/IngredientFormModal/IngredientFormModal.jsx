// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Modals
import { useModal } from '../../context/Modal';

// Thunks
import { addIngredientThunk } from '../../store/recipe';
import { getOneRecipeThunk } from '../../store/recipe';

// CSS
import './IngredientForm.css'

// Layout
function IngredientFormModal({ recipeId }) {
  const dispatch = useDispatch();
  const [ingredientName, setIngredientName] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [metric, setMetric] = useState("")
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: ingredientName,
      quantity,
      metric
    }

    return dispatch(addIngredientThunk(payload, recipeId))
    .then(() => dispatch(getOneRecipeThunk(recipeId)))
    .then(closeModal)
  };

  return (
    <>
      <h1 className='comment-header'>Add your Ingredient</h1>
      <form className='comment-form' onSubmit={handleSubmit}>
        <label className='comment-label'>
          <input type='text' placeholder='Name of ingredient' onChange={(e) => setIngredientName(e.target.value)}/>
        </label>
        <label className='comment-label'>
          <input type='text' placeholder='Quantity' onChange={(e) => setQuantity(+e.target.value)}/>
        </label>
        <select name='ingredients' className='comment-label' onChange={(e) => setMetric(e.target.value)}>
          <option value="">--Please choose a metric--</option>
          <option value="tsp">tsp</option>
          <option value="Tbsp">Tbsp</option>
          <option value="cups">cup</option>
          <option value="pt">pt</option>
          <option value="qt">qt</option>
          <option value="oz">oz</option>
          <option value="fl oz">fl oz</option>
          <option value="gal">gal</option>
          <option value="lbs">lbs</option>
          </select>
        <button className='comment-button' type="submit">Submit your ingredient</button>
      </form>
    </>
  );
}

export default IngredientFormModal;