
export const Setting = (props) => {

    const {setSetting} = props;

    const clickHandler = (e) => {
        setSetting(() => "sometruthyvalfornow...")
    }

    return (
        <>
            <header>
                <h3> Tell us more about your server</h3>
                <h5> In order to help you with your setup, is your new server for just a few friends or a larger community?</h5>

            </header>

            <button onClick={clickHandler}>
                <img src="/assets/misc/setmysetting.svg" />
                For me and my friends
            </button>
        
        </>
    )
}