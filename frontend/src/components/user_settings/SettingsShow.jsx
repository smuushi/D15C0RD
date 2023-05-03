import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { sendOutUserUpdate } from "../../reducers/UserReducer"
import "./settingsshow.css"

export const SettingsShow = (props) => {

    let showId = "MyAccount"

    const currentUserId = useSelector(state => state.entities.session.user?.id)



    const currentUser = useSelector(state => state.entities.users[currentUserId])

    const [username, setUsername] = useState(currentUser?.username)

    const [avatar, setAvatar] = useState()

    const [avatarUrl, setAvatarUrl] = useState()

    const [about, setAbout] = useState(currentUser?.about ? currentUser?.about : "")

    const dispatch = useDispatch();

    // console.log(about)

    const isActive = (props.selection === showId)

    let preview = currentUser?.avatar? <img src={currentUser?.avatar}/> :<></>

    if (avatarUrl) preview = <img src={avatarUrl}/>



    const fileHandler = (e) => {
        e.preventDefault();

        const iconFile = e.currentTarget.files[0]
        // copypasted from serveroverview..
        // that's why it says icon.. 
        setAvatar(() => iconFile)

        if (iconFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(iconFile);
            fileReader.onload = () => setAvatarUrl(fileReader.result);
        } else {
            setAvatarUrl(null)
        }

    }


    const changeHandler = (e) => {
        e.preventDefault();

        let update = e.currentTarget.value
        
        switch( e.currentTarget.id ) {
            case "username":
            setUsername(() => update)
            break;

            case "aboutme":
            setAbout(() => update)
            break;

        }

    }

    const submitHandler = (e) => {
        e.preventDefault();

        const userUpdateInfoObject = ({
            id: currentUserId, 
            avatar: avatar, 
            username: username, 
            about: about
        }) 


        dispatch(sendOutUserUpdate(userUpdateInfoObject)).then(() => {
            setTimeout(() => {
                setUsername(() => "updated!")
                setAbout(() => "updated!")
                setTimeout(() => {
                    setUsername(() => userUpdateInfoObject.username)
                    setAbout(() => userUpdateInfoObject.about)
                }, 2000)
            })
            }, 1000).then(() => {
        })

        setUsername(() => "updating..")
        setAbout(() => "updatting in progres...")

    }

    if (isActive) {
        return (
            <div className="ShowDiv UserSettingsShowDiv">
                <header className="SettingHeader">
                    <h3 id="headd">My Account</h3>
                </header>

                <div className="accountcontent">
                    <header>
                        <h3>
                            {currentUser?.username}
                        </h3>
                        <div className="previewer">
                            {preview}
                            <div className="texter">
                                Set your own Avatar!
                            </div>
                            <div className="inputter">
                                <input type="file" onChange={fileHandler} />
                            </div>
                        </div>
                    </header>
                    <form id="formerrr" onSubmit={submitHandler}>

                        <section>
                            <h3>Edit Info</h3>

                        </section>

                        <div className="namer">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" value={username} onChange={changeHandler}/>
                        </div>

                        <div className="abouter">
                            <label htmlFor="about">About Me</label>
                            <input id="aboutme" type="text" value={about} onChange={changeHandler}/>
                        </div>

                        <button id="submitterrr" type="submit">
                            Save Changes
                        </button>


                    </form>
                </div>
            </div>
        )
    }
}