import { useSelector } from "react-redux"
import { NewServerForm } from "./NewServerForm";

export const NewServerModal = (props) => {
    
    const modalCloserCallback = props.modalcloser;

    const modalId = "newserverform";

    const isActive = !!(modalId === useSelector(state => state.activeModal));


    if (isActive) {
        return (
    
    
            <div className="backdrop" 
            style={{position:"absolute",
             border:"solid",
              top:"0px",
               width:"100vw",
                height:"100vh",
                zIndex:"11"}}
                onClick={modalCloserCallback}>
                <div className="newservermodalwrapper">
    
    
                    <NewServerForm closeModal={modalCloserCallback}/>
    
    
                </div>
    
    
            </div>
        )

    } else {
        return (
            <></>
        )
    }


}   