import { UserStatusBar } from "../UserStatusBar"
import "./home.css"

export const HomePage = (props) => {




    return (
        <div className="HomePageWrapper">
            
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