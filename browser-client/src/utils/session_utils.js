
import { Dispatch } from "react"

const LOGMEINBABYY = "LOGMEINBABYY"

const loginActionCreator = (userInfo) => ({
    type: LOGMEINBABYY,
    userInfo
})


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




