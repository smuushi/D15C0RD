import { csrfFetch } from "../store_utils/csrf";

const RECEIVESESSIONINFO = "sess/RECEIVESESSIONINFO"
const REMOVESESSIONINFO = "sess/REMOVESESSIONINFO"


export const updateSessionStorageInSessionReducerActionCreator = () => {

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    let userAction = {}

    currentUser? 
        userAction = {
            // type:RECEIVESESSIONINFO,
            session: {...currentUser}
        } : 
        userAction = {
            // type: RECEIVESESSIONINFO,
            session: {user: null}
        } 


    return userAction
    // dispatch(userAction)

}

//---SESSION REDUCER---//

export const SessionReducer = (state = {}, action) => {

    let nextState = {...Object.freeze(state)}

    switch(action.type) {

        case RECEIVESESSIONINFO:

        // debugger
        if (action.session.user === null) {
            nextState.user = null;
            
        } else {
            nextState.user = action.session
        }
            return nextState;

        case REMOVESESSIONINFO:
            // debugger
            nextState.user = null;
            return nextState;


        default: 
        return nextState;
    }


}