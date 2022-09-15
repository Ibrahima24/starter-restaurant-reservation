import { useHistory } from "react-router"
import { useState } from "react";
import { createRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservationsComponent(){
    const history = useHistory();
    const [error, setError] = useState(null)
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    });

const onChange = (event) => {
    const value = event.target.value
    console.log("onChange", value, [event.target.name])
    setReservation({
        ...reservation,
        [event.target.name]: value
    })
}

const submitHandler = (event) => {
event.preventDefault()
reservation.people=Number(reservation.people)
createRes(reservation)
.then(() => {
    history.push(`/dashboard?date=${reservation.reservation_date}`)
})
.catch(setError)
}

    return (
    <div> 
    <h2>Reserve A Table</h2>       
    <form name="create_reservation" onSubmit={submitHandler}>
        <div className="form-group">
        <label htmlFor="first_name">First Name</label>    
        <input
        required 
        name="first_name"
        type="string"
        className="form-control"
        placeholder="First Name"
        onChange={onChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
        required 
        name="last_name"
        type="string"
        placeholder="Last Name"
        className="form-control"
        onChange={onChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
        required 
        name="mobile_number"
        type="string"
        placeholder="Mobile Number"
        className="form-control"
        onChange={onChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="reservation_date">Date</label>
        <input
        required 
        name="reservation_date"
        type="date"
        onChange={onChange}
        className="form-control"
        value={reservation.reservation_date}
        />
        </div>
        <div className="form-group">
        <label htmlFor="reservation_time">Time</label>
        <input
        required 
        name="reservation_time"
        type="time"
        className="form-control"
        onChange={onChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="people">Number of People</label>
        <input
        required 
        name="people"
        type="number"
        placeholder="Party Size"
        className="form-control"
        onChange={onChange}
        />
        </div>
        <ErrorAlert error={error} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button"
        onClick={() => history.go(-1)}
        className="btn btn-secondary ml-1"
        >Cancel</button>
        
    </form>   
    </div> 
    )
}