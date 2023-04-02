import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const PreLoginNavBar = () => {

    const session = useSelector(state => state.entities.session.user)

    // debugger

    return(
        <nav className="splash" style={{border: "solid"}} > 
            <div>some nav here~</div>
            <ul>

            <li><Link to="/" >D15C0RD</Link></li>
            <li>{!!session? <Link to="/home">Open Discord</Link> : <Link to="/login" >Login</Link>}</li>

            </ul>
            
        </nav>
    )
}