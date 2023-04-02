import { modalOpener } from "../reducers/ModalReducer"
import { useDispatch } from "react-redux"
import { activateModalAC } from "../reducers/ModalReducer"


export const UserStatusBar = (props) => {

    const dispatch = useDispatch()

    const modalOpen = (e) => {

        const modalId = e.target.id
        // console.log(modalId)
        dispatch(activateModalAC(modalId))

    }

    return(
        <div className="UserStatusBar" style={{margin: "10px"}}>
            <div className="UserInfo" onClick={() => {console.log("i'll open the userinfo modal with this click lmaooo")}}>
                <div className="UserImage" style={{maxWidth: "30px"}} >
                    <img src="/assets/avatars/DefaultAvatar.png" style={{maxWidth: "30px"}} />
                </div>
            </div>
            
            <button className="MuteButton">
                mute
            </button>

            <button className="DeafenButton">
                deafen
            </button>

            <button id="UserSettings" className="SettingsButton" onClick={modalOpen}>
                Settings
            </button>

        </div>
    )

}