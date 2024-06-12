import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { login } from '../../store/session';
import { PiBowlFoodLight } from "react-icons/pi";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  const handleDemoClick = (e) => {
    e.preventDefault();
    dispatch(login({ credential: 'Demo-lition', password: 'password' }))
  }

  const ulClassName = sessionUser ? "nav-bar-logged" : "nav-bar"

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <div className="nav-no-session" id="nav-no-session">
          <li className='nav-demo' id='nav-demo'>
            <button onClick={handleDemoClick}>Demo Log In</button>
          </li>
          <li className='nav-log-in' id='nav-log-in'>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li className='nav-log-out' id='nav-log-out'>
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </li>
        </div>
      </>
    );
  }

  return (
    // <div className='nav-container' id='nav-container'>
    <ul className={ulClassName} id={ulClassName}>
      <li className='nav-home' id='nav-home-text'>
        <NavLink to="/">
          Eat Up
        </NavLink>
      </li>
      <li className='nav-home' id='nav-home-icon'>
        <NavLink to="/">
          <PiBowlFoodLight />
        </NavLink>
      </li>
      {/* <li>
        <img className="home-cover" src={food_cover} alt="Food_Cover"/>
      </li> */}
      {isLoaded && sessionLinks}
    </ul>
    // </div>
  );
}

export default Navigation;