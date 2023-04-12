import { useSelector } from "react-redux"
import { useState } from "react"


export const SettingsShow = (props) => {

    let showId = "MyAccount"

    const currentUserId = useSelector(state => state.entities.session.user?.id)



    const currentUser = useSelector(state => state.entities.users[currentUserId])

    const [username, setUsername] = useState(currentUser?.username)

    const [avatar, setAvatar] = useState(null)

    const [avatarUrl, setAvatarUrl] = useState()

    const [about, setAbout] = useState(currentUser?.about)


    const isActive = (props.selection === showId)

    let preview = currentUser?.avatar? <img src={currentUser?.avatar}/> :<></>

    if (avatarUrl) preview = <img src={avatarUrl}/>


    const fileHandler = (e) => {
        e.preventDefault();

        const iconFile = e.currentTarget.files[0]
        // copypasted from serveroverview..
        // that's why it says icon.. 
        setAvatar(iconFile)

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
    }

    if (isActive) {
        return (
            <div className="ShowDiv">
                <header>
                    <h3>My Account</h3>
                </header>

                <div>
                    <header>
                        <h3>
                            Username: {currentUser?.username}
                        </h3>
                    </header>
                    <form>
                        <div className="previewer">
                            {preview}
                        </div>


                        <section>

                        <div className="texter">
                            Set your own Avatar!
                        </div>

                        <div className="inputter">
                            <input type="file" onChange={fileHandler} />
                        </div>

                        </section>

                        <div className="namer">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" value={username} onChange={changeHandler}/>
                        </div>

                        <div className="abouter">
                            <label htmlFor="about">About Me</label>
                            <input id="aboutme" type="text" value={about} onChange={changeHandler}/>
                        </div>

                        <button id="submitter" type="submit">
                            Save Changes
                        </button>


                    </form>
                </div>
            </div>
        )
    }
}