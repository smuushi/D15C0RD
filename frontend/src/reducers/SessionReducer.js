import { csrfFetch } from "../store_utils/csrf";

const RECEIVESESSIONINFO = "sess/RECEIVESESSIONINFO"
const REMOVESESSIONINFO = "sess/REMOVESESSIONINFO"

const RECEIVEERROR = "sess/RECEIVEERROR"

export const sessionLogout = () => async (dispatch) => {

    const res = await csrfFetch(`api/session`, {
        method: 'DELETE'
    })

    if (res.ok) {
        let data = await res.json();
        console.log(data)
        sessionStorage.setItem("currentUser", null)
        dispatch(removeSessionAC());
    } else {
        let data = await res.json();
        console.log(data)
    }

}


export const sessionLogin = (userLogin) => async (dispatch) => {
    // user login should be an object with email and password keys. 
    const res = await csrfFetch(`api/session`, {
        method: 'POST', 
        body: JSON.stringify(userLogin)
    });

    if (res.ok) {

        console.log(res);
        let sessionData = await res.json();
        console.log(sessionData)
        // debugger
        dispatch(receiveSessionAC(sessionData))
        sessionStorage.setItem("currentUser", JSON.stringify(sessionData))

    } else {
        
        let sessionError = await res.json();
        // debugger
        let sessionErrorAction = sessionErrorAC(sessionError.error)
        dispatch(sessionErrorAction)
        // i need to dispatch to an error reducer in this circumstance... 

    }
}


//--- ActionCreators (AC)---//

const receiveSessionAC = (user) => ({
    type: RECEIVESESSIONINFO, 
    session: user
})

const removeSessionAC = () => ({
    type: REMOVESESSIONINFO, 
}) 

const sessionErrorAC = (error) => ({
    type: RECEIVEERROR, 
    error
})
   // no need for anything in the session because 
   // we're just setting our session slice of state's user to null.. 




//--- MISC.. ---//

export const updateSessionStorageInSessionReducerActionCreator = () => {

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    let userAction = {}

    currentUser? 
        userAction = {
            // type:RECEIVESESSIONINFO,
            session: {user: {...currentUser}}
        } : 
        userAction = {
            // type: RECEIVESESSIONINFO,
            session: {user: null}
        } 


    return userAction
    // dispatch(userAction)

}

//---SESSION REDUCER & ERROR REDUCER right underneath hehe---//

export const SessionReducer = (state = {}, action) => {

    // debugger
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



export const SessionErrorReducer = (state = [], action) => {

    // debugger
    let nextState = [...Object.freeze(state)]

    switch(action.type) {

        case RECEIVEERROR:

            nextState.push([action.error])
            return nextState;

        default: 
        return nextState = [];
    }


}