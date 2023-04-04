import { useSelector } from "react-redux"


export const SubNav = (props) => {

    const whatWeAreRenderingThisFineEvening = props.server? "serverNav" : null

    const renderTarget = useSelector(state => whatWeAreRenderingThisFineEvening === "serverNav"? state.entities.servers[props.server] : null)
    // messy logic up here to grab the server info for the specified target 
    // ONLY IF a serverID was passed as a prop to the component.
    // otherwise return null for the state selector for now....

    // console.log(renderTarget)

    console.log(whatWeAreRenderingThisFineEvening) // lmao

    if (whatWeAreRenderingThisFineEvening === "serverNav") {
        return (
            <nav>
                <header>
                    <h5 style={{padding: "10px", border: "solid"}}>
                        {renderTarget?.name}
                    </h5>
                    SERVER SETTINGS MODAL WILL GO HERE.
                </header>

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
