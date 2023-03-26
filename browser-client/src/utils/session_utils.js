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
        debugger
        console.log('response was ok!')
    } else {
        console.log('we died...')
    }
}


