import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resetModalAC } from "../../../reducers/ModalReducer"
import { DeletionModal } from "./DeletionModal"
import { useState } from "react"
import { useEffect } from "react"


export const ServerSettingsModal = (props) => {

    const { currentServer } = props;
// debugger
    const modalId = "ServerSetting"

    const currentUser = useSelector(state => state.entities.session.user)

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const [deleting, setDeleting] = useState(false)

    const dispatch = useDispatch()



    const resetModal = (e) => {
        console.log("trying to close settings modal..")
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
                    <h3>SERVER SETTINGS</h3>
                    <ul className="SettingsList">
                        {currentServer.ownerId === currentUser.id?
                            <li className="notSelected">

                                <div className="overview">
                                    Overview
                                </div>

                            </li>
                            :
                            <></>
                        }

                        {currentServer.ownerId === currentUser.id?
                            <li className="notSelected">
                                <div className="DELETE" onClick={openDeletionConfirmation}>
                                    delete server
                                </div>
                                <div>
                                    ICON
                                </div>
                            </li>
                            :
                            <></>
                        }
                    </ul>
                </div>

                <div className="SettingsShowSection">
                    SOME RANDOM SHOWPAGE FOR A SETTINGS GOES HERE!
                </div>

                <button onClick={resetModal} > ESC </button>

                        <DeletionModal setDeleting={setDeleting} isDeleting={deleting} currentServer={currentServer} />
            </div>
        )
    }


}