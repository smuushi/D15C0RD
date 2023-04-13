import { useSelector } from "react-redux"
import "./participantslist.css"

import { useDispatch } from "react-redux"

import consumer from "../../../consumer"
import { useEffect } from "react"

import { addSubscribers, updateChannels } from "../../../reducers/ServerReducer"
import { receiveChannel } from "../../../reducers/ChannelReducer"
import { activateModalAC } from "../../../reducers/ModalReducer"

export const ParticipantsList = (props) => {

    // console.log(consumer

    // console.log(props)

    const targetServerId = props.server

    const targetServer = useSelector(state => state.entities.servers[targetServerId])

    // NEED TO GRAB ALL THE USERS NOW FOR MY STORE now... Tuesday, Apr 4, 4:22pm.. it's been 5 days without sunlight or love.

    const allUsers = useSelector(state => state.entities.users)

    const subscribersIdArray = targetServer?.subscribers

    const dispatch = useDispatch();


    const updateServerSubscribers = (broadcast) => {



        if (broadcast.type === "joining") {
            // debugger
            dispatch(addSubscribers({serverId: targetServerId, subscribers: broadcast.body}))
        }

        if (broadcast.type === "newchannel") {

            
            dispatch(receiveChannel(broadcast.channel))
            
            const updatedChannelsArray = broadcast.server_channels;

            const serverId = broadcast.channel.server_id;

            const channelUpdateObject = ({serverId: serverId, channels: updatedChannelsArray})

            dispatch(updateChannels(channelUpdateObject))
        }

        if (broadcast.type === "destroyedchannel") {

            const updatedChannelsArray = broadcast.server_channels;

            const serverId = targetServerId


            const channelUpdateObject = ({serverId: serverId, channels: updatedChannelsArray})

            // debugger

            dispatch(updateChannels(channelUpdateObject))


        }


    }


    const userShowOpener = (e) => {
        // debugger
        e.preventDefault();
        let showingUserId = parseInt(e.currentTarget.id)
        dispatch(activateModalAC(showingUserId))
    }



            // const webSocket = consumer.subscriptions.create({
            //     channel: "ServerChannel", 
            //     server_id: targetServerId 
            // },
            // {
            //     received: updateServerSubscribers
            // })



    useEffect(() => {
        // const setUpWebsocket = () => {

            var webSocket = consumer.subscriptions.create({
                channel: "ServerChannel", 
                server_id: targetServerId 
            },
            {
                received: updateServerSubscribers
            })
            // debugger



        // }

        // setUpWebsocket();


        return () => webSocket?.unsubscribe();

    },[targetServerId, dispatch])




    // const owner = useSelector(state => targetServer? state.entities.users[targetServer.ownerId] : null)
    // const ownerLiElement = owner? <li className="King"> {owner.username} -- OWNER </li> : null
    // Saturday, Apr 8th, 8:24pm... this code is depreciated.. 
    // NOTE: don't rely on the session slice for anything other than the user ID.
    // I was young 4 days ago. now i am old and learned. 

    let participantsLiElements = [];

    subscribersIdArray?.forEach((userId) => {

        if (targetServer.ownerId === userId) {

            // debugger
            participantsLiElements.unshift(
                <li id={userId} onClick={userShowOpener} className="UserLi">

                    <div className="UserImageContainer">
                        {allUsers[userId]?.avatar ? 
                            <img src={allUsers[userId]?.avatar}/>
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
            participantsLiElements.push(
                <li id={userId} onClick={userShowOpener} className="UserLi">

                    <div className="UserImageContainer">
                        {allUsers[userId]?.avatar ? 
                            <img src={allUsers[userId]?.avatar}/>
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


        <ul id="memberslistings">
            <header>
                <h5>Members - {participantsLiElements?.length}</h5>
            </header>
            {participantsLiElements}



        </ul>
    )

}