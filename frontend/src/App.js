import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { SplashPage } from "./components/splash/SplashPage";
import { LoginPage } from "./components/login/LoginPage";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserSettingsModal } from "./components/user_settings/UserSettingsModal";

import { HomePage } from "./components/home/HomePage";
import { useDispatch } from "react-redux";
import { resetModalAC } from "./reducers/ModalReducer";
import { RegistrationAIO } from "./components/registration/RegistrationAIO";

function App() {

  const isLoggedIn = !!useSelector(state => state.entities.session.user);

  const dispatch = useDispatch();

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dispatch(resetModalAC())
    }
  });
  // RESET ALL THE OPEN MODALS BABYEEE
  

  return (
    <>
      {/* <h1>Hello, I'm D15C0RD.. I will grow up to be a big strong app</h1> */}

      
      {isLoggedIn ? <UserSettingsModal /> : <></> }


      <Routes>
        <Route path="/" element={ <SplashPage /> } />
        <Route path="/login/" element={ !isLoggedIn ? <LoginPage /> : <Navigate to="/home" /> } />
          <Route path="/login/:slug" element={ !isLoggedIn ? <LoginPage /> : <Navigate to="/home" /> } />
        <Route path="/home" element={ isLoggedIn ? < HomePage /> : <Navigate to="/login" />} />
        <Route path="/register/" element={ !isLoggedIn? <RegistrationAIO /> : <Navigate to="/home" /> } />
          <Route path="/register/:slug" element={ !isLoggedIn? <RegistrationAIO /> : <Navigate to="/home" /> } />

      </Routes>

      {/* {isLoggedIn ? <UserSettingsModal /> : <></> } */}

    </>
  );
}

export default App;


// Regarding Modals.. 
// All modals will be denoted with #Modal ending their file name... 
// The rendering of Modals are done conditionally IF the modal slice of state === that modal's ID (number?)
// When you open the app, all modal nodes will load... 
// however, what returns/renders from them will be conditional on that "===" two lines above
// if i forget, what's important to note is that ONLY ONE MODAL IS OPEN AT A TIME...
// (other hover effects can still be present, but only one interactive modal is active at a time.)
// so using that conditional checking with the modal slice of state should work... 
// that's my hypothesis at least. wish me luck!!

// important to note, I can sorta pass a specific ID per modal down with the prop. which will be useful
// ^ when trying to render modals per user. 


// Regarding My Naming Conventions.. MINE
// anything being rendered as a component will be PascalCase. 
// which means that their styleclass name will also be PascalCase. 
// functions are camel case.
// folders are lowercase and snakecase. :3c.. 
// Consistent aming was really stressful to me to grasp, but I think I'm understanding.. 
// Specific hardcoded functions will be really long and overdescriptive since they shouldn't be used that often anyway

// To Do List: 
// Still need to polish the registrationAIO... 
// currently missing the feature to select the best matching result if the user doesn't type in any matching results.