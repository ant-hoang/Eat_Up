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
    // New Code
    sessionLinks = (
      <section>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </section>
    )

    // Old Code
    // sessionLinks = (
    //   <li>
    //     <ProfileButton user={sessionUser} />
    //   </li>
    // );
  } else {
    // New Code
    sessionLinks = (
      <>
        <section>
          <div className='log-container flex content-between'>
            <li>
              <button onClick={handleDemoClick}>Demo Log In</button>
            </li>
            <li>
              <OpenModalButton
                buttonText='Log In'
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </div>
        </section>
      </>
    )

    // Old Code
    // sessionLinks = (
    //   <>
    //     <div className="nav-no-session" id="nav-no-session">
    //       <li className='nav-demo' id='nav-demo'>
    //         <button onClick={handleDemoClick}>Demo Log In</button>
    //       </li>
    //       <li className='nav-log-in' id='nav-log-in'>
    //         <OpenModalButton
    //           buttonText="Log In"
    //           modalComponent={<LoginFormModal />}
    //         />
    //       </li>
    //       <li className='nav-log-out' id='nav-log-out'>
    //         <OpenModalButton
    //           buttonText="Sign Up"
    //           modalComponent={<SignupFormModal />}
    //         />
    //       </li>
    //     </div>
    //   </>
    // );
  }

  return (
    <>
      {/* <--------------------------------New-Code------------------------------------------> */}
      {/* Navigation Bar */}
      <section className='new-nav-bar'>
        {/* Home Icon Section */}
        <div className='flex content-between'>
          <NavLink className='flex' to='/'>
            <div>
              <PiBowlFoodLight />
            </div>
            <div>
              Eat Up
            </div>
          </NavLink>
          <div className='list-style-none'>
            {/* Login Section */}
            {isLoaded && sessionLinks}
          </div>
        </div>
      </section>

      {/* <--------------------------------Old-Code------------------------------------------> */}
      <div className='debug'>
        <ul className={`${ulClassName} border-red`} id={ulClassName}>
          <li className='nav-home border-blue flex' id='nav-home-text'>
            <NavLink to="/">
              Eat Up
            </NavLink>
            <NavLink to="/">
              <PiBowlFoodLight />
            </NavLink>
          </li>
          <li className='nav-home' id='nav-home-icon'>
            <NavLink to="/">
              <PiBowlFoodLight />
            </NavLink>
          </li>
          {isLoaded && sessionLinks}
        </ul>
      </div>

      <div>
        {/* // </div> */}
        {/* // <div className='nav-container' id='nav-container'> */}
        <ul className={`${ulClassName} border-red`} id={ulClassName}>
          <li className='nav-home border-blue' id='nav-home-text'>
            <NavLink to="/">
              Eat Up
            </NavLink>
          </li>
          <li className='nav-home border-green' id='nav-home-icon'>
            <NavLink to="/">
              <PiBowlFoodLight />
            </NavLink>
          </li>
          {/* <li>
        <img className="home-cover" src={food_cover} alt="Food_Cover"/>
        </li> */}
          {isLoaded && sessionLinks}
        </ul>
        {/* // </div> */}
      </div>


    </>
  );
}

export default Navigation;