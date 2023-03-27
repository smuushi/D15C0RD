
// import { Dispatch } from "react"

const LOGMEINBABYY = "LOGMEINBABYY"
const LOGMEOUT = "LOGMEOUT"

const loginActionCreator = (userInfo) => ({
    type: LOGMEINBABYY,
    userInfo
})

const logoutActionCreator = () => ({
    type: LOGMEOUT,
})

export const logoutt = () => async (dispatch) => {
    console.log("hello? im trying to log out..."); 

    const res = await fetch(
        `/session/`, 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }, 
        }
    )
    if (res.ok){
        dispatch(logoutActionCreator())
        
    } else {
        console.log("we failed to log out lmao")
    }
} 

export const loginn = (email, password) => async dispatch => {
    // debugger
    console.log("hello?")
    const res = await fetch(
      `/session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }, 
        body: JSON.stringify({
            "user": {"email": email, "password": password}
        })
      }
    )
    if (res.ok) {
        // debugger
        console.log('response was ok!');
        let data = await res.json();
        console.log(data);
        dispatch(loginActionCreator(data));
    } else {
        console.log('we died...')
    }
}




