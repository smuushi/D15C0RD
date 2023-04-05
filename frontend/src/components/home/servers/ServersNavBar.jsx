import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { activateModalAC } from "../../../reducers/ModalReducer";
import "./ServersNavBar.css"
import { NewServerModal } from "./new_server/NewServerModal";
import { resetModalAC } from "../../../reducers/ModalReducer";

export const ServersNavBar = (props) => {

    const selectedServer = useParams().serverId;
    console.log(`selectedServer is ${selectedServer}`)

    // console.log("rerendering serversnav")

    const allServers = useSelector(state => state.entities.servers);

    const currentUser = useSelector(state => state.entities.session.user);

    const newServerButton = document.getElementById("newserverdiv")

    const dispatch = useDispatch();

    let serverIdsToRender = currentUser.servers;

    const closeModal = (e) => {
        // debugger
        if (e.target.className === 'backdrop' || (e.target.form?.id === "newserverform" && e.target.id === 'submissionbutton')) {
            // debugger
            newServerButton.classList.remove('active')
            newServerButton.classList.add('inactive')
            // debugger
            setTimeout(() => {dispatch(resetModalAC())},20)

        } else {
            console.log("closeModal was ran, but target wasn't the backdrop")
        }
    }

    const activateModal = (e) => {
        // debugger
        e.preventDefault();
        console.log('activationnnn')
        console.log(newServerButton)
        newServerButton.classList.remove('inactive')
        newServerButton.classList.add('active')

            dispatch(activateModalAC(e.currentTarget.id))
            // debugger
    
    }

    // debugger

    // currentUser.servers.forEach((server) => {
    //     serverIdsToRender.push(server.id)
    // }); 
    // debugger

    const serversListElements = serverIdsToRender.map((id) => {
        // debugger
       if (allServers[id] === undefined) {
        return <></>
       }
        
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
            <ul className="ServerNavList" >

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

                <li id="newserverform" onClick={activateModal}>
                    
                        <div id="newserverdiv" className="inactive logoblock">
                            +
                        </div> 
                        <span>Add a server</span>

                </li>
            </ul>
            <NewServerModal modalcloser={closeModal} />
        </>
    )

}