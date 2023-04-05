import { useDispatch } from "react-redux";
import { resetModalAC } from "../../../reducers/ModalReducer";
import { useState } from "react";
import { destroyServer } from "../../../reducers/ServerReducer";

export const DeletionModal = (props) => {

    const {isDeleting} = props;

    const {setDeleting} = props;

    const {currentServer} = props;

    const dispatch = useDispatch();

    const [confirmation, setConfirmation] = useState("")

    const resetModals = (e) => {
        setDeleting(false)
        dispatch(resetModalAC())
    }
    
    const changeHandler = (e) => {
        setConfirmation(() => e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (confirmation !== currentServer.name) {
            console.log("not matching...")
            return
            
        }

        dispatch(destroyServer(currentServer.id))

        console.log("DELETING...")
        dispatch(resetModalAC())

    }

    if (isDeleting) {
        return (
            <div className="DeletionWrapper">
                <header> 
                    <h3>
                        Confirm deletion for {currentServer.name}.
                    </h3>
                    <h5>write server name to confirm and then press delete..</h5>

                </header>

                <form className="DeletionForm" onSubmit={submitHandler}>
                    <label htmlFor="confirmationtext">Write Server Name Here</label>
                    <input id="confirmationtext" type="text" placeholder="server name" onChange={changeHandler} value={confirmation}/>


                    <button type="submit">DELETE FOREVER</button>
    
                </form>

                <button onClick={resetModals}>Turn Back</button>
            </div>
        )

    } else {
        return (
            <></>
        )
    }

}