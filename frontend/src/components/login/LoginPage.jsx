import { LoginForm } from "./LoginForm"
import { redirect } from "react-router-dom"
import { useParams } from "react-router-dom";

export const LoginPage = () => {

    const passedEmail = useParams().slug;

    debugger

    return(
        <div className="LoginModule" >
            <img src="/assets/splash/splashbackground1.svg" style={{ zIndex:-1, position: "absolute"}}/>
            {/* <div>LOGINFORMPLACEHOLDER WHERE U ACTUALLY TYPE STUFF. </div> */}
            <LoginForm passedEmail={passedEmail}/>


        </div>
    )

}


