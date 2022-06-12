import React, { useEffect } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from './containers/Home';
import Signin from './containers/SignIn';
import Signup from './containers/SignUp';

import PrivateRoute from './components/HOC/PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';

import { isUserLoggedIn, getInitialData } from './actions';

import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());

  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/category" element={<PrivateRoute>
          <Category />
        </PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute>
          <Products />
        </PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute>
          <Orders />
        </PrivateRoute>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
