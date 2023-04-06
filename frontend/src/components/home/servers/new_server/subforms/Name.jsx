

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

        <div className="nameInput">
            <label htmlFor="servername">Server Name</label>
            <br />
            <input onChange={changeHandler} id="servername" type="text" placeholder="Enter your server name here" />
        </div>

        <div id="submitters">

            {name? <button id="submissionbutton" type="submit">
                Create
            </button> :
            <button id="notworkingbutton"> fill name pls </button>}
        </div>
    
    </>

    )
}