import { useEffect } from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../../store_utils/csrf";
import "./invitesettingshow.css"

export const InviteSettingShow = (props) => {

    const {currentServer} = props;

    let showId = "InviteManagement"

    const isActive = (props.selection === showId)

    const [invites, setInvites] = useState(null)

    const dispatch = useDispatch();

    const navigate = useNavigate()





    useEffect(() => {

        const fetchInvites = async () => {
            const res = await csrfFetch(`/api/get_invites/server/${currentServer.id}`)

            if (res.ok) {
                let data = await res.json();
                // debugger
                setInvites(() => {
                    return data
                })
            } else {
                setInvites(() => {
                    return [`died`]
                })
            }
        }
        fetchInvites();


    },[currentServer])
    

    

    const submitHandler = (e) => {
        e.preventDefault();


    }
    
    const deleteHandler = async (e) => {
        e.preventDefault();

        const deleteRequest = await csrfFetch(`/api/destroy_invite/${e.currentTarget.id}`,{
            method: 'DELETE'
        })
        
        if (deleteRequest.ok) {

            // debugger
            let remainingInvites = await deleteRequest.json()
            setInvites(() => {
                return remainingInvites
            })


        }


    }

    let inviteLiElements;

    if (invites) {
        inviteLiElements = invites.map((inviteObj) => {
            return (
                <li>
                    <div>
                        {`${inviteObj?.invite_code}`}
                    </div>
                    <button onClick={deleteHandler} id={inviteObj?.invite_code} className="deleteInvite">
                        X
                    </button>
                </li>
            )
        })
    }
    



    
    if (isActive) return (
        <div className="ShowDiv">

                <header>
                    <h3>Invite Management for "{currentServer?.name}"</h3>
                </header>

                
                <ul className="invites">
                    {invites? inviteLiElements : <></>}
                </ul>


            

        </div>
    ) 
}