import React from 'react'
//REDUX
import {
  BrowserRouter as 
  Router,
  Routes,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from '../config/store';
//Components
import Navbar from './navbar';
import HomeMain from './home-route/home-main.js';
import HomeCreateUser from './home-route/home-create-user.js';
import HomeLogin from './home-route/home-login.js';
import Profile from './profile.js';
import Error from './error.js';

function App() {
  return <>
  <Provider store={store}>
      <Router>
        <Navbar/>

        <Routes>

          <Route path='/' >
            <Route index={true} element={<HomeMain/>}></Route>
            <Route path='create-user' element={<HomeCreateUser/>}></Route>
            <Route path='login-user' element={<HomeLogin/>}></Route>
          </Route>

          <Route path='/profile' element={<Profile/>}>
          </Route>

          <Route path='*' element={<Error/>}>
          </Route>

        </Routes>
      </Router>
    </Provider>
  </>
}

export default App