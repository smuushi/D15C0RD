import { Link, useParams } from "react-router-dom"

import { useEffect, useState } from "react"

import { sessionLogin } from "../../reducers/SessionReducer"
import { useDispatch, useSelector } from "react-redux"

export const LoginForm = (props) => {

    const passedEmail = props.passedEmail
    // debugger

    const [email, setEmail] = useState( passedEmail ? passedEmail : "")

    const [password, setPassword] = useState("")

    // const [localError, setLocalError] = useState("")
    // was going to use a local state to tell the user that email is required,
    // but i can just use the "required" keyword in html. :))

    const sessionError = useSelector(state => state.errors.sessionError)

    // debugger
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {dispatch({type:"whatever.. i'm just trying to clear the errors", asdf:"asdf"})}

    },[])


    const changeHandler = (e) => {
        e.preventDefault();

        // debugger

        if (e.target.id === "email"){
            setEmail(() => e.target.value)
        } else if (e.target.id === "password") {
            setPassword(() => e.target.value)
        }
    }


    const submitHandler = async (e) => {

        e.preventDefault();

        const userInfo = {
            email, 
            password
        }

        dispatch(sessionLogin(userInfo));

    }

    const demologin = (e) => {
        e.preventDefault();
        // console.log("logging in with demo")

        const userInfo = {
            email: "demo@demo.io", 
            password: "password"
        }

        dispatch(sessionLogin(userInfo))

    }

    return (

        <div className="Wrapper">
            <h2>Welcome back!</h2>
            <h4>We're so excited to see you again!</h4>
            <div>
                
                <form 
                    className="LoginForm" 
                    onSubmit={submitHandler}
                    >
                    
                    <label className="formlabel" htmlFor="email">EMAIL <span className="ErrorText">{sessionError[0]? `- ${sessionError[0]}` : ""}</span></label> 
                    <input id="email" type="text" value={email} onChange={changeHandler} required />

                    <label className="formlabel" htmlFor="password" >PASSWORD <span className="ErrorText">{sessionError[0]? `- ${sessionError[0]}` : ""}</span></label> 
                    <input id="password" type="password" value={password} onChange={changeHandler}/>

                    <Link to="/login" >Forgot Your password?</Link>

                    <button className="LButton" >Log In</button>

                        <br />


                    <div id="someTextlmao" >Need an account? <Link to={`/register/${email ? email : ""}`}>Register</Link> </div>

                    <button className="LButton demo1button" onClick={demologin}>Sign in with demo</button>

                </form>

            </div>

        </div>

    )
}