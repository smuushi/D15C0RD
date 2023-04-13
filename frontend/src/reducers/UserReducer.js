import { csrfFetch } from "../store_utils/csrf"

const RECEIVEALLUSERS = "user/RECEIVEALLUSERS"

const RECEIVEUSERINFO = "user/RECEIVEUSERINFO"

const ADDOWNEDSERVER = "user/ADDOWNEDSERVER"

const ADDNEWJOINEDSERVER = "user/ADDNEWJOINEDSERVER"


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

export const sendOutUserUpdate = (userUpdateObject) => async (dispatch) => {

    if (userUpdateObject.avatar) {

        debugger

        let formVersionOfUpdateData = new FormData() 
        
        formVersionOfUpdateData.append('user[username]', userUpdateObject.username)
        formVersionOfUpdateData.append('user[about]', userUpdateObject.about)
        formVersionOfUpdateData.append('user[avatar]', userUpdateObject.avatar)

        const res = await csrfFetch(`/api/users/${userUpdateObject.id}`,{
            method: 'PATCH',
            body: formVersionOfUpdateData 
        })

        if (res.ok) {
            const data = await res.json();

            dispatch(receiveUser(data))


        }
        
    } else {

        let formVersionOfUpdateData = new FormData() 
        
        formVersionOfUpdateData.append('user[username]', userUpdateObject.username)
        formVersionOfUpdateData.append('user[about]', userUpdateObject.about)


        const res = await csrfFetch(`/api/users/${userUpdateObject.id}`,{
            method: 'PATCH',
            body: formVersionOfUpdateData 
        })

        if (res.ok) {
            const data = await res.json();

            dispatch(receiveUser(data))

        }


    }
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

export const addNewServerToJoinedServers = (object) => ({
    type: ADDNEWJOINEDSERVER,
    payload: {serverId: object.serverId, subscriberId: object.subscriberId}
})

export const receiveUser = (userObject) => ({
    type: RECEIVEUSERINFO, 
    payload: userObject
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

            nextState[action.payload.id] = action.payload

            return nextState;

        
        // debugger
        case ADDOWNEDSERVER:
            // debugger
            nextState[action.payload.ownerId].servers.push(action.payload.serverId)
            return nextState;

        // case REMOVESESSIONINFO:
            // incomplete
            // return nextState;

        case ADDNEWJOINEDSERVER:
            // debugger
            nextState[action.payload.subscriberId].joinedServers.push(action.payload.serverId)
            return nextState
        default: 
        return nextState;
    }


}