import { Link } from "react-router-dom"

import { useState } from "react"

export const LoginForm = () => {

    const [email, setEmail] = []

    return (

        <div>
            <h2>Welcome Back!</h2>
            <h4>We're so excited to see you again!</h4>
            <form action="">
                <label htmlFor="email">EMAIL</label>
                <input type="text" />

                <label htmlFor="password">PASSWORD</label>
                <input type="password" />
                <Link to="/login" >Forgot Your password?</Link>

                <button>Log In</button>

                    <br />

                Need an account?
                <Link to="/register">Register</Link>
            </form>


        </div>

    )
}