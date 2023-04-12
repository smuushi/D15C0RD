import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sendUpdateMessage } from "../../../../reducers/MessagesReducer"

export const UpdateMessageModal = (props) => {

    const messageId = props.messageId
    
    const selectedMessageId = props.selectedmessage

    // debugger

    console.log(messageId)
    console.log(selectedMessageId)

    const setSelectedMessageId = props.setselectedmessage // this is a setter function

    const [currentMessageContent, setCurrentMessageContent] = useState(props?.message)

    const dispatch = useDispatch();



    const submitHandler = (e) => {
        e.preventDefault();

        const updateRequest = ({
            messageId: messageId, 
            newMessage: currentMessageContent,
        })

        // dispatch thunk update action for message here!
        setCurrentMessageContent(() => "patching update atm.. please wait..")

        dispatch(sendUpdateMessage(updateRequest)).then(() => {
            setSelectedMessageId(() => 0)
        }).catch(() => {
            setCurrentMessageContent(() => "update failed")
        })



    }

    const changeHandler = (e) => {
        e.preventDefault();

        const newMessage = e.currentTarget.value

        setCurrentMessageContent(() => newMessage)
        
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        setSelectedMessageId(() => 0)

    }

    useEffect(() => {
       setCurrentMessageContent(() => (props?.message))
    },[selectedMessageId])

    if (messageId == selectedMessageId) {
        return(
            <span class="editingspan">
                <form className="messageUpdateForm" onSubmit={submitHandler}>
                    <input type="text" value={currentMessageContent} onChange={changeHandler}/>

                    <div class="buttonscontainer">
                        <button type="submit"> save changes</button>
                        <button type="button" onClick={cancelHandler}>cancel</button>
                    </div>
                </form>
            </span>
        )

    }

}