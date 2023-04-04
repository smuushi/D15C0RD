import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";


export const ServersNavBar = (props) => {

    const allServers = useSelector(state => state.entities.servers);

    const currentUser = useSelector(state => state.entities.session.user);


    let serverIdsToRender = [];

    currentUser.servers.forEach((server) => {
        serverIdsToRender.push(server.id)
    }); 
    // debugger

    const serversListElements = serverIdsToRender.map((id) => {
        // debugger

       return <li key={JSON.stringify(id * Math.random())} style={{margin: "20px"}}><Link to={`/home/server/${id}`}>{allServers[id]?.name}</Link></li>
    })

    // let serversListElements;

    // useEffect(() => {
    //     serversListElements = serversListElementsCallBack(allServers)
    // },[allServers])

    // debugger

    return (
        <>
            <ul>

                <li key={JSON.stringify(Math.random())} style={{margin: "20px"}}><Link to={`/home`}>BACK HOME</Link></li>
                
                {serversListElements}
            </ul>
        </>
    )

}