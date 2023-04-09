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

    // const [code, setCode] = useState();

    useEffect(() => {

        dispatch(fetchNewInvite(currentServerId))


    },[currentServerId])


    return (

        <form className="inviteform">

            <header>
                <h3>Invite friends to {currentServer?.name}</h3>

                <h5>Send them the invite code below for them to use when adding a new server!</h5>
            </header>


            <section>
                {inviteCode? inviteCode : "creating invite code right now!! please wait.. "}
            </section>


        </form>
    )


}