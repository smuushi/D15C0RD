import React from 'react';
import "./cssreset.css"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider, useDispatch } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { restoreSessionStorage } from './store_utils/csrf';
import { configureStore } from './store_utils/store';

import { updateSessionStorageInSessionReducerActionCreator } from './reducers/SessionReducer';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root'));

const initializeApp = () => {
  
  let currentUserAction = updateSessionStorageInSessionReducerActionCreator()

  // // console.log(currentUserAction) 
  // lmaooo 

  const store = configureStore({entities: currentUserAction});



  



  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
  }

  // store.dispatch(restoreSession())
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>

          <App />
      
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )

}

if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser") === null ) {
  // debugger
  restoreSessionStorage().then(initializeApp);

} else {
  initializeApp();
}

// initializeApp();
