
import { MessageForm } from "../MessageForm"
import { DetailNav } from "./DetailNav"
import { MessageLog } from "./MessageLog"
import { ParticipantsList } from "./ParticipantsList"

export const ServerShow = (props) => {


    // console.log(props)

    const targetServer = props.server

    const targetContext = props.channel? props.channel : null



    return (
        
        <>
            <DetailNav serverId={targetServer} targetContext={targetContext}/>


            <div className="ChatWrapper" style={{border: "solid"}}>
                <section className="ChatterBox">
                    chatting

                    <MessageLog />

                    <MessageForm />

                </section>


                <div className="ParticipantsList" style={{margin: "5px", border: "dotted"}}>
                    <ParticipantsList />
                </div>


            </div>


        </>

    )
}