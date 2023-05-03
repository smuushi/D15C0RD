import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { activateModalAC } from "../../../reducers/ModalReducer";
import "./ServersNavBar.css"
import { NewServerModal } from "./new_server/NewServerModal";
import { resetModalAC } from "../../../reducers/ModalReducer";
import { LeaveServerModal } from "./leave_server/LeaveServerModal";
import { useState } from "react";

export const ServersNavBar = (props) => {

    const selectedServer = useParams().serverId;
    // // console.log(`selectedServer is ${selectedServer}`)

    // // console.log("rerendering serversnav")

    const allServers = useSelector(state => state.entities.servers);

    const currentUserId = useSelector(state => state.entities.session.user?.id)

    const currentUser = useSelector(state => state.entities.users[currentUserId]);

    const newServerButton = document.getElementById("newserverdiv")

    const dispatch = useDispatch();

    let serverIdsToRender = currentUser?.joinedServers;

    const [mousePos, setMousePos] = useState(null);

    const currentMousePos = mousePos

    let ServerNavList = document.getElementById('ServerNavList')
    // debugger

    // // console.log(mousePos)

        // if (mousePos > 74) {
        //     // // console.log("mousePos state is greater than 74")
        //     // debugger
        //     if (ServerNavList?.attributes.style?.nodeValue !== "width: 75px;"){
        //         ServerNavList?.setAttribute("style", "width: 75px;")
        //     }
        // } else {
            
        //     // console.log("mousePos state is less than 74")

        //     if (ServerNavList?.attributes.style?.nodeValue !== "width: 22vw;"){
        //         ServerNavList?.setAttribute("style", "width: 32vw;")
        //     }
        // }

    const updateMousePosition = (e) => {
        // // console.log(mousePos)
        // debugger
        if (currentMousePos === null) {
            // debugger
            setMousePos(e.clientX);
            return
        }   

        // debugger

        if ((mousePos?.x <= 75 && e.clientX > 75)) {
            // debugger
        }

        
    };

    // useEffect(() => {

    //     window.addEventListener('mousemove', updateMousePosition);
    //     return () => {
    //         window.removeEventListener('mousemove', updateMousePosition);
    //     };


    // },[])

    const closeModal = (e) => {
        // debugger
        if (e.target.className === 'backdrop' || (e.target.form?.id === "newserverform" && e.target.id === 'submissionbutton')) {
            // debugger
            newServerButton.classList.remove('active')
            newServerButton.classList.add('inactive')
            // debugger
            setTimeout(() => {dispatch(resetModalAC())},20)

        } else {
            // console.log("closeModal was ran, but target wasn't the backdrop")
        }
    }

    const activateModal = (e) => {
        // debugger
        e.preventDefault();
        // console.log('activationnnn')
        // console.log(newServerButton)
        newServerButton?.classList.remove('inactive')
        newServerButton?.classList.add('active')

            dispatch(activateModalAC(e.currentTarget.id))
            // debugger
    
    }

    // debugger

    // currentUser.servers.forEach((server) => {
    //     serverIdsToRender.push(server.id)
    // }); 
    // debugger

    const serversListElements = serverIdsToRender?.map((id) => {
        // debugger
       if (allServers[id] === undefined) {
        return <></>
       }
       
    //    debugger

       return <li key={JSON.stringify(id * Math.random())}>
        <Link to={`/home/server/${id}`}>
            {selectedServer == id? <div className="activeIndicator selected"></div> : <div className="activeIndicator notselected"></div>}
            {selectedServer == id? 
            <div className="active logoblock">
                {allServers[id]?.icon? <img src={allServers[id].icon} /> : allServers[id]?.name[0]}
            </div> 
            : 
            <div className="inactive logoblock">
                {allServers[id]?.icon? <img src={allServers[id].icon} /> : allServers[id]?.name[0]}
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
            <LeaveServerModal />
            <div id="resizetrigger"></div>
            <ul id="ServerNavList" className="ServerNavList" >
                <li className="Home" key={JSON.stringify(Math.random())}>
                    <Link to={`/home`}>
                    {selectedServer === undefined? <div className="activeIndicator selected"></div> : <div className="activeIndicator notselected"></div>}
                    {selectedServer === undefined? 
                        <div className="active logoblock">
                            <img style={{maxWidth:"80px", maxHeight: "80px"}} src="/assets/misc/animecord.png"/>
                        </div> 
                        : 
                        <div className="inactive logoblock">
                            <img style={{maxWidth:"80px", maxHeight: "80px"}} src="/assets/misc/animecord.png"/>

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