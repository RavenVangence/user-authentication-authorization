import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//CSS
import './css/global.css';
//COMPONENTS
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Profile from './components/profile.js';
import Error from './components/error.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
