
export const Creation = (props) => {

    const {setCreation} = props;

    const {setNewsub} = props;
    // console.log(setCreation)

    const clickHandler = (e) => {
        setCreation(() => "sometruthyvalfornow...")
    }

    return (
        <>
            <header>
                <h3> Create a server </h3>
                <h5> Your server is where you and your friends hang out. Make yours and start talking.</h5>
            </header>

            <button onClick={clickHandler}> 
                <img src="/assets/misc/createmyown.svg"/>
                Create My Own 

                
            </button>

            <section id="joinsection">

                <div>Have an invite already?</div>

                <button id="joinbutton" onClick={() => {setNewsub(() => "some other truthy val lmao")}}>

                    Join a Server

                </button>
            </section>

                    

                    
        </>
    )

}