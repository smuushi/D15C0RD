import { useParams } from "react-router-dom"
import { MessageForm } from "../MessageForm"
import { DetailNav } from "./DetailNav"
import { MessageLog } from "./MessageLog"
import { ParticipantsList } from "./ParticipantsList"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "./servershow.css"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchAllChannels } from "../../../reducers/ChannelReducer"

export const ServerShow = (props) => {


    console.log(props)


    const targetServer = props.server

    const actualServerObject = useSelector(state => state.entities.servers[targetServer] )


    const targetContext = props.channel? props.channel : null

    // debugger
    const dispatch = useDispatch()


    let location = useParams();

    let {channelId} = useParams()

    useEffect(() => {

        dispatch(fetchAllChannels())




    },[dispatch, targetServer])



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

                    <>
                    <div className="ChatLog">
                        <MessageLog />
                    </div>

                    <div className="ChatForm">
                        <MessageForm channelId = {channelId}/>
                    </div>
                    </>
                  

                </section>


                <div className="ParticipantsList" >
                    <ParticipantsList server={targetServer}/>
                </div>


            </div>


        </>

    )
}