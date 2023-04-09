import { useSelector } from "react-redux";


export const Newsub = (props) => {

    const {invite, setInvite} = props
    const errors = useSelector(state => state.errors.serverError)

    const changeHandler = (e) => {
        e.preventDefault();
        // debugger

        setInvite(() => e.target.value)

    }

    return (
        <>
            <header>
                <h3> Join a Server </h3>
                <h5> Enter the invite code below to join an existing server</h5>

            </header>

            <div id="invitersection">

            <span>{errors? errors : <></>}</span>
            <input onChange={changeHandler} type="text" placeholder="Invite Code" value={invite}/>

            </div>

            <div id="submitters">

            {invite? <button id="submissionbbutton" type="submit">
                Join Server
            </button> :
            <button id="notworkingbutton"> fill invite pls </button>}

            </div>

        </>
    )

}