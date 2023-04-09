import { useEffect, useState } from "react";


export const Name = (props) => {

    const {setName} = props;
    const {name} = props;

    const {icon, setIcon} = props;

    const [iconUrl, setIconUrl] = useState()

    const changeHandler = (e) => {
        setName(() => e.target.value)
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



    let preview = null;

    if (iconUrl) preview = <img src={iconUrl}/>

    return (

        <>
        <header>
            <h3> Customize your server</h3>
            <h5> Give your server a personality with a name and an icon. You can always change it later. </h5>

        </header>

        <div className="iconInput">
            {preview}
            <input type="file" onChange={fileHandler} />
        </div>

        <div className="nameInput">
            <label htmlFor="servername">Server Name</label>
            <br />
            <input onChange={changeHandler} id="servername" type="text" placeholder="Enter your server name here" />
        </div>

        <div id="submitters">

            {name? <button id="submissionbutton" type="submit">
                Create
            </button> :
            <button id="notworkingbutton"> fill name pls </button>}
        </div>
    
    </>

    )
}