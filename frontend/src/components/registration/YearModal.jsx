import { useDispatch, useSelector } from "react-redux";
import { resetModalAC } from "../../reducers/ModalReducer";

export const YearModal = (props) => {

    const modalId = "year"

    const isActive = !!(modalId === useSelector(state => state.activeModal))

    const typeStatus = props.typer;

    const [year, setYear] = props.states;
    // debugger
    const dispatch = useDispatch();

    const clickHandler = (e) => {

        // debugger
        setYear(() => e.target.id)
        dispatch(resetModalAC())

    }

    let yearsArray = [];

    for(let i = 2020; i > 1870; i--){
        yearsArray.push(JSON.stringify(i))
    }
    
    // debugger

    let okYearsArray;

    if (typeStatus === true) {
        okYearsArray = (year === "Year") ? yearsArray : yearsArray.map((indYear) => {
            if (indYear.includes(year)) {
                return indYear;
            }
        })
    } else {
        okYearsArray = yearsArray;
    }

    let yearsLiElements;

    if (typeStatus === true) {
        yearsLiElements = okYearsArray.map((indYear) => {

            return (year === indYear) ?
            <li key={indYear} id={indYear} style={{fontWeight:"900"}}>{indYear}</li> 
                :
            indYear? <li key={indYear} id={indYear} > {indYear} </li> : <></>

        })
    } else {
        
        yearsLiElements = yearsArray.map((indYear) => {
            // debugger
            return year === indYear ? 
            <li key={indYear} id={indYear} style={{fontWeight:"900"}}>{indYear}</li> 
                : 
            <li key={indYear} id={indYear} > {indYear} </li> 
            // <li id={`${indDay}` > {indDay} </li> 
        })
    }


    // debugger

    if (isActive){

        return (
            <ul onClick={clickHandler} style={{cursor:"pointer"}}>
                {yearsLiElements}
            </ul>
        )
    } else {
        return <></>
    }

}