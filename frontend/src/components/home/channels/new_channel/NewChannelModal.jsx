import { useDispatch, useSelector } from "react-redux"
import { resetModalAC } from "../../../../reducers/ModalReducer";
import { NewChannelForm } from "./NewChannelForm";

export const NewChannelModal = (props) => {
    


    const modalId = "NewChannel";

    const isActive = !!(modalId === useSelector(state => state.activeModal));

    const dispatch = useDispatch();

    const closeModals = (e) => {
        if (e.target.className === "backdrop" ){
            dispatch(resetModalAC())
        }
    }

    if (isActive) {
        return (
    
    
            <div className="backdrop" 
            style={{position:"absolute",
             border: "none",
              top:"-3px",
              left:"-75px",
               width:"100vw",
                height:"100vh",
                zIndex:"11"}}
                onClick={closeModals}>
                <div className="newservermodalwrapper">
    
    
                    <NewChannelForm />
    
                </div>


    
            </div>
        )

    } else {
        return (
            <></>
        )
    }


}  