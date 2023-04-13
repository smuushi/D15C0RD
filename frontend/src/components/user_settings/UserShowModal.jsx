import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { activateModalAC, resetModalAC } from "../../reducers/ModalReducer"

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
                    <div className="newchannelmodalwrapper">
        

                        <header className="HeaderImage">
                            {showingUser?.avatar ? <img src={showingUser?.avatar} style={{maxWidth: "100px"}}/> : <img src="/assets/avatars/DefaultAvatar.png" />}\

                            {currentId === currentUserId ? 
                                <button onClick={openUserSettingsModal}>edit profile</button>
                                :
                                <></>
                            }
                        </header>

                        <section className="UserInfoSection">
                            <header>
                                <div className="Username">
                                    {showingUser?.username}
                                </div>
                                <div className="Tag">
                                    #{showingUser?.tag}
                                </div>
                            </header>
                            
                            <h5>About</h5>
                            <p>{showingUser?.about ? showingUser?.about : "I am sure they are a very very nice person!"}</p>


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