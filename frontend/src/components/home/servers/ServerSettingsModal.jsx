import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resetModalAC } from "../../../reducers/ModalReducer"
import { DeletionModal } from "./DeletionModal"
import { useState } from "react"
import { useEffect } from "react"
import "./serversettings.css"
import { OverviewSettingShow } from "./OverviewSettingShow"
import { InviteSettingShow } from "../invites/InviteSettingShow"


export const ServerSettingsModal = (props) => {

    const { currentServer } = props;
// debugger
    const modalId = "ServerSetting";

    const currentUser = useSelector(state => state.entities.session.user);

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const [selection, setSelection] = useState(currentUser?.id === currentServer?.ownerId ? "ServerOverview" : "");

    const [deleting, setDeleting] = useState(false);

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

    useEffect(() => {

        setSelection(() => (currentUser?.id === currentServer?.ownerId ? "ServerOverview" : ""))
    },[isActive])


    const resetModal = (e) => {
        console.log("trying to close settings modal..")
        setSelection(null)
        dispatch(resetModalAC())
        setDeleting(false)

    }

    const openDeletionConfirmation = (e) => {
        setDeleting(true)
    }

    if (isActive) {
        return(
            <div className="ServerSettingsModalWrapper" >

                {/* SERVER SETTINGS MODAL HERE HAHAH */}

                <div className="ServerSettingsSubNav">
                    <h3>{currentServer?.name} Settings</h3>
                    <ul className="SettingsList">
                        {currentServer?.ownerId === currentUser.id?
                            <li id="ServerOverview" className={selection === "ServerOverview"? "selected" : "notSelected"} onClick={selectionHandler}>

                                <div className="overview">
                                    Overview
                                </div>

                            </li>
                            :
                            <></>
                        }


                        {currentServer?.ownerId === currentUser.id?
                            <li id="InviteManagement" className={selection === "InviteManagement"? "selected" : "notSelected"} onClick={selectionHandler}>

                                <div className="overview">
                                    Invite Management
                                </div>

                            </li>
                            :
                            <></>
                        }




                        {currentServer?.ownerId === currentUser.id?
                            <li className="notSelected" onClick={openDeletionConfirmation}>
                                <div className="DELETE">
                                    Delete Server
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
                    {currentServer?.ownerId !== currentUser.id? <h5 className="OwnerWarning">You must be the server owner to change settings!</h5> : <></>}
                    <OverviewSettingShow currentServer={currentServer} selection={selection}/>

                    <OverviewSettingShow currentServer={currentServer} selection={selection}/>
                    <InviteSettingShow currentServer={currentServer} selection={selection}/>

                </div>

                <button id="escaper" className="escaper" onClick={resetModal} > 
                <i className="fa-regular fa-circle-xmark"></i>
                </button>

                        <DeletionModal setDeleting={setDeleting} isDeleting={deleting} currentServer={currentServer} />
            </div>
        )
    }


}