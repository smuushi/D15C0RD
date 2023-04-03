import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { resetModalAC } from "../../reducers/ModalReducer"
import { sessionLogout } from "../../reducers/SessionReducer"
import "./usersettings.css"

export const UserSettingsModal = (props) => {
    const modalId = "UserSettings"

    const isActive = !!(modalId === useSelector(state => state.activeModal))

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
            <div className="UserModalWrapper" style={{border: "dotted"}}>

                SETTINGS MODAL HERE HAHAH

                
                <div onClick={logOutHandler} style={{border:"solid"}}>
                    Log Out
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