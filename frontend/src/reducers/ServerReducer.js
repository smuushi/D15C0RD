import { csrfFetch } from "../store_utils/csrf"
import { addServerToOwnedServersAC } from "./SessionReducer"

const RECEIVESERVERINFO = "server/RECEIVESERVERINFO"

const RECEIVEALLSERVERS = "server/RECEIVEALLSERVERS"

const REMOVESERVER = "server/REMOVESERVER"



//---Thunks---//

export const destroyServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method:'DELETE'
    })
    // debugger
    if (res.ok) {
        dispatch(removeServer(serverId))
    }
}


export const updateServer = (serverInfo) => async (dispatch) => {

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
        }

        return res;

    } else {

        
            const res = await csrfFetch(`/api/servers/${serverInfo.id}`, 
        
            )


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
}


//---AC---//


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
        

        // case REMOVESESSIONINFO:
            // incomplete
            // return nextState;

        default: 
        return nextState;
    }


}