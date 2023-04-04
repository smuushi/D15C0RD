import { csrfFetch } from "../store_utils/csrf"

const RECEIVESERVERINFO = "server/RECEIVESERVERINFO"

const RECEIVEALLSERVERS = "server/RECEIVEALLSERVERS"


//---Thunks---//

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

export const receiveAllServers = (serversArrayCollection) => ({
    type: RECEIVEALLSERVERS, 
    payload: serversArrayCollection
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
            return nextState;

        
        // debugger
        

        // case REMOVESESSIONINFO:
            // incomplete
            // return nextState;

        default: 
        return nextState;
    }


}