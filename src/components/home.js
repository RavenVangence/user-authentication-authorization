import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setFormData, submitCreateUserForm } from '../controllers/data-slice';

function Home() {
  const dispatch = useDispatch();
  const {userLogState, formData} = useSelector(store => store.data);

  return <main className='main-home-container'>
    {
      userLogState ? 
      
      <section className='create-user'>
      <div>
        <h3>Create An Auth App Account</h3>
        <p>Do not share your real info, this is a portfolio site</p>
      </div>
      <form>
        <div className='form-control'>
          <input 
            type="text" 
            name='firstname'  
            required={true}
            value={formData.firstname} 
            onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))}/>
          <label htmlFor="firstname">First Name</label>
        </div>
        <div className='form-control'>
          <input 
          type="text" 
          name='lastname'  
          required={true}
          value={formData.lastname} 
          onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))}/>
          <label htmlFor="lastname">Last Name</label>
        </div>
        <div className='form-control'>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required={true}
            value={formData.email}
             onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))} />
          <label htmlFor="email">Email</label>
        </div>
        <div className='form-control'>
          <input 
            type="text" 
            name='username'  
            required={true}
            value={formData.username} 
            onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))}/>
          <label htmlFor="username">Username</label>
        </div>
        <div className='form-control'>
          <input 
            type="text" 
            name='usernameID' 
            required={true}
            value={formData.usernameID} 
            onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))}/>
          <label htmlFor="usernameID">@UsernameID</label>
        </div>
        <div className='form-control'>
          <input 
            type="password" 
            name='password'  
            required={true}
            value={formData.password}
            onChange={(e) => dispatch(setFormData({ name: e.target.name, value: e.target.value}))}/>
          <label htmlFor="password">Password</label>
        </div>
      </form>
      
      <button className='create-user-submit-btn' onClick={() => dispatch(submitCreateUserForm())}>
          <h3>Create Profile</h3>
        </button>
      </section>
    
      :
      
      <section className='login-user'>
      <div>
        <h3>Login To Your Auth App Account</h3>
        <p>Do not share your real info, this is a portfolio site</p>
      </div>
      <form action="" method="post" className='login-user-form'>
        <div className='form-control'>
          <input type="text" name='usernameID' required={true}/>
          <label htmlFor="usernameID">@UsernameID Or Email</label>
        </div>
        <div className='form-control'>
          <input type="password" name='password'  required={true}/>
          <label htmlFor="password">Password</label>
        </div>
      </form>
      
      <button className='login-user-submit-btn'>
          <h3>Login</h3>
        </button>
    </section>
    }
  </main>
}

export default Home;