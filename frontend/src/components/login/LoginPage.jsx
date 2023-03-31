import { LoginForm } from "./LoginForm"

export const LoginPage = () => {



    return(
        <div className="LoginModule" >
            <img src="/assets/splash/splashbackground1.svg" style={{ zIndex:-1, position: "absolute"}}/>
            {/* <div>LOGINFORMPLACEHOLDER WHERE U ACTUALLY TYPE STUFF. </div> */}
            <LoginForm />


        </div>
    )

}


