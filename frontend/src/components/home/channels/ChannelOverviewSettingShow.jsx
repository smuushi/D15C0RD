import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChannel } from "../../../reducers/ChannelReducer";
import "./channeloverviewsettingshow.css"
import { resetModalAC } from "../../../reducers/ModalReducer";

export const ChannelOverviewSettingShow = (props) => {

    const {currentChannel} = props;

    let showId = "ChannelOverview"

    const isActive = (props.selection === showId)


    const [namee, setNamee] = useState(currentChannel?.name)


    const [description, setDescription] = useState(currentChannel?.description? currentChannel.description : "" )

    const dispatch = useDispatch();


    const changeHandler = (e) => {
        e.preventDefault();

        if (e.currentTarget.id === "description") {
            const nextval = e.currentTarget.value;
            setDescription(() => nextval);
            return 
        }
        // debugger
        const newval = e.currentTarget.value;

        setNamee(() => newval);
    }
    



    const submitHandler = (e) => {
        e.preventDefault();


        const newChannel = ({
            name: namee, 
            id: currentChannel.id, 
            description: description
        })

        if  (namee) {
            dispatch(updateChannel(newChannel)).then(() => {
                dispatch(resetModalAC())
            })
        } else {
            // console.log('there was no name???')
        }

    }



    if (isActive) {

        return (
            <div className="ShowDiv">

                    <header>
                        <h3>Channel Overview for #{currentChannel.name}</h3>
                    </header>

                <form id="ChannelUpdateForm" onSubmit={submitHandler}>


                    

                    <div className="namer">
                        <label htmlFor="channelname">Channel Name</label>
                        <input type="text" value={namee} onChange={changeHandler}/>
                    </div>

                    <div className="descriptioner">
                        <label htmlFor="description">Channel Topic</label>
                        <input id="description" type="text" value={description} onChange={changeHandler}
                        placeholder="Let everyone know how to use this channel!"/>
                    </div>

                    <button id="submitter" type="submit">
                        Save Changes
                    </button>

                

                </form>

                
                <img id="settingsimage" src="/assets/misc/settingsimage.svg" />

            </div>
        ) 

    }

}