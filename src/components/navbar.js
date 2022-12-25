import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setUserLoggedIn}  from '../controllers/data-slice.js';

function Navbar() {
  const dispatch = useDispatch();
  const {userLogState}  = useSelector((store) => store.data)


  return <>
  <nav className='nav-container'>

    <div className='auth-heading'>
      <h1>Auth App</h1>
    </div>
    <div className='log-container'>
      { userLogState ?
      <button className='log-container-item' onClick={() => dispatch(setUserLoggedIn())}>
        <h3>Logout</h3>
      </button>
      :
      <button className='log-container-item' onClick={() => dispatch(setUserLoggedIn())}>
        <h3>Sign Up</h3>
      </button>
      }
    </div>
  </nav>
  </>
  
}

export default Navbar;