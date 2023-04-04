import { csrfFetch } from "../store_utils/csrf"

const RECEIVEALLUSERS = "user/RECEIVEALLUSERS"

const RECEIVEUSERINFO = "user/RECEIVEUSERINFO"


//--- Thunks---//


export const fetchAllUsers = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users`)

    if (res.ok) {
        let data = await res.json()

        dispatch(receiveAllTheUsers(data))
    } else {
        console.log("HAVING ISSUES WHILE GETTING ALL THE USERS FAM")
    }

}


//---AC---//

export const receiveAllTheUsers = (collectionArrayOfUsers) => ({
    type: RECEIVEALLUSERS, 
    payload: collectionArrayOfUsers
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
        

        // case REMOVESESSIONINFO:
            // incomplete
            // return nextState;

        default: 
        return nextState;
    }


}