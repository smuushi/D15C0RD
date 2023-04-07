import { useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import { createNewChannel } from "../../../../reducers/ChannelReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const NewChannelForm = (props) => {

    const [channelName, setChannelName] = useState();

    const serverId = useParams().serverId

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const changeHandler = (e) => {
        e.preventDefault();

        setChannelName(() => e.target.value)


    }


    const submitHandler = (e) => {
        e.preventDefault();

        console.log(serverId)

        const newChannelInfo = {
            serverId: serverId, 
            name: channelName
        }

        if (channelName) {
            dispatch(createNewChannel(newChannelInfo)).then(([res, channelId]) => {
                navigate(`/home/server/${serverId}/channel/${channelId}`)
            })
        }

    }

    return (

        <form onSubmit={submitHandler}>

            <header>
                <h3>Create Channel</h3>
                <h5>in Text Channels</h5>
            </header>

            <div className="content">

                <label htmlFor="channelName">CHANNEL NAME</label>

                <input type="text" id="channelName" value={channelName} onChange={changeHandler}/>
                

            </div>

            <button id="submitter">Create New Channel</button>

        </form>
    )
}