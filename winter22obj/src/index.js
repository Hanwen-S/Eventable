
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import SignIn from './components/signIn';
import SignUp from "./components/signUp";
import { Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/home";
import Checkout from './components/Checkout';
import BigCard from './components/eventCard';
import { account } from './components/account';
import SlotCard from './components/card2';
import SlotsHome from './components/slotshome';
import FullEvent from './components/FullEventForm';
import EvenCard from './components/FullEventCard';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      
    <Route exact path='/signup' element={<SignUp/>}></Route>
    <Route exact path='/' element={<SignIn/>}></Route>
    <Route exact path='/home' element={<ResponsiveDrawer/>}></Route>
    <Route exact path='/EventCard' element={<Checkout/>}></Route>
    <Route exact path='/bigCard' element={<BigCard/>}></Route>
    <Route exact path='/account' element={<account/>}></Route>
    <Route exact path='/slots' element={<SlotCard/>}></Route>
    <Route exact path='/slothome' element={<SlotsHome/>}></Route>
    <Route exact path='/test1' element={<EvenCard/>}></Route>
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//nodemon server_winter22obj npm start
reportWebVitals();
