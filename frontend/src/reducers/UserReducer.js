import { csrfFetch } from "../store_utils/csrf"

const RECEIVEALLUSERS = "user/RECEIVEALLUSERS"

const RECEIVEUSERINFO = "user/RECEIVEUSERINFO"

const ADDOWNEDSERVER = "user/ADDOWNEDSERVER"


//--- Thunks---//


export const fetchAllUsers = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users`)

    if (res.ok) {
        let data = await res.json()

        dispatch(receiveAllTheUsers(data))
    } else {
        console.log("HAVING ISSUES WHILE GETTING ALL THE USERS FAM")
    }

    return res

}


//---AC---//

export const receiveAllTheUsers = (collectionArrayOfUsers) => ({
    type: RECEIVEALLUSERS, 
    payload: collectionArrayOfUsers
})

export const addNewOwnedServerToUsersSlice = (object) => ({
    type: ADDOWNEDSERVER, 
    payload: {serverId: object.serverId, ownerId: object.ownerId}
})


//---User Reducer---//

export const UserReducer = (state = {}, action) => {

    // debugger
    let nextState = {...Object.freeze(state)}

    switch(action.type) {

        case RECEIVEALLUSERS:
            // debugger
            
            action.payload?.forEach((user) => {
                nextState[user.id] = user;
            });

            return nextState;


        case RECEIVEUSERINFO:
            return nextState;

        
        // debugger
        case ADDOWNEDSERVER:
            // debugger
            nextState[action.payload.ownerId].servers.push(action.payload.serverId)
            return nextState;

        // case REMOVESESSIONINFO:
            // incomplete
            // return nextState;

        default: 
        return nextState;
    }


}