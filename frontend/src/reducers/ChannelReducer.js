import { csrfFetch } from "../store_utils/csrf"
import { addChannel } from "./ServerReducer"

const RECEIVEALLCHANNELS = "channel/RECEIVEALLCHANNELS"
const RECEIVECHANNELINFO = "channel/RECEIVECHANNELINFO"
const REMOVECHANNEL = "channel/REMOVECHANNEL"


//---THUNKS---//

export const updateChannel = (channelInfo) => async (dispatch) => {

    const res = await csrfFetch(`/api/channels/${channelInfo.id}`,{
        method:'PATCH', 
        body: JSON.stringify({
            channel: {
                ...channelInfo
            }
        })
    })

    if (res.ok) {
        let data = await res.json();

        dispatch(receiveChannel(data))
    }

} 

export const destroyChannel = (channelId) => async (dispatch) => {

    const res = await csrfFetch(`/api/channels/${channelId}`,{
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeChannel(channelId))
    }

    return res

}


export const createNewChannel = (newChannelInfo) => async (dispatch) => {

    const res = await csrfFetch(`/api/channels`, {
        method: "POST", 
        body: JSON.stringify({
            channel: {
                ...newChannelInfo
            }
        })
    });

    if (res.ok) {
        let channelInfo = await res.json();
        
        dispatch(receiveChannel(channelInfo))
        dispatch(addChannel({id: channelInfo.id, serverId: channelInfo.serverId}))

        return [res, channelInfo.id]
    } else {
        console.log('THERE WAS AN ERROR CREATING THE NEW CHANNEL...')
    }




}


export const fetchAllChannels = () => async(dispatch) => {

    const res = await csrfFetch("/api/channels");

    if (res.ok) {
        let allChannelsArray = await res.json();

        dispatch(receiveAllChannels(allChannelsArray));
    }

    return res;

}


//---AC---//

export const receiveAllChannels = (channelObjectArray) => ({
    type: RECEIVEALLCHANNELS, 
    channels: channelObjectArray
})

export const receiveChannel = (channelInfo) => ({
    type: RECEIVECHANNELINFO, 
    payload: channelInfo
})

export const removeChannel = (channelId) => ({
    type: REMOVECHANNEL,
    channelId
})




//---REDUCER---//

export const ChannelReducer = (state = {}, action) => {

    // debugger
    let nextState = {...Object.freeze(state)}

    switch(action.type) {

        case RECEIVEALLCHANNELS:

            action.channels.forEach((channel) => {
                nextState[channel.id] = channel;
            })

            return nextState;

        case RECEIVECHANNELINFO:


            
            nextState[action.payload.id] = action.payload; //TENTATIVE COPYPASTA FROM SERVERREDUCER

            return nextState; //TENTATIVE COPYPASTA FROM SERVERREDUCER


        case REMOVECHANNEL:
            // delete nextState[action.serverId] //TENTATIVE COPYPASTA FROM SERVERREDUCER.. 
                                             // it still have serverId there lmao

            delete nextState[action.channelId]

            return nextState; //TENTATIVE COPYPASTA FROM SERVERREDUCER
        

        default: 
        return nextState;
    }


}