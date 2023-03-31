import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { SplashPage } from "./components/splash/SplashPage";
import { LoginPage } from "./components/login/LoginPage";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      

      <Routes>
        <Route path="/" element={ <SplashPage /> } />
        <Route path="/login" element={ <LoginPage /> } />


      </Routes>

    </>
  );
}

export default App;
