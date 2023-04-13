import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchAllMessages, receiveMessageInfo } from "../../../reducers/MessagesReducer"
import consumer from "../../../consumer"
import { destroyMessageAndUpdateChannelMessages, updateMessageList } from "../../../reducers/ChannelReducer"
import "./messagelog.css"
import { UpdateMessageModal } from "./messaging/UpdateMessageModal"


export const MessageLog = () => {

    const allMessages = useSelector(state => state.entities.messages)

    const currentChannelId = useParams().channelId

    const messageIdsToRender = useSelector(state => state.entities.channels[currentChannelId]?.messages)

    const allUsers = useSelector(state => state.entities.users)
    // debugger

    const currentUserId = useSelector(state => state.entities.session.user.id)
    // console.log(currentUserId)

    const dispatch = useDispatch()

    const [selectedMessageId, setSelectedMessageId] = useState(3)

    // console.log(selectedMessageId)

    const updateMessageLog = (broadcast) => {



        if(broadcast.message) {

            let newMessageInfo = broadcast.message;
            // debugger
            newMessageInfo.picture = broadcast.picture;
            
            dispatch(receiveMessageInfo(newMessageInfo))
            
        }

        // debugger
        if (broadcast.message_list) {

            const newMessageIdsToRender = broadcast?.message_list;
            const channelUpdate = ({
                channelId: currentChannelId, 
                messageList: newMessageIdsToRender
            })
            
            
            dispatch(updateMessageList(channelUpdate))
            
        }

        if (broadcast.message_update) {

            const messageInfo = broadcast?.message_update;

            dispatch(receiveMessageInfo(messageInfo))
        }


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

    const deleteHandler = (e) => {
        e.preventDefault();
        // debugger

        const messageIdToDestroy = e.currentTarget.id;

        const deletionRequest = ({
            messageId: messageIdToDestroy, 
            channelId: currentChannelId
        })

        dispatch(destroyMessageAndUpdateChannelMessages(deletionRequest))


    }

    const selectionHandler = (e) => {
        e.preventDefault()
        
        const messageIdToEdit = e.currentTarget.id;

        // debugger

        setSelectedMessageId(() => messageIdToEdit)

    }

 

    let messageLiElements = messageIdsToRender?.map((messageId, idx) => {
        
        //BROADCAST COMING IN IS BUGGY.. it has author_id and context_id...

        const message = allMessages[messageId];
        const date2 = new Date(message?.createdAt)

        const messageContent = allMessages[messageId]?.content;

                        function _shouldRenderAvatar() {    
                            if (idx === 0) {
                                return true
                            }

                            const previousMessageId = messageIdsToRender[idx-1];
                            const previousMessage = allMessages[previousMessageId];
                            if (message?.authorId !== previousMessage?.authorId){
                                // debugger
                                return true;
                            } else {
                                let date1 = new Date(previousMessage?.createdAt);

                                let differenceInMInutes = Math.abs(date1 - date2)/1000/60;

                                if (differenceInMInutes > 5) {
                                    return true
                                } else {
                                    return false
                                }
                            } 
                        } // private internal method sorta!
                          // if u refactor this, I think it will break... lmaoo

            const _turnDateIntoNicerString = (dateObject) => {
                if (!dateObject) {
                    return null
                }

                let month = dateObject.getMonth()
                let day = dateObject.getDate()
                let year = dateObject.getFullYear()

                if (!month ||
                    !day ||
                    !year) {
                        // debugger
                        return undefined
                    }


                return `${month}/${day}/${year} ${dateObject.toLocaleTimeString()}`
            }

            let date = date2? _turnDateIntoNicerString(date2) : undefined
            
            let currentAuthor = allUsers[message?.authorId]
            

            const willRender = _shouldRenderAvatar()

        if (!willRender) {
            // debugger
            return (
                <li className="message" key={messageId}> 
                    <div className="emptyImageContainer">

                    </div>

                    <div className="messagecontents">
                        <p>{messageContent? messageContent : "_"}</p>
                    <UpdateMessageModal setselectedmessage={setSelectedMessageId} selectedmessage={selectedMessageId} messageId={messageId} message={messageContent}/>
                        {message?.picture? <img style={{maxWidth: "400px", maxHeight: "400px"}} src={message?.picture}/> : <></> }
                    </div>
                    {currentUserId === message?.authorId ? 
                    <>
                        <span><button id={messageId} className="editmessagebutton" onClick={selectionHandler}>
                            <i className="fa-solid fa-square-pen"></i>
                        </button></span>
                        <span><button id={messageId} onClick={deleteHandler}>
                            <i className="fa-solid fa-trash-can"></i>
                            </button></span>
                    </>
                    :
                    <></>
                    }

                </li>
            )
        } else if (willRender){
            // debugger
            return (
                <li className="message withimage" key={messageId}> 
                    <div className="ImageContainer">
                        <img className="avatar" src={currentAuthor?.avatar ? currentAuthor?.avatar : "/assets/avatars/DefaultAvatar.png" }/>    
                    </div>

                    <div className="messagecontents">
                        <header>
                            <h5 className="username">{currentAuthor?.username}</h5>
                            <span>{date}</span>
                        </header>

                        <p>{messageContent? messageContent : "_"}</p>
                    <UpdateMessageModal setselectedmessage={setSelectedMessageId} selectedmessage={selectedMessageId} messageId={messageId} message={messageContent}/>
                        {message?.picture? <img style={{maxWidth: "400px", maxHeight: "400px"}} src={message?.picture}/> : <></> }
                    </div>
                    {currentUserId === message?.authorId ? 
                    <>
                    <span><button id={messageId} className="editmessagebutton" onClick={selectionHandler}>
                        <i className="fa-solid fa-square-pen"></i>
                            
                        </button></span>
                    <span><button id={messageId} onClick={deleteHandler}>
                        <i className="fa-solid fa-trash-can"></i>
                        </button></span>
                    </>
                    :
                    <></>
                    }
                </li>
            )
        
        }
    })

    return (
        <ol className="ChatLog">
            {messageLiElements?.reverse()}
        </ol>
    )
}