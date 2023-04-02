import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const PreLoginNavBar = () => {

    const session = useSelector(state => state.entities.session.user)

    // debugger

    return(
        <nav className="splash" > 
            <div>some nav here~</div>
            

            <li><Link to="/" >D15C0RD</Link></li>
            <li className="LL">{!!session? <Link to="/home" className="LL">Open Discord</Link> : <Link to="/login" className="LL">Login</Link>}</li>

            
            
        </nav>
    )
}