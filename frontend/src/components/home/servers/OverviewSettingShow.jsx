import { useEffect } from "react";
import { useState } from "react";
import './overviewsettingshow.css'
import { useDispatch } from "react-redux";
import { updateServer } from "../../../reducers/ServerReducer";
import { useNavigate } from "react-router-dom";
import { resetModalAC } from "../../../reducers/ModalReducer";

export const OverviewSettingShow = (props) => {

    const {currentServer} = props;

    let showId = "ServerOverview"

    const isActive = (props.selection === showId)

    const [icon, setIcon] = useState(null)
    const [namee, setNamee] = useState(currentServer?.name)

    const [iconUrl, setIconUrl] = useState()

    const dispatch = useDispatch();

    const navigate = useNavigate()


    const changeHandler = (e) => {
        e.preventDefault();

        // debugger
        const newval = e.currentTarget.value;

        setNamee(() => newval);
    }
    

    const fileHandler = (e) => {
        // debugger
        e.preventDefault();
        const iconFile = e.currentTarget.files[0]
        setIcon(iconFile)

        if (iconFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(iconFile);
            fileReader.onload = () => setIconUrl(fileReader.result);
            

        } else {
            setIconUrl(null)
        }

    }

    const submitHandler = (e) => {
        e.preventDefault();


        const newServer = ({
            name: namee, 
            id: currentServer.id, 
            icon: icon
        })

        if  (namee) {
            dispatch(updateServer(newServer)).then(() => {
                navigate(`/home/server/${currentServer.id}`)
                dispatch(resetModalAC())
            })
            setNamee(() => "updating!! please wait!!")
        } else {
            // console.log('there was no name???')
        }

    }

    const removeiconhandler = () => {
        dispatch(updateServer({icon: null, removeicon: true, id: currentServer.id}))

    }

    let preview = currentServer?.icon? <img src={currentServer?.icon}/> :<></>

    

    if (iconUrl) preview = <img src={iconUrl}/>

    
    if (isActive) return (
        <div className="ShowDiv">

                <header>
                    <h3>Server Overview for "{currentServer?.name}"</h3>
                </header>

            <form id="ServerUpdateForm" onSubmit={submitHandler}>


                <div className="icon">

                    <div className="previewer">
                        {preview}
                    </div>
                    <button id="remover" onClick={removeiconhandler}>
                        X
                    </button>


                        <section>

                            <div className="texter">
                                We reccomend an Image of at least 512x512 for the server.
                            </div>
                            
                            <div className="inputter">
                                <input type="file" onChange={fileHandler} />
                            </div>

                        </section>
            
                </div>

                <div className="namer">
                    <label htmlFor="servername">Server Name</label>
                    <input type="text" value={namee} onChange={changeHandler}/>
                </div>

                <button id="submitter" type="submit">
                    Save Changes
                </button>

               

            </form>

            

        </div>
    ) 
}