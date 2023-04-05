import { useDispatch, useSelector } from "react-redux"
import { activateModalAC, resetModalAC } from "../../reducers/ModalReducer"
import { SubSettingsModal } from "./SubSettingsModal"
import { ServerSettingsModal } from "./servers/ServerSettingsModal"


export const SubNav = (props) => {

    const whatWeAreRenderingThisFineEvening = props.server? "serverNav" : null

    const renderTarget = useSelector(state => whatWeAreRenderingThisFineEvening === "serverNav"? state.entities.servers[props.server] : null)
    // messy logic up here to grab the server info for the specified target 
    // ONLY IF a serverID was passed as a prop to the component.
    // otherwise return null for the state selector for now....

    // console.log(renderTarget)

    console.log(whatWeAreRenderingThisFineEvening) // lmao

    const dispatch = useDispatch();

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
                <header id="serverHeader" onClick={openModal}>
                    <h5>
                        {renderTarget?.name}
                        <div>

                            <i className="fa-solid fa-chevron-down" style={{color: "#969696"}}></i>
                        </div>
                    </h5>

                </header>

                    <SubSettingsModal modalCloser={modalCloser}/>
                    <ServerSettingsModal currentServer={renderTarget} />
                SOME SERVER SUBNAVVING HERE

            </nav>
        )
    } else { // the subnav will show convos or server stuff... so atm, it's just else, but maybe i can put a specific key later. 
        return (
            <nav>
                SOME CONVO SUBNAVVING HERE
            </nav>
        )
    }

}
