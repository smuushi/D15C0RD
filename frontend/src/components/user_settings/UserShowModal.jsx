import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { activateModalAC, resetModalAC } from "../../reducers/ModalReducer"
import "./usershowmodal.css"

export const UserShowModal = (props) => {

    const currentId = useSelector(state => state.activeModal)

    const currentUserId = useSelector(state => state.entities.session.user?.id)

    const allUsers = useSelector(state => state.entities.users)

    const showingUser = allUsers[currentId]

    const isActive = (typeof currentId === "number")

    const dispatch = useDispatch();


    const closeModals = (e) => {
        if (e.target.className === "backdrop" ){
            dispatch(resetModalAC())
        }
    }

    const openUserSettingsModal = (e) => {
        e.preventDefault();
        dispatch(activateModalAC("UserSettings"))
    }


    if (isActive) {

            return(
                
                <>
                <div className="backdrop" 
                style={{position:"absolute",
                border: "none",
                top:"-3px",
                left:"-75px",
                width:"100vw",
                height:"100vh",
                zIndex:"11"}}
                onClick={closeModals}>
                    <div id="usershowmodalwrapper" className="newchannelmodalwrapper">
        

                        <header id="usershowheader" className="HeaderImage">
                        <div id="paddington">
                            {showingUser?.avatar ? <img src={showingUser?.avatar}/> : <img src="/assets/avatars/DefaultAvatar.png" />}
                            </div>

                            {currentId === currentUserId ? 
                                <button onClick={openUserSettingsModal}>edit <i className="fa-solid fa-pen-to-square"></i></button>
                                :
                                <></>
                            }
                        </header>

                        <section className="UserInfoSection">
                            <div id="buffery">

                            <header>
                                <div className="Username">
                                    {showingUser?.username}
                                </div>
                                <div className="Tag">
                                    #{showingUser?.tag}
                                </div>
                            </header>
                            
                            <div id="papayainfo">
                            <h4>User Info</h4>
                            <h5>About Me</h5>
                            <p>{showingUser?.about ? showingUser?.about : "I am sure they are a very very nice person!"}</p>
                            </div>

                            </div>

                        </section>


        
                    </div>


                    <img id="encouragement" src="/assets/misc/encouragement.png"
                        style={{position:"absolute",
                        left:"0px",
                        top:"33vh",
                        maxWidth:"250px"
                    }}
                    
                    />
        
                    </div>
                </>
            )
    
    }
    
}