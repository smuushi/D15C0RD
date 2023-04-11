import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchAllMessages, receiveMessageInfo } from "../../../reducers/MessagesReducer"
import consumer from "../../../consumer"
import { updateMessageList } from "../../../reducers/ChannelReducer"


export const MessageLog = () => {

    const allMessages = useSelector(state => state.entities.messages)

    const currentChannelId = useParams().channelId

    const messageIdsToRender = useSelector(state => state.entities.channels[currentChannelId]?.messages)

    // debugger

    const dispatch = useDispatch()

    const updateMessageLog = (broadcast) => {
        // debugger
        let newMessageInfo = broadcast.message;
        newMessageInfo.picture = broadcast.picture;
        dispatch(receiveMessageInfo(newMessageInfo))


        const newMessageIdsToRender = broadcast.message_list;
        const channelUpdate = ({
            channelId: currentChannelId, 
            messageList: newMessageIdsToRender
        })


        dispatch(updateMessageList(channelUpdate))



    }


    useEffect(() => {


        dispatch(fetchAllMessages())


        // let's refetch ALL the messages whenever our message Ids to render changes... ?.... or maybe just fetch some specific messages?.. 
        // idk man.. I'll probably try both solutions..
        // oh let's also remember to submit messages in formdata so we can play with images. 



    }, [dispatch, currentChannelId])

    useEffect(() => {


            const webSocket = consumer.subscriptions.create({
                channel: "ChannelChannel", 
                channel_id: currentChannelId 
            },
            {
                received: updateMessageLog
            })
            // debugger

        


        return () => webSocket?.unsubscribe()

    },[currentChannelId])

    console.log(messageIdsToRender)

    let messageLiElements = messageIdsToRender?.map((messageId) => {
        
        const message = allMessages[messageId];

        const messageContent = allMessages[messageId]?.content;
        
        return (
            <li> 
                

                <div className="messagecontents">
                    <p>{messageContent? messageContent : "_"}</p>
                    {message?.picture? <img style={{maxWidth: "400px", maxHeight: "400px"}} src={message?.picture}/> : <></> }
                </div>

            </li>
        )
    })

    return (
        <ol>
            {messageLiElements}
        </ol>
    )
}