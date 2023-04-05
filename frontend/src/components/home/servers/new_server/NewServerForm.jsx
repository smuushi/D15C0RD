import { useState } from "react"
import { Creation } from "./subforms/Creation";
import { Setting } from "./subforms/Setting";
import { Name } from "./subforms/Name";
import "./newserver.css"
import { useDispatch, useSelector } from "react-redux";

import { createServer } from "../../../../reducers/ServerReducer";

export const NewServerForm = (props) => {

    const [creation, setCreation] = useState();

    const [setting, setSetting] = useState();

    const [name, setName] = useState();

    const currentUser = useSelector(state => state.entities.session.user)

    const closeModal = props.closeModal

    // debugger

    const dispatch = useDispatch();

    const submithandler = (e) => {
        e.preventDefault();
        console.log("submission attempt")

        console.log("submission attempt")

        console.log("submission attempt")

        console.log("submission attempt")

        const newServer = ({
            name: name, 
            ownerId: currentUser.id
        })

        if (name) {
            dispatch(createServer(newServer))
        } else {
            console.log('there was no name?....')
        }



        closeModal(e)
    }

    return (
        <>  
        <form id="newserverform" onSubmit={submithandler}>
            {!creation? <Creation setCreation={setCreation}/> : <h5>first subform is notrendering</h5> }
            {creation && !setting? <Setting setSetting={setSetting}/>: <h5>second subform is not rendering</h5>}
            {creation && setting? <Name name={name} setName={setName}/>: <h5>third subform is not rendering</h5>}
        </form>
        </>
      
    )
}