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
import Home from './home.js';
import Profile from './profile.js';
import Error from './error.js';

function App() {
  return <>
  <Provider store={store}>
      <Router>
        <Navbar/>

        <Routes>

          <Route path='/' element={<Home/>}>
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