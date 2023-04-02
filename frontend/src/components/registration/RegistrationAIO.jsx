import { useParams } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState, useRef} from "react";
import { activateModalAC, resetModalAC } from "../../reducers/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MonthModal } from "./MonthModal";
import { DayModal } from "./DayModal";
import { YearModal } from "./YearModal";

import { sessionSignUp } from "../../reducers/SessionReducer";

import { SessionErrorModal } from "../SessionErrorModal";
import { clearSessionErrorAC } from "../../reducers/SessionReducer";


export const RegistrationAIO = (props) => {

    const modalState = useSelector(state => state.activeModal)
    
    // const errors = useSelector(state => state.errors)
    // const sessionError = useSelector(state => state.errors)


    // debugger
    const passedEmail = useParams().slug;
    const [email, setEmail] = useState(passedEmail ? passedEmail : "");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [month, setMonth] = useState("Month");
    const [day, setDay] = useState("Day");
    const [year, setYear] = useState("Year");

    const [typeStatus, setTypeStatus] = useState(false)
    const [dateError, setDateError] = useState("")

    const PWERROR = "Password is too short (minimum is 5 characters)"

    const dispatch = useDispatch();



    const changeHandler = (e) => {

        e.preventDefault();

        // debugger

        switch(e.target.id){

            case "email":
                setEmail(() => e.target.value)
                break;
            case "password":
                setPassword(() => e.target.value)
                break;
            case "username":
                setUsername(() => e.target.value)
                break;
            case "month":
                setMonth((prev) => 
                    prev === "Month" ? 
                    e.nativeEvent.data === null ? 
                        "" : e.nativeEvent.data : e.target.value
                )
                setTypeStatus(() => true)
                break;
            case "day":
                setDay((prev) => 
                    prev === "Day" ? 
                    e.nativeEvent.data === null ? 
                        "" : e.nativeEvent.data : e.target.value
                )
                setTypeStatus(() => true)
                break;
            case "year":
                setYear((prev) => 
                    prev==="Year"?
                    e.nativeEvent.data === null ? 
                        "" : e.nativeEvent.data : e.target.value
                )
                setTypeStatus(() => true)
                break;
        }




        // if (e.target.id === "email"){
        //     setEmail(() => e.target.value)
        // } else if (e.target.id === "password") {
        //     setPassword(() => e.target.value)
        // } else if (e.target.id === "username") {
        //     setUsername(() => e.target.value)
        // } 
    }

    const openModal = (e) => {
        dispatch(activateModalAC(e.target.id))
        // debugger
    }

    // let [prevModal, setPrevModal] = useRef();

    const closeModal = (e) => {
        console.log(modalState)
        setTypeStatus(() => false)
        // console.log(typeStatus)
        // debugger
        if (e.target.id === modalState){
            return
        } else {
            dispatch(resetModalAC())
        }
    }

    const isValidDate = () => {
        const dateString = month + " " + day + ", " + year;

        let date = new Date(dateString);

        if (month === "Month" || day === "Day" || year === "Year" ){
            // debugger
            return "ok"
        }

        function _isValidDate(year, month, day) {
            // let d = new Date(year, month, day);
            let _dateString = month + " " + day + ", " + year;
            let d = new Date(_dateString)
            // debugger
            if (d.getDate() == day) {
                return true;
            }
            return false;
        }

        return _isValidDate(year, month, day)

        // return !!JSON.parse(JSON.stringify(date));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        // debugger
        if(isValidDate() === true) {
            let user = {
                email,
                username, 
                password
            }
            dispatch(sessionSignUp(user))
            setDateError(() => "")
        } else {
            // dispatch({type: "sess/RECEIVEERROR", error: "Please enter a valid date of birth"}) // dispatch a specific error... 
            setDateError(() => "Please enter a valid date of birth")
        }

    }

    useEffect(()=>{

        // console.log(isValidDate())
        // setYear("889")
        // if (!isValidDate()) {
            console.log(isValidDate())
        // }
        return () => {
            dispatch(resetModalAC())
            dispatch(clearSessionErrorAC())
        }
    }, [])

    // debugger

    // console.log(help)
    return (
        <>
    
            <div className="RegistrationForm" onClick={closeModal}>

                <h1>Create an account</h1>

                <form onSubmit={submitHandler}>

                    <label htmlFor="email">EMAIL</label>
                    <input id="email" type="text" value={email} onChange={changeHandler} required />

                    <label htmlFor="username">USERNAME</label>
                    <input id="username" type="text" value={username} onChange={changeHandler} required />

                    <label htmlFor="password">PASSWORD</label> 
                    <SessionErrorModal target={PWERROR} />
                    <input id="password" type="password" value={password} onChange={changeHandler} required />

                        <br />
                    <label >DATE OF BIRTH</label>
                    <input id="month" type="text" onFocus={openModal} onChange={changeHandler} value={month} /> 
                    <input id="day" type="text" onFocus={openModal} onChange={changeHandler} value={day} />
                    <input id="year" type="text" onFocus={openModal} onChange={changeHandler} value={year} />
                    {dateError ? `${dateError}` : ""}
                        <br />
                    <input type="submit" value="Continue"/>

                        <br />
                    <Link to={`/login/${email ? email : ""}`}>Already have an account?</Link>
                </form>

            </div>

            <MonthModal typer={typeStatus} states={[month, setMonth]} />
            <DayModal typer={typeStatus} states={[day, setDay]} />
            <YearModal typer={typeStatus} states={[year, setYear]} />

        </>

    )
}