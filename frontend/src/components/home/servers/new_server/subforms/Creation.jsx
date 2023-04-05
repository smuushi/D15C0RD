
export const Creation = (props) => {

    const {setCreation} = props;

    // console.log(setCreation)

    const clickHandler = (e) => {
        setCreation(() => "sometruthyvalfornow...")
    }

    return (
        <>
            <header>
                <h3> Create a server </h3>
                <h3> Your server is where you and your friends hang out. Make yours and start talking.</h3>
            </header>

            <button onClick={clickHandler}> 
                <img src="/assets/misc/createmyown.svg"/>
                Create My Own 
            </button>

        </>
    )

}