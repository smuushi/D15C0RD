import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resetModalAC } from "../../reducers/ModalReducer"
import { sessionLogout } from "../../reducers/SessionReducer"
import { useState } from "react"
import "./usersettings.css"
import { SettingsShow } from "./SettingsShow"

export const UserSettingsModal = (props) => {
    const modalId = "UserSettings"

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const [selectedSetting, setSelectedSetting] = useState("MyAccount")

    const [selection, setSelection] = useState(null)

    const dispatch = useDispatch()

    const logOutHandler = (e) => {

        // debugger

        // console.log("trying to logout")
        dispatch(sessionLogout())
        dispatch(resetModalAC())

    }

    const resetModal = (e) => {

        // console.log("trying to close settings modal..")
        dispatch(resetModalAC())
    }

    const selectionHandler = (e) => {
        e.preventDefault();

        let sel = e.currentTarget.id;

        setSelectedSetting(() => sel)

    }

    if (isActive) {
        return(
            <div className="UserModalWrapper" >

                {/* SETTINGS MODAL HERE HAHAH */}

                <div className="UserSettingsSubNav">
                    <h3>USER SETTINGS</h3>
                    <ul className="SettingsList">
                        <li className="selected" id="MyAccount" onClick={selectionHandler}>
                            <div className="logg">
                                <div>
                                    Account Settings
                                </div>
                            </div>
                        
                        </li>
                        <li className="notSelected" onClick={logOutHandler}>
                            <div className="logg">
                                <div>
                                {`Log Out`}
                                </div>

                            </div>
                            <div>

                                <i id="logouticon" className="fa-solid fa-arrow-right-from-bracket" style={{color: "#dcdbdb"}}></i>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="SettingsShowSection">

                    <SettingsShow selection={selectedSetting} />
                </div>

                <button id="escaper" className="escaper" onClick={resetModal} > 
                <i className="fa-regular fa-circle-xmark"></i>
                </button>

            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}