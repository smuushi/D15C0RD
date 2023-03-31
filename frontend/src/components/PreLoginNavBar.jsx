import { Link } from "react-router-dom"

export const PreLoginNavBar = () => {

    return(
        <nav className="splash" style={{border: "solid"}} > 
            <div>some nav here~</div>
            <ul>

            <li><Link to="/" >Home</Link></li>
            <li><Link to="/login" >Login</Link></li>

            </ul>
            
        </nav>
    )
}