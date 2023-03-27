

const initialState = ({
    loggedInId: null
});

// i guess initially, we're going to be logged out lmao... 

const sessionReducer = (state = initialState, action ) => {
    let upcomingState = Object.assign({}, Object.freeze(state)); 

    switch (action.type) {
        
        case "LOGMEINBABYY":
            // debugger
            upcomingState.loggedInId = action.userInfo.id;
            // upcomingState[loggedInId] = action.id;
            return upcomingState;
        default: 
            return upcomingState;


    }

}

export default sessionReducer