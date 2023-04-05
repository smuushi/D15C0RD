import { useState } from "react"
import { Creation } from "./subforms/Creation";
import { Setting } from "./subforms/Setting";
import { Name } from "./subforms/Name";
import "./newserver.css"


export const NewServerForm = (props) => {

    const [creation, setCreation] = useState();

    const [setting, setSetting] = useState();

    const [name, setName] = useState();

    return (
        <>
            {!creation? <Creation setCreation={setCreation}/> : <h5>first subform is notrendering</h5> }
            {creation && !setting? <Setting setSetting={setSetting}/>: <h5>second subform is not rendering</h5>}
            {creation && setting && !name? <Name setName={setName}/>: <h5>third subform is not rendering</h5>}
        </>
      
    )
}