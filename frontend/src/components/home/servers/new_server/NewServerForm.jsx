import { useState } from "react"
import { Creation } from "./subforms/Creation";
import { Setting } from "./subforms/Setting";
import { Name } from "./subforms/Name";
import { Newsub } from "./subforms/Newsub";
import "./newserver.css"
import { useDispatch, useSelector } from "react-redux";

import { createServer } from "../../../../reducers/ServerReducer";
import { joinServer } from "../../../../reducers/ServerReducer";
import { useNavigate } from "react-router-dom";
import { resetModalAC } from "../../../../reducers/ModalReducer";


export const NewServerForm = (props) => {

    const [creation, setCreation] = useState();

    const [setting, setSetting] = useState();

    const [name, setName] = useState();

    const [icon, setIcon] = useState(null);

    const [newsub, setNewsub] = useState();

    const [invite, setInvite] = useState();

    

    const currentUser = useSelector(state => state.entities.session.user)

    const closeModal = props.closeModal

    // debugger

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const submithandler = (e) => {
        e.preventDefault();
    
        if (invite) {
            const subrequest = ({
                subscriberId: currentUser.id,
                invite: invite
            })
            
            dispatch(joinServer(subrequest)).then((data) => {
                // debugger
                navigate(`/home/server/${data.id}`)
                dispatch(resetModalAC())
            }).catch(() => {
                // debugger
                return
            })
            //DISPATCH MY THUNK HERE BABYYY
        }


        if (name) {

            // console.log("submission attempt")
            // console.log("submission attempt")
            // console.log("submission attempt")
            // console.log("submission attempt")



            

            const newServer = ({
                name: name, 
                ownerId: currentUser.id,
                icon: icon
            })

            if (name) {
                dispatch(createServer(newServer)).then((res) => {
                    navigate(`/home/server/${res.id}`)
                })
            } else {
                // console.log('there was no name?....')
            }



            closeModal(e)
        }

    }

    return (
        <>  
        <form id="newserverform" onSubmit={submithandler}>
            {newsub? <Newsub setInvite={setInvite} invite={invite} /> : <></>}
            {(!creation && !newsub)? <Creation setNewsub={setNewsub} setCreation={setCreation}/> : <></> }
            {creation && !setting? <Setting setSetting={setSetting}/>: <></>}
            {creation && setting? <Name icon={icon} setIcon={setIcon} name={name} setName={setName}/>: <></>}
        </form>
        </>
      
    )
}