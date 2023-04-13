import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const PreLoginNavBar = () => {

    const session = useSelector(state => state.entities.session.user)

    // debugger

    return(
        <nav className="splash" > 

            

            <li id="linker"><Link to="/" ><img id="photopotato" src="/assets/misc/animecord.png" alt="" /> D15C0RD</Link></li>
            <li className="LL">{!!session? <Link to="/home" className="LL">Open Discord</Link> : <Link to="/login" className="LL">Login</Link>}</li>

            
            
        </nav>
    )
}