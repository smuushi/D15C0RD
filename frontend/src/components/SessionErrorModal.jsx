import { useEffect } from "react";
import { useSelector } from "react-redux";


export const SessionErrorModal = (props) => {
    
    
    const allSessionErrors = useSelector((state) => state.errors.sessionError)

    const targetError = props.target;

    let positiveMatch;

    
    // useEffect(()=> {
        allSessionErrors.forEach((error) => {
            // debugger
            if (targetError === error) {
                // debugger
                positiveMatch = error;
                // debugger
            }
        })
    // })


    // debugger

    return (
        <>
            {positiveMatch? <div>{positiveMatch} </div>: <></>}
        </>
    )
}