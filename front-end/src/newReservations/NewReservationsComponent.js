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
    <form onSubmit={submitHandler}>
        <div>
        <input 
        name="first_name"
        type="string"
        placeholder="First Name"
        onChange={onChange}
        />
        </div>
        <div>
        <input 
        name="last_name"
        type="string"
        placeholder="Last Name"
        onChange={onChange}
        />
        </div>
        <div>
        <input 
        name="mobile_number"
        type="string"
        placeholder="Mobile Number"
        onChange={onChange}
        />
        </div>
        <div>
        <input 
        name="reservation_date"
        type="date"
        onChange={onChange}
        value={reservation.reservation_date}
        />
        </div>
        <div>
        <input 
        name="reservation_time"
        type="time"
        onChange={onChange}
        />
        </div>
        <div>
        <input 
        name="people"
        type="number"
        placeholder="Party Size"
        onChange={onChange}
        />
        </div>
        <ErrorAlert error={error} />
        <button type="submit">Submit</button>
        <button type="button"
        onClick={() => history.go(-1)}
        >Cancel</button>
        
    </form>    
    )
}