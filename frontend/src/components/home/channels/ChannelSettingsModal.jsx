import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletionModal } from "../servers/DeletionModal"
import { resetModalAC } from "../../../reducers/ModalReducer";
import { useParams } from "react-router-dom";

export const ChannelSettingsModal = (props) => {
    
    const serverId = props.currentServerId; // could've grabbed it 
                                            // from userParams below... ohwell.. lmao

    const currentServer = useSelector(state => state.entities.servers[serverId])
    
    const params = useParams();
    const currentChannelId = params.channelId
    const currentChannel = useSelector(state => state.entities.channels[currentChannelId])

    //--- Modal Identification ---//
        const modalId = "ChannelSetting";
        const isActive = !!(modalId === useSelector(state => state.activeModal))
    //----------------------------//


    const [selection, setSelection] = useState()

    const [deleting, setDeleting] = useState();

    const currentUser = useSelector(state => state.entities.session.user);


    const dispatch = useDispatch();

    const selectionHandler = async (e) => {
        e.preventDefault();
        console.log(selection)
        // debugger
        let theSelection = e.currentTarget.id;
        // e.currentTarget.
        setSelection(() => (theSelection))

        e.currentTarget.classList.add("selected")

        e.currentTarget.classList.remove("notSelected")

    }

    const openDeletionConfirmation = (e) => {
        setDeleting(true)
    }

    const resetModal = (e) => {
        console.log("trying to close settings modal..")
        setSelection(null)
        dispatch(resetModalAC())
        setDeleting(false)

    }


    if (isActive){

        return(
            <div className="ServerSettingsModalWrapper" >

                {/* SERVER SETTINGS MODAL HERE HAHAH */}

                <div className="ServerSettingsSubNav">
                    <h3>#{currentChannel?.name} -- TEXT CHANNEL</h3>
                    <ul className="SettingsList">
                        {currentServer.ownerId === currentUser.id?
                            <li id="ChannelOverview" className={selection === "ServerOverview"? "selected" : "notSelected"} onClick={selectionHandler}>

                                <div className="overview">
                                    Overview
                                </div>

                            </li>
                            :
                            <></>
                        }

                        {currentServer.ownerId === currentUser.id?
                            <li className="notSelected" onClick={openDeletionConfirmation}>
                                <div className="DELETE">
                                    Delete Channel
                                </div>
                                <div>
                                <i className="fa-solid fa-trash-can" style={{color: "#b5b5b5"}}></i>
                                </div>
                            </li>
                            :
                            <></>
                        }
                    </ul>
                </div>

                <div className="SettingsShowSection">

                    {/* <OverviewSettingShow currentServer={currentServer} selection={selection}/> */}
                    SOME RANDOM SHOWPAGE FOR A SETTINGS GOES HERE!


                </div>

                <button onClick={resetModal} > ESC </button>

                    <DeletionModal currentChannelId={currentChannelId} setDeleting={setDeleting} isDeleting={deleting} currentServer={currentServer} />
            </div>

        )
    }
}