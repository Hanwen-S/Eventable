
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
import { Account } from './components/account';
import { MyEvent } from './components/myEvent';
//import SlotCard from './components/time-slots/slotCard';
import SlotsHome from './components/time-slots/slotshome';
import CreateEventForm from './components/CreateEventForm';
import EditEvent from './components/editEvent';
import FullEvent from './components/FullEventForm';
import EvenCard from './components/FullEventCard';
import EditEventForm from './components/EditEventForm';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>

    <Route exact path='/signup' element={<SignUp/>}></Route>
    <Route exact path='/' element={<SignIn/>}></Route>
    <Route exact path='/home' element={<ResponsiveDrawer/>}></Route>
    <Route exact path='/EventCard' element={<Checkout/>}></Route>
    <Route exact path='/bigCard' element={<BigCard/>}></Route>
    <Route exact path='/account' element={<Account/>}></Route>
    <Route exact path='/myEvent' element={<MyEvent/>}></Route>
    <Route exact path='/edit' element={<EditEvent/>}></Route>
    <Route exact path='/EditEventForm' element={<EditEventForm/>}></Route>
    {/*<Route exact path='/slots' element={<SlotCard/>}></Route>*/}
    <Route exact path='/slothome' element={<SlotsHome/>}></Route>
    <Route exact path='/CreateEventForm' element={<CreateEventForm/>}></Route>
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
