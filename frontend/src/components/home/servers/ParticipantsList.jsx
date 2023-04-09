import { useSelector } from "react-redux"

export const ParticipantsList = (props) => {

    // console.log(props)

    const targetServerId = props.server

    const targetServer = useSelector(state => state.entities.servers[targetServerId])

    // NEED TO GRAB ALL THE USERS NOW FOR MY STORE now... Tuesday, Apr 4, 4:22pm.. it's been 5 days without sunlight or love.

    const allUsers = useSelector(state => state.entities.users)

    const subscribersIdArray = targetServer?.subscribers



    // const owner = useSelector(state => targetServer? state.entities.users[targetServer.ownerId] : null)
    // const ownerLiElement = owner? <li className="King"> {owner.username} -- OWNER </li> : null
    // Saturday, Apr 8th, 8:24pm... this code is depreciated.. 
    // NOTE: don't rely on the session slice for anything other than the user ID.
    // I was young 4 days ago. now i am old and learned. 

    const participantsLiElements = subscribersIdArray?.map((userId) => {

        if (targetServer.ownerId === userId) {

            // debugger
            return (
                <li>{allUsers[userId]?.username} -- OWNER</li>
            )
        } else {
            return (
                <li>{allUsers[userId]?.username}</li>
            )
        }

    })
    

    // console.log(targetServer)
    // console.log(owner)

    

    return (

        <ul>
            {participantsLiElements}

            <li>MEMBERS PLACEHOLDER HERE..</li>

        </ul>
    )

}