import { csrfFetch } from "../store_utils/csrf"
import { addServerToOwnedServersAC } from "./SessionReducer"
import { addNewOwnedServerToUsersSlice, addNewServerToJoinedServers } from "./UserReducer"
import { receiveUser } from "./UserReducer"

const RECEIVESERVERINFO = "server/RECEIVESERVERINFO"

const RECEIVEALLSERVERS = "server/RECEIVEALLSERVERS"

const REMOVESERVER = "server/REMOVESERVER"

const ADDCHANNEL = "server/ADDCHANNEL"

const ADDSERVERERROR = "server/ADDSERVERERROR"



//---Thunks---//

export const leaveServer = (request) => async (dispatch) => {

    const res = await csrfFetch(`/api/server_subscriptions/${request.serverId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            subrequest: {
                subscriberId: request.userId
            }
        })
    })

    if (res.ok) {

        let data = await res.json()

        dispatch(receiveUser(data))
        // debugger
        


    } else {
        console.log("DELETION FAILED HARD BRO")
        console.log("DELETION FAILED HARD BRO")
        console.log("DELETION FAILED HARD BRO")
        console.log("DELETION FAILED HARD BRO")
        console.log("DELETION FAILED HARD BRO")

    }



}


export const joinServer = (request) => async (dispatch) => {

    const res = await csrfFetch(`/api/server_subscriptions`, {
        method: 'POST',
        body: JSON.stringify({
            subrequest: {
                ...request
            }
        })
    })

    if (res.ok) {
        let data = await res.json();
        // debugger
        dispatch(addNewServerToJoinedServers({subscriberId: data.subscriberId, serverId: data.serverId}))

        return data
        
    } else {

        let errorArray = await res.json();
        // debugger
        console.log("failed to join server")
        dispatch(receiveError(errorArray))

        throw new Error
    }

}

export const destroyServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method:'DELETE'
    })
    // debugger
    if (res.ok) {
        dispatch(removeServer(serverId))
    }
    return res;
}


export const updateServer = (serverInfo) => async (dispatch) => {

    if(serverInfo.removeicon){

        const res = await csrfFetch(`/api/servers/${serverInfo.id}`, {
            method: 'PATCH', 
            body: JSON.stringify({
                server: {
                    icon: null
                }
            })
        });

        if (res.ok) {
            let data = await res.json();
            dispatch(receiveServer(data));
        }
        return res
    }


    if (!serverInfo.icon) {
        const res = await csrfFetch(`/api/servers/${serverInfo.id}`, {
            method: 'PATCH', 
            body: JSON.stringify({
                server: {
                    name: serverInfo.name
                }
            })
        })

        if (res.ok) {
            let data = await res.json();
            dispatch(receiveServer(data));

        } else {

            console.log('THE UPDATE DIED SOMEHOW...')

        }

        return res;

    } else {
        const formData = new FormData();
        
        if (serverInfo.name){
            formData.append('server[name]', serverInfo.name)
        }
        formData.append('server[icon]', serverInfo.icon);
        
        const res = await csrfFetch(`/api/servers/${serverInfo.id}`,{ 
            method: 'PATCH', 
            body: formData
        });

        if (res.ok) {
            let responseInfo = await res.json();
            dispatch(receiveServer(responseInfo))
        }        


    }


}


export const createServer = (serverInfo) => async (dispatch) => {


    if (serverInfo.icon === null) {
        const res = await csrfFetch(`/api/servers`,{ 
            method: 'POST', 
            body: JSON.stringify({
                server: {
                    ...serverInfo
                }

            })
        })

        if (res.ok) {
            let serverInfo = await res.json();

            dispatch(receiveServer(serverInfo))
            dispatch(addServerToOwnedServersAC(serverInfo.id))
            dispatch(addNewOwnedServerToUsersSlice({ownerId: serverInfo.ownerId, serverId: serverInfo.id}))
            dispatch(addNewServerToJoinedServers({subscriberId: serverInfo.ownerId, serverId: serverInfo.id}))
            return serverInfo
        } else {

            console.log('RES WAS NOT OK WHILE GETTING DATA BACK FROM TRYING TO CREATE SERVER...')
        }
    } else if (serverInfo.icon) {
        const formData = new FormData();
        formData.append('server[name]', serverInfo.name);
        formData.append('server[ownerId]', serverInfo.ownerId);
        formData.append('server[icon]', serverInfo.icon)

        const res = await csrfFetch('/api/servers', {
            method: 'POST', 
            body: formData
        });

        if (res.ok) {

            let responseInfo = await res.json();



            dispatch(receiveServer(responseInfo))
            dispatch(addServerToOwnedServersAC(responseInfo.id))
            dispatch(addNewOwnedServerToUsersSlice({ownerId: responseInfo.ownerId, serverId: responseInfo.id}))
            dispatch(addNewServerToJoinedServers({subscriberId: responseInfo.ownerId, serverId: responseInfo.id}))

            return responseInfo
        }


    }

}




export const fetchAllServers = () => async (dispatch) => {
    const res = await csrfFetch(`/api/servers`)


    if (res.ok) {
        let data = await res.json();

        dispatch(receiveAllServers(data));
    } else {
        console.log("SO BAD... from trying to get all servers. ")
    }
    return res;
}


//---AC---//

export const receiveError = (errorArray) => ({
    type: ADDSERVERERROR, 
    payload: errorArray
})


export const removeServer = (serverId) => ({
    type: REMOVESERVER, 
    serverId
})

export const receiveAllServers = (serversArrayCollection) => ({
    type: RECEIVEALLSERVERS, 
    payload: serversArrayCollection
})


export const receiveServer = (serverInfo) => ({
    type: RECEIVESERVERINFO, 
    payload: serverInfo
})

export const addChannel = (channelInfo) => ({
    type: ADDCHANNEL, 
    payload: channelInfo
}) // note that channel info should be an object with the keys of Id and serverId.


//---Server Reducer---//

export const ServerReducer = (state = {}, action) => {

    // debugger
    let nextState = {...Object.freeze(state)}

    switch(action.type) {

        case RECEIVEALLSERVERS:
            // debugger
            
            action.payload?.forEach((server) => {
                nextState[server.id] = server;
            });

            return nextState;


        case RECEIVESERVERINFO:

            nextState[action.payload.id] = action.payload;

            return nextState;

        case REMOVESERVER:
            delete nextState[action.serverId]

            return nextState;
        // debugger
        

        case ADDCHANNEL:

            // debugger
            nextState[action.payload.serverId].channels.push(action.payload.id)
        // case REMOVESESSIONINFO:
            // incomplete
            return nextState;


        default: 
        return nextState;
    }


}

export const serverErrorReducer = (state = [], action) => {

    let nextState = []

    switch (action.type) {

        case ADDSERVERERROR: 
        // debugger
            action.payload.forEach((error) => {
                nextState.push(error)
            })

            return nextState;

        default:
            return nextState;


    }
}