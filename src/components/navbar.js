import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setUserLoggedIn}  from '../controllers/create-user-data-slice.js';

function Navbar() {
  const dispatch = useDispatch();
  const {userLogState}  = useSelector((store) => store.createUserSlice)


  return <>
  <nav className='nav-container'>

    <div className='auth-heading'>
      <h1>Auth App</h1>
    </div>
    <div className='log-container'>
      { userLogState ?
      <button className='log-container-item' onClick={() => dispatch(setUserLoggedIn())}>
        <h3>Log Out</h3>
      </button>
      :
      <button className='log-container-item' onClick={() => dispatch(setUserLoggedIn())}>
        <h3>Home</h3>
      </button>
      }
    </div>
  </nav>
  </>
  
}

export default Navbar;