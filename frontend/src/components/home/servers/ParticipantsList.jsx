import { useSelector } from "react-redux"
import "./participantslist.css"

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
                <li className="UserLi">

                    <div className="UserImageContainer">
                        {allUsers[userId].avatar ? 
                            <img src={allUsers[userId].avatar}/>
                            :
                            <img src="/assets/avatars/DefaultAvatar.png" />
                        }
                    </div>
                    
                    <div className="UserName">
                        {`${allUsers[userId]?.username} `} 
                        <i class="fa-solid fa-crown"></i>
                    </div>
                    
                </li>
            )
        } else {
            return (
                <li className="UserLi">

                    <div className="UserImageContainer">
                        {allUsers[userId].avatar ? 
                            <img src={allUsers[userId].avatar}/>
                            :
                            <img src="/assets/avatars/DefaultAvatar.png" />
                        }
                    </div>
                    
                    <div className="UserName">
                        {allUsers[userId]?.username}
                        
                    </div>
                    
                </li>
            )
        }

    })
    

    // console.log(targetServer)
    // console.log(owner)

    

    return (


        <ul>
            <header>
                <h5>Members - {participantsLiElements?.length}</h5>
            </header>
            {participantsLiElements}



        </ul>
    )

}