
import { useParams } from "react-router-dom"
import { MessageForm } from "../MessageForm"
import { DetailNav } from "./DetailNav"
import { MessageLog } from "./MessageLog"
import { ParticipantsList } from "./ParticipantsList"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "./servershow.css"

export const ServerShow = (props) => {


    console.log(props)


    const targetServer = props.server

    const actualServerObject = useSelector(state => state.entities.servers[targetServer] )


    const targetContext = props.channel? props.channel : null

    // debugger



    let location = useParams();



    // if (location.serverId && !actualServerObject) {
    //     debugger
    //     setTimeout(() => {
    //         return <Navigate to="/home" />
    //     },200)
    // }

    return (
        
        <>
            <DetailNav serverId={targetServer} targetContext={targetContext}/>


            <div className="ChatWrapper">
                <section className="ChatterBox">
                    chatting

                    <MessageLog />

                    <MessageForm />

                </section>


                <div className="ParticipantsList" >
                    <ParticipantsList server={targetServer}/>
                </div>


            </div>


        </>

    )
}