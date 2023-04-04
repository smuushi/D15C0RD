import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resetModalAC } from "../../reducers/ModalReducer"
import { sessionLogout } from "../../reducers/SessionReducer"
import { useState } from "react"
import "./usersettings.css"

export const UserSettingsModal = (props) => {
    const modalId = "UserSettings"

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const [selectedSetting, setSelectedSetting] = useState("MyAccount")

    const dispatch = useDispatch()

    const logOutHandler = (e) => {

        // debugger

        console.log("trying to logout")
        dispatch(sessionLogout())
    }

    const resetModal = (e) => {

        console.log("trying to close settings modal..")
        dispatch(resetModalAC())
    }

    if (isActive) {
        return(
            <div className="UserModalWrapper" >

                {/* SETTINGS MODAL HERE HAHAH */}

                <div className="UserSettingsSubNav">
                    <h3>USER SETTINGS</h3>
                    <ul className="SettingsList">
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
                    SOME RANDOM SHOWPAGE FOR A SETTINGS GOES HERE!
                </div>

                <button onClick={resetModal} > ESC </button>

            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}