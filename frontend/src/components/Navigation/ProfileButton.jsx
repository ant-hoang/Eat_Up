import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => navigate('/'));
  };

  const handleAddRecipe = (e) => {
    e.preventDefault()
    navigate('/recipes/new')
  }

  return (
    <>
      <ul className="profile-dropdown">
        <li>Hello, {user.username}!</li>
        <li>
          <button
            onClick={handleAddRecipe}
            className="profile-add-recipe"
            id="profile-add-recipe"
          >Add a recipe!</button>
        </li>
        <li>
          <button
            onClick={logout}
            className="profile-log-out"
            id="profile-log-out"
            >Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;