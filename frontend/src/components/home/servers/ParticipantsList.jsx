import { useSelector } from "react-redux"

export const ParticipantsList = (props) => {

    // console.log(props)

    const targetServerId = props.server

    const targetServer = useSelector(state => state.entities.servers[targetServerId])


    // NEED TO GRAB ALL THE USERS NOW FOR MY STORE now... Tuesday, Apr 4, 4:22pm.. it's been 5 days without sunlight or love.

    const owner = useSelector(state => targetServer? state.entities.users[targetServer.ownerId] : null)
    const ownerLiElement = owner? <li className="King"> {owner.username} -- OWNER </li> : null

    // console.log(targetServer)
    // console.log(owner)

    return (

        <ol>
            {ownerLiElement}
            <li>MEMBERS PLACEHOLDER HERE..</li>

        </ol>
    )

}