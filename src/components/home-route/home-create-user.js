import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setErrorOff, postData} from '../../controllers/create-user-data-slice';
import { useNavigate } from "react-router-dom";
import {TiTick} from 'react-icons/ti';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setUser } from '../../controllers/profile-data-slice';
import { setIsSubmitComplete, setIsUserCreatedOff, setIsUserCreatedOn } from '../../controllers/create-user-data-slice';
function HomeCreateUser() {
  const dispatch = useDispatch();
  const {isLoading, formData, formError, isSubmitComplete} = useSelector(store => store.createUserSlice);
  
  useEffect(() => {
    if (formError[0] === true) {
      setTimeout(() => {
        dispatch(setErrorOff())
      }, 15000);
    }
  },[])

  return <main className='main-create-container'>
    { isLoading ?
       <div className='home-loader-container'>
        <div id='home-loader'>

        </div>

        <h3>Please Wait . . .</h3>
       </div>
      

      : 
      
      isSubmitComplete ?  <HomeModal/> : <section className='create-user'>
      <div>
        <h3>Create An Auth App Account</h3>
        <p>Do not share your real info, this is a portfolio site</p>
      {formError[0] && <p className='form-error'>{formError[1]}</p>}
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
      
      <button 
        className='create-user-submit-btn' 
        onClick={() => {
        dispatch(postData())
        dispatch(setErrorOff())
        }}>
          <h3>Create Profile</h3>
        </button>


      </section>}
      
  </main>
}


const HomeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData, isUserCreated, isSubmitComplete} = useSelector(store => store.createUserSlice)

  
  const SESSION_CREATE_ID = Cookies.get('SESSION_CREATE_ID');
  //init func to get user's inf
  const getUsersInfo = async () => {
    //destructure user id from userDat in CreateUserSlice
    const {userID} = userData;
    dispatch(setIsSubmitComplete());

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
      if(!userID && SESSION_CREATE_ID){
        res = await axios.get(`http://localhost:8000/profile/${SESSION_CREATE_ID}`,
        {
          withCredentials: true
        });
      }

      
      if (!userID && !SESSION_CREATE_ID) {
        throw new Error('Unauthorized!');
      }
      dispatch(setIsUserCreatedOn());
      //set user in profileSlice
      dispatch(setUser(res.data));
      return 'complete';
    } catch (error) {
      return error;
    }
  }
  
  
  

  useEffect(() => {
    const test = async () => {
      const isComplete = await getUsersInfo();
    
        if (isComplete === 'complete') {
          console.log(1);
          navigate('/locked-routes/profile');
        }
    }
    test()
  },[])

  

  return <>
    <div className='home-modal-container'>
      <h3>Your account has been successfully been created</h3>
      <TiTick id='tick'></TiTick>
      <h4>Redirecting to your profile</h4>
      <div id='home-modal-loader'></div>
    </div>
  </>
}
export default HomeCreateUser;