
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import SignIn from './components/signIn';
import SignUp from "./components/signUp";
import { Route } from "react-router-dom";
import ResponsiveDrawer from "./components/home";
import Checkout from './components/Checkout';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route exact path='/signup' component={SignUp}></Route>
    <Route exact path='/' component={SignIn}></Route>
    <Route exact path='/home' component={ResponsiveDrawer}></Route>
    <Route exact path='/EventCard' component={Checkout}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//nodemon server_winter22obj npm start
reportWebVitals();
