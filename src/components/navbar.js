import Cookies from 'js-cookie';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {setIsSubmitCompleteOff, setUserLoggedIn}  from '../controllers/create-user-data-slice.js';
import { setIsUserLoggedInOff } from '../controllers/login-data-slice.js';
import { setLogOut } from '../controllers/logout-data-slice.js';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userLogStatus}  = useSelector((store) => store.logoutSlice);


  return <>
  <nav className='nav-container'>

    <div className='auth-heading'>
      <h1>Auth App</h1>
    </div>
    <div className='log-container'>
      { userLogStatus ?
      <button 
        className='log-container-item' 
        onClick={() => {

          Cookies.remove('auth_token');
          Cookies.remove('SESSION_LOGIN_ID');
          Cookies.remove('SESSION_CREATE_ID');
          navigate('/')
          dispatch(setLogOut());
          dispatch(setIsUserLoggedInOff())
          dispatch(setIsSubmitCompleteOff())
          }
          }>
        <h3>Log Out</h3>
      </button>
      :
      <button className='log-container-item welcome-board' >
        <h2>Welcome</h2>
      </button>
      }
    </div>
  </nav>
  </>
  
}

export default Navbar;