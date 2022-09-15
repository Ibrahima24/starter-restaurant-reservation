import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import FormComponent from "../formComponent/FormComponent";
import { updateRes, editRes } from "../utils/api";

export default function EditReservationsComponent() {
    const history = useHistory();
    const params = useParams();
    const [newReservation, setNewReservation] = useState({
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: "",
    }); 
    const [errors, setErrors] = useState(null);
  
    useEffect(loadDashboard, [params.reservation_id]);
  
    function loadDashboard() {
      const abortController = new AbortController();
      setErrors(null);
      editRes(params.reservation_id, abortController.signal)
        .then(setNewReservation)
        .catch(setErrors);
      return () => abortController.abort();
    }
  
    const submitHandler = (event, newReservation) => {
      event.preventDefault();
      newReservation.people = Number(newReservation.people);
      updateRes(params.reservation_id, newReservation)
        .then(() =>
          history.push(`/dashboard/?date=${newReservation.reservation_date}`)
        )
        .catch((errors) => console.log("string", errors));
    };
  
    return (
      <FormComponent
        submitHandler={submitHandler}
        newReservation={newReservation}
        errors={errors}
      />
    );
  }