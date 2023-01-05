import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setLoginFormData , submitLoginForm, setLoginErrorOff, setIsUserLoggedInOff, setIsUserLoggedInOn, setIsLoginSubmitComplete} from '../../controllers/login-data-slice';
import { TiTick } from 'react-icons/ti';
import { setUser } from '../../controllers/profile-data-slice';
function HomeLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {loginFormData, formError, isLoading, isUserLoggedIn} = useSelector(store => store.loginSlice)

  useEffect(() => {
    if (formError[0] === true) {
      setTimeout(() => {
        dispatch(setLoginErrorOff())
      }, 5000);
    }
  })

  return <main className='main-login-container'>
    {isLoading ?
       <div className='home-loader-container'>
        <div id='home-loader'>

        </div>

        <h3>Please Wait . . .</h3>
       </div> 
       
       :

       isUserLoggedIn.status ? <LoginModal/> :
    <section className='login-user'>
      <div>
        <h3>Login To Your Auth App Account</h3>
        <p>Do not share your real info, this is a portfolio site</p>
        {formError[0] && <p className='form-error'>{formError[1]}</p>}
      </div>
      <form action="" method="post" className='login-user-form'>
        <div className='form-control'>
          <input 
            type="text" 
            name='usernameID' 
            required={true}
            value={loginFormData.usernameID}
            onChange={(e) => dispatch(setLoginFormData({name: e.target.name, value: e.target.value}))}
            />
          <label htmlFor="usernameID">@UsernameID</label>
        </div>
        <div className='form-control'>
          <input 
            type="password" 
            name='password'  
            required={true}
            value={loginFormData.password}
            onChange={(e) => dispatch(setLoginFormData({name: e.target.name, value: e.target.value}))}
            />
          <label htmlFor="password">Password</label>
        </div>
      </form>
      
      <button className='login-user-submit-btn' onClick={() => dispatch(submitLoginForm())}>
        <h3>Login</h3>
      </button>
    </section>}
    </main>
}
const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userLoginData} = useSelector(store => store.loginSlice);

//get userID from session cookie
 
  const SESSION_LOGIN_ID = Cookies.get('SESSION_LOGIN_ID');
  console.log(SESSION_LOGIN_ID);
  //init func to get user's info
  const getUsersLoginInfo = async () => {
    
    dispatch(setIsLoginSubmitComplete());
  const {userID} = userLoginData;

  try {
    //await for response
    let res;
      //check if userId is available
      if (userID) {
        res = await axios.get(`http://localhost:8000/profile/${userID}`,
        {
          withCredentials: true
        })
      } 
      if(!userID && SESSION_LOGIN_ID){
        res = await axios.get(`http://localhost:8000/profile/${SESSION_LOGIN_ID}`,
        {
          withCredentials: true
        });
      }

      dispatch(setIsUserLoggedInOn());

      if (!userID && !SESSION_LOGIN_ID) {
        throw new Error('Unauthorized!');
      }

      dispatch(setUser(res.data));
      return 'login-complete';
  } catch (error) {
    return;
  }
}

useEffect(() => {
    const test = async () => {
      const isComplete = await getUsersLoginInfo();
    
        if (isComplete === 'login-complete') {
          console.log(0);
          navigate('/locked-routes/profile');
        }
    }
    test()
  },[])

  return <>
    <div className='home-modal-container'>
      <h3>You have successfully Logged In</h3>
      <TiTick id='tick'></TiTick>
      <h4>Redirecting to your profile</h4>
      <div id='home-modal-loader'></div>
    </div>
  </>
}
export default HomeLogin;