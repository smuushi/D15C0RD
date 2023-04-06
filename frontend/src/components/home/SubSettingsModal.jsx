import { useDispatch, useSelector } from "react-redux";
import { activateModalAC } from "../../reducers/ModalReducer";
import "./subnav.css"

export const SubSettingsModal = (props) => {

    const modalCloserCallback = props.modalCloser;

    const modalId = "serverHeader";

    const isActive = !!(modalId === useSelector(state => state.activeModal));

    const dispatch = useDispatch();

    const openSettingsModal = (e) => {
        dispatch(activateModalAC(e.currentTarget.id))
    }

    if (isActive) {
        return (

            <div className="transparentbackdrop" 
                    onClick={modalCloserCallback}>
                        <div className="SubSettingsModalWrapper">
            
                            <ul>
                                <li id="ServerSetting" onClick={openSettingsModal}>
                                    <div>
                                        Server Settings
                                    </div>
                                <i className="fa-solid fa-gear" style={{color: "#9e9e9e"}}></i>
                                </li>
                                <li>Create Channel</li>
                            </ul>

            
            
                        </div>
    
    
            </div>
        )
        
    }

}