import logo from './logo.svg';
import './App.css';
// import { Route, Switch } from 'react-router';

import { Route, Routes } from "react-router-dom"


function App() {



  return (
    <div className="App">
    <Routes>

      <Route path='/login' element={
        <>
          <h1> login here </h1>
          <form> 
            bale
            <input type="text" placeholder='username'/>

            
          </form>
        </>
      } />
      

      

    </Routes>

    </div>
  );
}

export default App;
