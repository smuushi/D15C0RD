import logo from './logo.svg';
import './App.css';
// import { Route, Switch } from 'react-router';

import { Route, Routes } from "react-router-dom"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function App() {

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("trying to log in")
    
  }


  let currentSessionId = useSelector(state => state.session['loggedInId'])

  // debugger

  let loggedIn = !!currentSessionId

 // store.dispatch({type:"ADDME", id: 12 })
 // ^ put this in windows console to see yourself login...
  

  return (
    <div className="App">
    <Routes>

      <Route path='/login' element={
      !loggedIn? 

          <>
          <h1> login here </h1>
          <form onSubmit={submitHandler}> 
          <label htmlFor='username'> username here </label>
          <input type="text" id='username' name="username" placeholder='username'/>
          <br></br>
          <label htmlFor='password'> password here </label>
          <input type="password" id='password' name="password" placeholder='username'/>            
          
          <input type="submit" value="login~~"/> 
          </form>
          </> 

            : 

          <>
          <h3> ur logged in because sessionId detected..</h3>
          </>

      } />
      

      <Route path='/' element={
        <>
          <h1> hello from the root </h1>
        </>
      } />
      

      

    </Routes>

    </div>
  );
}

export default App;
