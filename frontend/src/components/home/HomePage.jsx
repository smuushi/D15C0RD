import { UserStatusBar } from "../UserStatusBar"
import "./home.css"
import { useSelector } from "react-redux";

export const HomePage = (props) => {

    // document.getElementById('root'))
    const isLoggedIn = !!useSelector(state => state.entities.session.user);

    // debugger

    if (isLoggedIn) {
        let bodyy = document.getElementsByTagName('body')[0]
        bodyy.setAttribute("style", "height: 100%; overflow: hidden; background-color: rgb(43, 44, 47)")
    }

    return (
        <div className="HomePageWrapper" >
            
            <div className="ServersNav">
                SERVER NAV HERE
            </div>
            
            <div className="Convos">
                <div className="SubNavigation">
                    SUBNAV HERE
                </div>
                < UserStatusBar />
            </div>
            
        </div>

    )

}