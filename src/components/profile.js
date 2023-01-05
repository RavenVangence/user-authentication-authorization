import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate,} from 'react-router';
import { Outlet } from 'react-router-dom'
import { setIsUserLoggedInOff } from '../controllers/login-data-slice';
import { setIsUserCreatedOff } from '../controllers/create-user-data-slice';

const Profile = () => {

  const dispatch = useDispatch();
  const {isUserCreated} = useSelector(store => store.createUserSlice);
  const {isUserLoggedIn} = useSelector(store => store.loginSlice);

  console.log(0);
  if (isUserCreated.status === true) {
    return <Outlet/>;
  } 
  if(isUserLoggedIn.status === true){
    return <Outlet/>;
  } 
  if (isUserCreated.status === false && isUserLoggedIn.status === false){
    dispatch(setIsUserCreatedOff())
    dispatch(setIsUserLoggedInOff())
  return <Navigate to='/' replace/>
  }

}
export default Profile;