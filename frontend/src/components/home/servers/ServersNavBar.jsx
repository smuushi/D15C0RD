import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import "./ServersNavBar.css"


export const ServersNavBar = (props) => {

    const selectedServer = useParams().serverId;
    console.log(`selectedServer is ${selectedServer}`)

    console.log("rerendering serversnav")

    const allServers = useSelector(state => state.entities.servers);

    const currentUser = useSelector(state => state.entities.session.user);


    let serverIdsToRender = currentUser.servers;

    // debugger

    // currentUser.servers.forEach((server) => {
    //     serverIdsToRender.push(server.id)
    // }); 
    // debugger

    const serversListElements = serverIdsToRender.map((id) => {
        // debugger

       return <li key={JSON.stringify(id * Math.random())}>
        <Link to={`/home/server/${id}`}>
            {selectedServer == id? <div className="activeIndicator selected"></div> : <div className="activeIndicator notselected"></div>}
            {selectedServer == id? 
            <div className="active logoblock">
                {allServers[id]?.logo? <>somelogo</> : allServers[id]?.name[0]}
            </div> 
            : 
            <div className="inactive logoblock">
                {allServers[id]?.logo? <>somelogo</> : allServers[id]?.name[0]}
            </div> 
            }
        </Link>
            <span>{allServers[id]?.name}</span>
        </li>
    })

    // let serversListElements;

    // useEffect(() => {
    //     serversListElements = serversListElementsCallBack(allServers)
    // },[allServers])

    // debugger



    return (
        <>
            <ul className="ServerNavList">

                <li className="Home" key={JSON.stringify(Math.random())}>
                    <Link to={`/home`}>
                    {selectedServer === undefined? <div className="activeIndicator selected"></div> : <div className="activeIndicator notselected"></div>}
                    {selectedServer === undefined? 
                        <div className="active logoblock">
                            SOME LOGO
                        </div> 
                        : 
                        <div className="inactive logoblock">
                            SOME LOGO
                        </div> 
                    }
                        </Link>
                        <span> Direct Messages </span>
                </li>
                    <div className="someseparationlmao"></div>
                {serversListElements}

                <li>
                    NEW SERVER BUTTON COMING HERE
                </li>
            </ul>
        </>
    )

}