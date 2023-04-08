import { useEffect } from "react";
import { UserStatusBar } from "../UserStatusBar"
import "./home.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServers } from "../../reducers/ServerReducer";
import { ServersNavBar } from "./servers/ServersNavBar";
import { Navigate, redirect, useParams } from "react-router-dom";
import { SubNav } from "./SubNav";
import { ServerShow } from "./servers/ServerShow";
import { fetchAllUsers } from "../../reducers/UserReducer";
import { fetchAllChannels } from "../../reducers/ChannelReducer";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../store_utils/csrf";

export const HomePage = (props) => {

    // document.getElementById('root'))
    const isLoggedIn = !!useSelector(state => state.entities.session.user);

    

    const location = useParams()
    var currentServer = useSelector(state => state.entities.servers[location.serverId]? state.entities.servers[location.serverId] : "wer")
    console.log(location)

    


    // debugger

    if (isLoggedIn) {
        let bodyy = document.getElementsByTagName('body')[0]
        bodyy.setAttribute("style", "height: 100%; overflow: hidden; background-color: rgb(54, 57, 62)")
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // if (currentServer !== "wer") {
    //     debugger
    //     redirect(currentServer.id)
    // }


    useEffect(() => {

        // debugger

        if (location.serverId){
            let test = async () => {
                const res = await csrfFetch(`/api/servers/${location.serverId}`)
                if (!res.ok) {
                    navigate("/home")
                }
                return res
            }


            test().then(() => {
                if (location.channelId) {
                    let test2 = async () => {
                        const res = await csrfFetch(`/api/channels/${location.channelId}`)
                        if (!res.ok) {
                            navigate(`/home/server/${location.serverId}`)
                        }
                        return res
                    }
                    test2().then((res) => {
                        // debugger
                                    const test3 = async (ress) => {
                                        // debugger
                                        if (ress.ok){

                                            let channel = await ress.json()
                                            // debugger
                                            if (!(channel.serverId == location.serverId)){
                                                navigate(`/home/server/${location.serverId}`) 
                                            }
                                            
                                        }
                                    }

                        test3(res); 
                    });
                }
            })
        }

        console.log("papayaing")
        dispatch(fetchAllServers()).then(() => {

            return dispatch(fetchAllUsers())
        }

        ).then(() => {

            return dispatch(fetchAllChannels())
        }
            
        ).then(() => {
            
        let whatthe = new Promise((resolve) => {
            setTimeout(() => {
                resolve(console.log("trying to wait for everything to load.."))
            }, 10)
        })
        
        whatthe.then(() => {

            // debugger
                // redirect()
                
            }
        )})
            // there was attempt here to figure what to do 
            // if a user types a valid url, 
            // but the parameters dont exist.. 
            // ie. ..server/90089
            // going to refactor to shoot a fetch for a specific server
            // and if 404, then redirect.. otherwise, proceed. 
        
    },[isLoggedIn])

    // const redirect = (currentServerId) => {

    //             if (location.serverId && !currentServer) {
    //                 // debugger
    //                 navigate("/home")
    //             } else if (location.serverId && currentServer) {
    //                 // debugger
    //                 navigate(`/home/server/${currentServerId}`)
    //             }


    // }

    // debugger
    

    return (
        <div className="HomePageWrapper" >
            
            <div className="ServersNav">
                <ServersNavBar />
            </div>
            
            <div className="Convos">
                <div className="SubNavigation">

                    <SubNav 
                        server={location.serverId? location.serverId : null}
                        misc = {location.misc? location.misc : null}
                    />
                </div>
                < UserStatusBar />
            </div>

            <div className="ShowDisplay">
                <div className="ShowWrapper">


                    <ServerShow 
                        server={location.serverId? location.serverId : null}
                        channel={location.channelId? location.channelId : null}
                    />

                </div>
            </div>


            
        </div>

    )

}