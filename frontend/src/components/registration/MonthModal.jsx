import { useDispatch, useSelector } from "react-redux";
import { resetModalAC } from "../../reducers/ModalReducer";
import { useEffect } from "react";

export const MonthModal = (props) => {

    const modalId = "month";

    const isActive = !!(modalId === useSelector(state => state.activeModal));

    const [month, setMonth] = props.states;

    const typeStatus = props.typer;
    // debugger
    const dispatch = useDispatch()

    // useEffect(()=> {
      
    //     return () => {
    //         for(let i = 0; i < okMonthsStringArray.length; i++){
    //             if (month === okMonthsStringArray[i]) {
    //                 return
    //             }
    //         }
    //         setMonth(() => okMonthsStringArray[0]? okMonthsStringArray[0] : "January")
    //     }

    // })

    const clickHandler = (e) => {

        // debugger
        setMonth(() => e.target.id);
        dispatch(resetModalAC())

    }

    const monthsStringArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December"
    ];

    let okMonthsStringArray;

    if (typeStatus === true) {
        okMonthsStringArray = (month === "Month") ? monthsStringArray : monthsStringArray.map((indMonth) => {
            if (indMonth.toUpperCase().includes(month.toUpperCase())) {
                return indMonth
            } 
        })
    } else {
        okMonthsStringArray = monthsStringArray;
    }
    
    let monthsLiElements;

    // if (typeStatus === true) {
    
    if (typeStatus === true) {
        monthsLiElements = okMonthsStringArray.map((indMonth) => {
            // debugger
            return month === indMonth ? 
            <li key={indMonth} id={indMonth} style={{fontWeight:"900"}}>{indMonth}</li> 
            : 
            indMonth? <li key={indMonth} id={indMonth} > {indMonth} </li> : <></>
            // <li id={`${indMonth}` > {indMonth} </li> 
        })
    } else {
        monthsLiElements = okMonthsStringArray.map((indMonth) => {
            // debugger
            return month === indMonth ? 
            <li key={indMonth} id={indMonth} style={{fontWeight:"900"}}>{indMonth}</li> 
            : 
            <li key={indMonth} id={indMonth} > {indMonth} </li>
        })
    }

    // } else {

    //     monthsLiElements = okMonthsStringArray.map((indMonth) => {
    //         // debugger
    //         return month === indMonth ? 
    //         <li key={indMonth} id={indMonth} style={{fontWeight:"900"}}>{indMonth}</li> 
    //         : 
    //         <li key={indMonth} id={indMonth} > {indMonth} </li>
    //     })

    // }

    // debugger

    
    if (isActive) {
        return (
            <ul className="ModalContainer" onClick={clickHandler} style={{cursor:"pointer"}}>
                {monthsLiElements}
            </ul>
        )
    } else if (!isActive) {
        <>
        </>
    }
}