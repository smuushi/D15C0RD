import { useDispatch, useSelector } from "react-redux";
import { resetModalAC } from "../../../reducers/ModalReducer";
import { useState } from "react";
import { destroyServer } from "../../../reducers/ServerReducer";
import "./serversettings.css"
import { destroyChannel } from "../../../reducers/ChannelReducer";

export const DeletionModal = (props) => {

    const {isDeleting} = props;

    const {setDeleting} = props;

    const {currentServer} = props;

    const { currentChannelId } = props; // this is only passed in if accessed from a channel related button.. 
                                        // so if this is a truthy val, we will render the channel deletion jsx..
    const currentChannelName = useSelector(state => state.entities.channels[currentChannelId]?.name)

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

        if (!!currentChannelId) {
            // debugger
            //DESTROY CHANNEL THUNK GOES HERE. 
            // its important to not reach the rest of the code below this lmao
            dispatch(destroyChannel(currentChannelId)).then(() => {
                dispatch(resetModalAC());
                console.log("deleting channelll.. dispatches already sent.");
                
            })
            return
        }


        e.preventDefault();
        if (confirmation !== currentServer.name) {
            console.log("not matching...")
            return
            
        }
        setDeleting(false)

        dispatch(destroyServer(currentServer.id))

        console.log("DELETING...")
        dispatch(resetModalAC())

    }

    if (isDeleting) {

        if (currentChannelId) {
            // see line 15 for more info
            return (
                    <div className="backdrop">


                    <div className="DeletionWrapper">
                        <header> 
                            <h3>
                                Delete Channel
                            </h3>
                            <h5>{`Are you sure you want to delete #${currentChannelName}?? This cannot be undone`}</h5>
                        </header>

                        <form className="DeletionForm" onSubmit={submitHandler}>

                            <button type="submit">DELETE FOREVER</button>

                        </form>

                        <button id="turnback" onClick={resetModals}>Cancel</button>
                    </div>

                    <img id="warning" src="/assets/misc/warning.png" />

                    </div>

            )
        }

        return (
            <div className="backdrop">


                <div className="DeletionWrapper">
                    <header> 
                        <h3>
                            Confirm deletion for "{currentServer.name}"
                        </h3>
                        <div id="deletionwarning">

                            <h5>Are you sure you want to delete {currentServer.name}? This action cannot be undone.</h5>
                        </div>

                    </header>

                    <form className="DeletionForm" onSubmit={submitHandler}>
                        <label htmlFor="confirmationtext">ENTER SERVER NAME</label>
                        <input id="confirmationtext" type="text" placeholder="server name" onChange={changeHandler} value={confirmation}/>

                    <div id="buttonss">

                        <button id="turnback" onClick={resetModals}>Cancel</button>
                        <button id="submitterr" type="submit">Delete Server</button>
        
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