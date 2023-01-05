import React from 'react'
import {useNavigate} from 'react-router-dom';

function HomeMain() {
  const navigate = useNavigate();

  return <>
    <main className='home-main-container'>
      <h2>Welcome to Auth App</h2>
      <p>
        This is a portfolio website to showcase my ability to implement user authentication and authorization. Therefore I urge you not to use your real information.
      </p>
      <div>
        <button className='home-buttons' onClick={() => navigate('/create-user')}>
          <h3>
            Sign Up
          </h3>
        </button>
        <button className='home-buttons' onClick={() => navigate('/login-user')}>
          <h3>
            Login
          </h3>
        </button>
      </div>
    </main>
  </>
}

export default HomeMain