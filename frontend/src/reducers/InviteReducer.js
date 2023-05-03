import { csrfFetch } from "../store_utils/csrf"

const RECEIVEINVITECODE = "invite/RECEIVEINVITECODE"




//---THUNKS---//

export const fetchNewInvite = (serverId) => async (dispatch) => {

    const res = await csrfFetch(`/api/generate_invite/server/${serverId}`)

    if (res.ok) {
        let data = await res.json();
        // debugger

        let codeString = data.invite_code;

        dispatch(receiveInviteCodeAC(codeString))
    } else {

        // console.log("the server didnt work properly...")

        dispatch(receiveInviteCodeAC("AHH THE SERVER DIED.. SORRY.. pls try again.."))
    }

    return res
}



//---AC---//



export const receiveInviteCodeAC = (codeString) => ({
    type: RECEIVEINVITECODE, 
    payload: codeString
})

//---REDUCER---//



export const InviteReducer = (state = null, action) => {

    // debugger
    let nextState = null

    switch(action.type) {

        case RECEIVEINVITECODE:

            nextState = action.payload;

            return nextState;


        default: 
        return nextState;
    }


}