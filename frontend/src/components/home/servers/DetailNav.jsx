import { useSelector } from "react-redux";

export const DetailNav = (props) => {

    const {targetContext} = props;

    const channel = useSelector(state => state.entities.channels[targetContext])

    
    // const server = useSelector(state => state.entities)


    return (
        <nav className="DetailNav"> 

            <div className="bufferhash">
                #
            </div>

            <div>
                {targetContext? channel?.name : "Select a channel or convo and start chatting!"}
            </div>

            <div className="descript">
                {channel?.description? <><div className="smalldiv"></div> {channel?.description} </> : <></>}
            </div>
        
        </nav>
    )

}