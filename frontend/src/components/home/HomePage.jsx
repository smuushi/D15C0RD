import { useEffect } from "react";
import { UserStatusBar } from "../UserStatusBar"
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServers } from "../../reducers/ServerReducer";
import { ServersNavBar } from "./servers/ServersNavBar";
import { useParams } from "react-router-dom";
import { SubNav } from "./SubNav";
import { ServerShow } from "./servers/ServerShow";
import { fetchAllUsers } from "../../reducers/UserReducer";

export const HomePage = (props) => {

    // document.getElementById('root'))
    const isLoggedIn = !!useSelector(state => state.entities.session.user);

    const location = useParams()
    console.log(location)


    // debugger

    if (isLoggedIn) {
        let bodyy = document.getElementsByTagName('body')[0]
        bodyy.setAttribute("style", "height: 100%; overflow: hidden; background-color: rgb(54, 57, 62)")
    }

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("papayaing")
        dispatch(fetchAllServers())
        dispatch(fetchAllUsers())
    },[isLoggedIn])


    return (
        <div className="HomePageWrapper" >
            
            <div className="ServersNav">
                <ServersNavBar />
            </div>
            
            <div className="Convos">
                <div className="SubNavigation">
                    SUBNAV HERE
                    <SubNav 
                        server={location.serverId? location.serverId : null}
                        misc = {location.misc? location.misc : null}
                    />
                </div>
                < UserStatusBar />
            </div>

            <div className="ShowDisplay">
                <div>
                    SERVER SHOW

                    <ServerShow 
                        server={location.serverId? location.serverId : null}
                        channel={location.channelId? location.channelId : null}
                    />

                </div>
            </div>


            
        </div>

    )

}