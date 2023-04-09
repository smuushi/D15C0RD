import { useDispatch, useSelector } from "react-redux";
import { resetModalAC } from "../../../../reducers/ModalReducer";
import { useNavigate, useParams } from "react-router-dom";
import { leaveServer } from "../../../../reducers/ServerReducer";
import "./leaveservermodal.css"

export const LeaveServerModal = (props) => {

    const modalId = "leaveserver";

    const isActive = !!(modalId === useSelector(state => state.activeModal));

    const dispatch = useDispatch();

    const currentServerId = useParams().serverId
    const currentUserId = useSelector(state => state.entities.session.user.id)

    const currentServer = useSelector(state => state.entities.servers[currentServerId])

    const navigate = useNavigate();

    const closeModals = (e) => {
        e.preventDefault();
        // debugger
        if (e.target.className === "backdrop"){
            dispatch(resetModalAC())
        }
    }

    const submitHandler = (e) => {
        // debugger
        e.preventDefault();

        const deletionRequest = ({
            userId: currentUserId, 
            serverId: currentServerId
        })

        // debugger

        dispatch(leaveServer(deletionRequest)).then(() => {
            dispatch(resetModalAC())
            navigate("/home")
        })

        // dispatch thunk leaveServer here
    }

    const resetModals = (e) => {
        // debugger
        e.preventDefault();
        dispatch(resetModalAC());
    }

    if (isActive) {
        return (
            <div className="backdrop" onClick={closeModals} style={{zIndex:"40"}}>
                


                <div id="leaveserverwrapper" className="DeletionWrapper">
                            <header> 
                                <h3>
                                    {`Leave '${currentServer?.name}'`}
                                </h3>
                                <h5>{`Are you sure you want to leave ${currentServer?.name}? You wont be able to rejoin this server unless you are re-invited.`}</h5>
                            </header>

                            <form className="DeletionForm">

                                <div id="buttonss">
                                    <button type="button" id="turnback" onClick={resetModals}>Cancel</button>
                                    <button id="submitterr" type="button" onClick={submitHandler}>Leave Server</button>
                                </div>

                            </form>

                 </div>

                 <img id="warning" src="/assets/misc/warning.png" />

            </div>
        )

    } else {

        return (
            <></>
        )
    }

}