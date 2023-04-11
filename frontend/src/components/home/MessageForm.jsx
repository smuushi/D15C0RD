import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../reducers/MessagesReducer";
import { useParams } from "react-router-dom";


export const MessageForm = (props) => {

    const currentUserId = useSelector(state => state.entities.session.user.id)

    const { channelId } = props

    const [message, setMessage] = useState();

    const [picture, setPicture] = useState();

    const [picturePreview, setPicturePreview] = useState(null)

    const dispatch = useDispatch();

    const contextId = useParams().channelId

    useEffect(() => {
        return () => setPicturePreview(null)
    },[contextId])

    const fileHandler = (e) => {
        e.preventDefault();

        // debugger

        const pictureFile = e.currentTarget.files[0]
        setPicture(pictureFile)

        if (pictureFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(pictureFile);
            fileReader.onload = () => setPicturePreview(fileReader.result)
        } else {
            setPicturePreview(null)
        }

    }

    const submitHandler = (e) => {
        e.preventDefault();

        const newMessageObject = ({
            authorId: currentUserId,
            content: message,
            contextId: contextId,
            picture: picture
        })

        dispatch(createNewMessage(newMessageObject)).then(() => {
            setMessage(() => "")
            setPicturePreview(null)
            setPicture(null)
        })

        setMessage(() => ("sending message ..."))

    }

    const changeHandler = (e) => {

        if (!channelId) {
            return
        }
        e.preventDefault();


        setMessage(() => e.target.value)


    }

    if (!channelId) {

        return (

            <>

            <form onSubmit={submitHandler}>
                
                {!picturePreview ? <></> :
                <div style={{borderBottom: "1px solid gray", paddingTop:"10px"}}>
                    <img id="MessageImagePreview" src={picturePreview} style={{maxHeight: "200px", maxWidth:"200px"}}></img>
                </div>}
                
                <div className="inputwrapper">
                    
                    <label htmlFor="picture">
                        <i className="fa-solid fa-circle-plus"></i>
                    </label>
    
                <input id="picture" type="file" style={{display: "none"}} onChange={fileHandler} />
                
                <span> Select a channel to start chatting!</span>
    
                </div>
    
    
            </form>
            </>
        )

    }

    return (
        <>

        <form onSubmit={submitHandler}>
            
            {!picturePreview ? <></> :
            <div style={{borderBottom: "1px solid gray", paddingTop:"10px"}}>
                <img id="MessageImagePreview" src={picturePreview} style={{maxHeight: "200px", maxWidth:"200px"}}></img>
            </div>}
            
            <div className="inputwrapper">
                
                <label htmlFor="picture">
                    <i className="fa-solid fa-circle-plus"></i>
                </label>

            <input id="picture" type="file" style={{display: "none"}} onChange={fileHandler} />
            
            <input type="text" placeholder="Message" value={message} onChange={changeHandler}/>

            </div>


        </form>
        </>
    )
}