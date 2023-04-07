import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { activateModalAC } from "../../../reducers/ModalReducer";
import { ChannelSettingsModal } from "./ChannelSettingsModal";
import { NewChannelModal } from "./new_channel/NewChannelModal";

export const ChannelsList = (props) => {

    const { serverId } = useParams();

    const channelIdsArray = useSelector(state => state.entities.servers[serverId]?.channels)
    
    const allChannels = useSelector(state => state.entities.channels)

    const dispatch = useDispatch();

    const openSettingsModal = (e) => {
        // e.preventDefault();


        // debugger
        // e.preventDefault();

        if (e.target.id === "ChannelSetting"){
            dispatch(activateModalAC(e.target.id))

        } 
    }

    const openNewChannelModal = (e) => {
        e.preventDefault();


        dispatch(activateModalAC(e.currentTarget.id))

    }


    const channelLiElements = channelIdsArray?.map((channelId) => {

        return(
            <li>
                
                <Link to={`/home/server/${serverId}/channel/${channelId}`} onClick={openSettingsModal}>
                    <p>
                        # {`${allChannels[channelId]?.name}`} 
                    </p> 
                    
                    <button>create invite</button>

                    <button id="ChannelSetting">settings</button>
                    
                </Link>


            </li>
        )
        
    })

    return (
        <ul>
            <ChannelSettingsModal currentServerId={serverId}/>
            <div>
                <div>TEXT CHANNELS</div>
                <button id="NewChannel" onClick={openNewChannelModal}>+</button>
            </div>

            {channelLiElements}

            <NewChannelModal />
        </ul>
    )
}