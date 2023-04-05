

export const Name = (props) => {

    const {setName} = props;

    const clickHandler = (e) => {
        setName(() => "sometruthyvalfornow...")
    }

    return (

        <>
        <header>
            <h3> Customize your server</h3>
            <h5> Give your server a personality with a name! </h5>

        </header>

        <label htmlFor="servername"></label>
        <input id="servername" type="text" placeholder="SERVER NAME" />

        <button onClick={clickHandler}>

            CREATE
        </button>
    
    </>

    )
}