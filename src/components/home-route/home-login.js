import React from 'react'

function HomeLogin() {
  
  return <section className='login-user'>
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

export default HomeLogin;