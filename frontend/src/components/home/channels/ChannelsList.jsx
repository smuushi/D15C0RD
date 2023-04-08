import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { activateModalAC } from "../../../reducers/ModalReducer";
import { ChannelSettingsModal } from "./ChannelSettingsModal";
import { NewChannelModal } from "./new_channel/NewChannelModal";
import "./channels.css"

export const ChannelsList = (props) => {

    const { serverId } = useParams();

    const parchannelId = useParams().channelId;

    const channelIdsArray = useSelector(state => state.entities.servers[serverId]?.channels)
    
    const allChannels = useSelector(state => state.entities.channels)

    const dispatch = useDispatch();

    const openSettingsModal = (e) => {
        // e.preventDefault();


        // debugger
        // e.preventDefault();

        if (e.currentTarget.id === "ChannelSetting"){
            dispatch(activateModalAC(e.currentTarget.id))
            // e.target.setAttribute("style", "display: none")
            
        } 
    }

    const openNewChannelModal = (e) => {
        e.preventDefault();


        dispatch(activateModalAC(e.currentTarget.id))

    }



    const channelLiElements = channelIdsArray?.map((channelId) => {

        if (!allChannels[channelId]) {
            return 
        }    
        return(
            <li id={channelId == parchannelId ? "selectedchannel" : ""}>
                
                <Link to={`/home/server/${serverId}/channel/${channelId}`} >
                    <div id="uiop">

                        <div id="buffer">#</div> 
                        <div id="namecontainer">
                            {`${allChannels[channelId]?.name}`} 
                        </div> 
                    </div>

                    
                    <div id="buttonns">
                        <button><i className="fa-solid fa-user-plus" style={{color: "#c9c9c9"}}></i></button>

                        <button id="ChannelSetting" onClick={openSettingsModal}>
                            <i className="fa-solid fa-gear" style={{color: "#cccccc"}}></i>
                        </button>
                    </div>
                    
                </Link>


            </li>
        )
        
    })
    // console.log(channelLiElements)

    return (
        <ul className="textchannels">
            <ChannelSettingsModal currentServerId={serverId}/>
            <div className="ChannelHeader">
                <div className="headerheader">

                <div>
                    <i className="fa-solid fa-chevron-down" style={{color: "#969696"}}></i>
                </div>

                <div>TEXT CHANNELS</div>
                </div>
                <div>
                <div className="addbutton">
                    <span id="thespan">Create Channel</span>
                    <button id="NewChannel" onClick={openNewChannelModal}>+</button>
                </div>
                </div>
            </div>

            {channelLiElements?.length !== 0 ? channelLiElements : <p> Try adding a channel with the plus icon!</p>}
            

            <NewChannelModal />
        </ul>
    )
}