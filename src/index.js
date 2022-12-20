import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
//REDUX
import { Provider } from 'react-redux';
//CSS
import './css/global.css';
//COMPONENTS
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import Profile from './components/profile.js';
import Error from './components/error.js'
import store from './config/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
