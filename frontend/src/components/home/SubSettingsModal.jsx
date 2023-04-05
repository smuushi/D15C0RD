import { useSelector } from "react-redux";
import "./subnav.css"

export const SubSettingsModal = (props) => {

    const modalCloserCallback = props.modalCloser;

    const modalId = "serverHeader";

    const isActive = !!(modalId === useSelector(state => state.activeModal));



    if (isActive) {
        return (

            <div className="transparentbackdrop" 
                    onClick={modalCloserCallback}>
                        <div className="SubSettingsModalWrapper">
            
                            <ul>
                                <li>Server Settings</li>
                                <li>Create Channel</li>
                            </ul>

            
            
                        </div>
    
    
            </div>
        )
        
    }

}