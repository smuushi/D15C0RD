import { csrfFetch } from "../store_utils/csrf"
import { receiveChannel } from "./ChannelReducer"

const RECEIVEALLMESSAGES = "messages/RECEIVEALLMESSAGES"

const RECEIVEMESSAGE = "messages/RECEIVEMESSAGE"





//--- THUNKS ---//


export const sendUpdateMessage = (updateRequest) => async (dispatch) => {

    const res = await csrfFetch(`/api/messages/${updateRequest.messageId}`,{
        method: "PATCH",
        body: JSON.stringify({
            message: {
                content: updateRequest.newMessage
            }
        })
    })

    if (res.ok) {
        let messageInfo = await res.json();

        // debugger

        dispatch(receiveMessageInfo(messageInfo))


        return res
    } else {
        debugger
        console.log("updating error did not go well...")
    }



}

export const fetchAllMessages = () => async (dispatch) => {


    const res = await csrfFetch(`/api/messages`)

    if (res.ok) {
        let messagesArray = await res.json();

        dispatch(receiveAllMessagesAC(messagesArray))


    }

    return res

}

export const createNewMessage = (messageObject) => async (dispatch) => {


    if (messageObject.picture) {

        let formData = new FormData();
        formData.append('message[content]', messageObject.content)
        formData.append('message[authorId]', messageObject.authorId)
        formData.append('message[picture]', messageObject.picture)
        formData.append('message[contextId]', messageObject.contextId)
        // debugger

        const res = await csrfFetch(`/api/messages/${messageObject.contextId}`,{
            method: 'POST', 
            body: formData
        })

        if (res.ok){
            let data = await res.json();

            dispatch(receiveMessageInfo(data.message))
            dispatch(receiveChannel(data.channel))

            return res
        }

    } else {

        let formData = new FormData();
        formData.append('message[content]', messageObject.content)
        formData.append('message[authorId]', messageObject.authorId)
        // formData.append('message[picture]', messageObject.picture)
        formData.append('message[contextId]', messageObject.contextId)

        // debugger

        const res = await csrfFetch(`/api/messages/${messageObject.contextId}`,{
            method: 'POST', 
            body: formData
        })

        if (res.ok){
            let data = await res.json();
            // debugger

            dispatch(receiveMessageInfo(data.message))
            dispatch(receiveChannel(data.channel))

            return res
        }
    }

}




//--- AC ---//

export const receiveAllMessagesAC = (allMessagesArray) => ({
    type: RECEIVEALLMESSAGES,
    messages: allMessagesArray

})


export const receiveMessageInfo = (messageInfo) => ({
    type: RECEIVEMESSAGE,
    payload: messageInfo
})


//--- REDUCER ---//


export const MessageReducer = (state = {}, action) => {

    // debugger
    let nextState = {...Object.freeze(state)}

    switch(action.type) {

        case RECEIVEALLMESSAGES:

            action.messages.forEach((message) => {
                nextState[message.id] = message;
            })

            return nextState;


        case RECEIVEMESSAGE:

            nextState[action.payload.id] = action.payload
            return nextState;

        // case RECEIVECHANNELINFO:


            
        //     nextState[action.payload.id] = action.payload; //TENTATIVE COPYPASTA FROM SERVERREDUCER

        //     return nextState; //TENTATIVE COPYPASTA FROM SERVERREDUCER


        // case REMOVECHANNEL:
        //     // delete nextState[action.serverId] //TENTATIVE COPYPASTA FROM SERVERREDUCER.. 
        //                                      // it still have serverId there lmao

        //     delete nextState[action.channelId]

        //     return nextState; //TENTATIVE COPYPASTA FROM SERVERREDUCER
        

        default: 
        return nextState;
    }


}