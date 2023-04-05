

export const Name = (props) => {

    const {setName} = props;
    const {name} = props;

    const changeHandler = (e) => {
        setName(() => e.target.value)


    }

    return (

        <>
        <header>
            <h3> Customize your server</h3>
            <h5> Give your server a personality with a name! </h5>

        </header>

        <label htmlFor="servername"></label>
        <input onChange={changeHandler} id="servername" type="text" placeholder="SERVER NAME" />

        {name? <button id="submissionbutton" type="submit">
            CREATE
        </button> :
        <button id="notworkingbutton"> fill name pls </button>}
    
    </>

    )
}