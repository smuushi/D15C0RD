import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchNewInvite } from "../../../reducers/InviteReducer";
import "./inviteform.css"

export const InviteForm = (props) => {

    const currentServerId = useParams().serverId;

    const currentServer = useSelector(state => state.entities.servers[currentServerId])

    const inviteCode = useSelector(state => state.entities.invite)
    console.log(inviteCode)
    const dispatch = useDispatch();

    const [copying, setCopying] = useState(false)

    // const [code, setCode] = useState();

    useEffect(() => {

        dispatch(fetchNewInvite(currentServerId))


    },[currentServerId])

    const clippingHandler = (e) => {
        e.preventDefault();

        navigator.clipboard.writeText(inviteCode)
        setCopying(() => true)
        setTimeout(()=> {
            setCopying(() => false)
        }, 1200)

    }


    return (

        <form className="inviteform">

            <header>
                <h3>Invite friends to {currentServer?.name}</h3>

                <h5>Send them the invite code below for them to use when adding a new server!</h5>
            </header>

            <div className="asdf">



                <section>
                    {inviteCode? inviteCode : "creating invite code right now!! please wait.. "}
                </section>

                {   copying? 
                    <button id="copiedbutton" className="copied"> 
                        Copied
                    </button> 
                
                
                    :    
                    <button id="copybutton" className="copythis" onClick={clippingHandler}>
                        Copy
                    </button>
                }

            </div>


        </form>
    )


}