import { useDispatch, useSelector } from "react-redux"
import { activateModalAC, resetModalAC } from "../../reducers/ModalReducer"
import { SubSettingsModal } from "./SubSettingsModal"
import { ServerSettingsModal } from "./servers/ServerSettingsModal"
import { ChannelsList } from "./channels/ChannelsList"
import { render } from "react-dom"
import { LeaveServerModal } from "./servers/leave_server/LeaveServerModal"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchAllChannels } from "../../reducers/ChannelReducer"
import { UserShowModal } from "../user_settings/UserShowModal"


export const SubNav = (props) => {

    const whatWeAreRenderingThisFineEvening = props.server? "serverNav" : null

    const renderTarget = useSelector(state => whatWeAreRenderingThisFineEvening === "serverNav"? state.entities.servers[props.server] : null)
    // messy logic up here to grab the server info for the specified target 
    // ONLY IF a serverID was passed as a prop to the component.
    // otherwise return null for the state selector for now....

    const ownerId = renderTarget?.ownerId

    const currentUserId = useSelector(state => state.entities.session.user.id)

    // // console.log(renderTarget)



    const isOwner = ownerId === currentUserId? true : false

    // // console.log(whatWeAreRenderingThisFineEvening) // lmao



    const dispatch = useDispatch();

    const {serverId} = useParams()

    useEffect(() => {

        dispatch(fetchAllChannels())

    },[dispatch, serverId])


    const modalCloser = (e) => {
        // debugger
        if (e.target.className === "transparentbackdrop"){
            dispatch(resetModalAC())

        }
    }

    const openModal = (e) => {
        // debugger
        e.preventDefault();
        dispatch(activateModalAC(e.currentTarget.id))
    }

    if (whatWeAreRenderingThisFineEvening === "serverNav") {
        return (

        
            <nav className="subNav">
                  <UserShowModal/> 
                <header id="serverHeader" onClick={openModal}>
                    <h5>
                        {renderTarget?.name}
                        <div>

                            <i className="fa-solid fa-chevron-down" style={{color: "#969696"}}></i>
                        </div>
                    </h5>

                </header>

                    <SubSettingsModal isOwner={isOwner} modalCloser={modalCloser}/>
                    <ServerSettingsModal currentServer={renderTarget} />


                <section>

                    <ChannelsList ownerId={ownerId}/>

                </section>

            </nav>


        )
    } else { // the subnav will show convos or server stuff... so atm, it's just else, but maybe i can put a specific key later. 
        return (
            <nav>
                  <UserShowModal/> 
                <header id="serverHeader" onClick={openModal}>
                    <h5>

                        direct messaging features here



                    </h5>

                </header>




                <section style={{height: "100vh", fontFamily: "sans-serif", color:"whitesmoke"}}>
                    <img style={{maxWidth:"237px", borderRadius:"3px"}} src="/assets/misc/workinginprogress.png" alt="" />

                    welp... 
                    gonna need more time to work on this.. sorry :(

                </section>




            </nav>
        )
    }

}
