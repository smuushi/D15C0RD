import { useDispatch, useSelector } from "react-redux";
import { resetModalAC } from "../../reducers/ModalReducer";

export const DayModal = (props) => {

    const modalId = "day"

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const typeStatus = props.typer;
    console.log(typeStatus)

    const [day, setDay] = props.states;
    // debugger
    const dispatch = useDispatch();

    const clickHandler = (e) => {

        // debugger
        setDay(() => e.target.id)
        dispatch(resetModalAC())

    }

    let daysArray = [];

    for(let i = 1; i < 32; i++){
        daysArray.push(JSON.stringify(i))
    }
    
    // debugger
    let okDaysArray;

    if (typeStatus === true) {
        okDaysArray = day === "Day" ? daysArray : daysArray.map((indDay) => {
            if (indDay.toUpperCase().includes(day.toUpperCase())) {
                return indDay
            } 
        })
    } else {
        // debugger
        okDaysArray = daysArray;
    }

    const daysLiElements = okDaysArray.map((indDay) => {
        // debugger
        return day === indDay ? 
        <li key={indDay} id={indDay} style={{fontWeight:"900"}}>{indDay}</li> 
            : 
        indDay? <li key={indDay} id={indDay} > {indDay} </li> : <></>
        // <li id={`${indDay}` > {indDay} </li> 
    })

    // debugger

    if (isActive){

        return (
            <ul onClick={clickHandler} style={{cursor:"pointer"}}>
                {daysLiElements}
            </ul>
        )
    } else {
        return <></>
    }

}