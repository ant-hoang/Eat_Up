import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const handleAddRecipe = (e) => {
    navigate('/recipes/new')
  }

  return (
    <>
      {/* <button onClick={() => setShowMenu(!showMenu)}>
        <FaUserCircle />
      </button> */}
      {/* <ul className={ulClassName}> */}
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