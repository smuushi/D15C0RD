import { modalOpener } from "../reducers/ModalReducer"
import { useDispatch, useSelector } from "react-redux"
import { activateModalAC } from "../reducers/ModalReducer"
import "./userstatus.css"


export const UserStatusBar = (props) => {

    const dispatch = useDispatch()

    const currentUserId = useSelector(state => state.entities.session.user?.id)

    const currentUser = useSelector(state => state.entities.users[currentUserId])

    const modalOpen = (e) => {

        const modalId = e.currentTarget.id
        // // console.log(modalId)
        // debugger
        dispatch(activateModalAC(modalId))

    }

    const openUserShow = (e) => {
        e.preventDefault();

        

        dispatch(activateModalAC(currentUserId))
    }

    return(
        <div className="UserStatusBar" >
            <div className="UserInfo" onClick={openUserShow}>
                <div className="UserImage" >
                    <img src={currentUser?.avatar? currentUser?.avatar : "/assets/avatars/DefaultAvatar.png"} />
                </div>
                <section className="infosection">
                    <div className="UserName">
                        {currentUser?.username}
                    
                    </div> 
                    <div className="Tag">
                        {`#${currentUser?.tag}`}
                    </div>
                </section>

            </div>
            
            <button className="MuteButton">
            <i className="fa-solid fa-microphone-slash" style={{color: "#9e9e9e"}}></i>
            </button>

            <button className="DeafenButton">
            <i className="fa-solid fa-headphones" style={{color: "#9e9e9e"}}></i>
            </button>

            <button id="UserSettings" className="SettingsButton" onClick={modalOpen}>
            <i className="fa-solid fa-gear" style={{color: "#9e9e9e"}}></i>
            </button>

        </div>
    )

}