import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { formatAsDate } from "../utils/date-time";

export default function FormComponent({
  errors,
  newReservation,
  submitHandler,
}) {
   
  const history = useHistory();
  const [formData, setFormData] = useState(newReservation);
  

  useEffect(() => {
    setFormData({
      ...newReservation,
      reservation_date: newReservation.reservation_date
        ? formatAsDate(newReservation.reservation_date)
        : "",
    });
  }, [newReservation]);

  const onChange = (event) => {
    const { target } = event;
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <div>
      <h2>Edit Your Table</h2>
      <form name="edit_reservation" onSubmit={(event) => submitHandler(event, formData)}>
        <div className="form-group">
        <label htmlFor="first_name">First Name</label>
          <input
            required
            name="first_name"
            value={formData.first_name}
            placeholder={"First Name"}
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
          <input
            required
            name="last_name"
            value={formData.last_name}
            placeholder={"Last Name"}
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div 
        className="form-group"
        >
        <label htmlFor="mobile_number">Mobile Number</label>
          <input
            required
            type="string"
            name="mobile_number"
            value={formData.mobile_number}
            placeholder={"Mobile Number"}
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
            value={formData.reservation_date}
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="reservation_time">Time</label>
          <input
            required
            type="time"
            name="reservation_time"
            value={formData.reservation_time}
            className="form-control"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="people">Number of People</label>
          <input
            required
            type="number"
            name="people"
            value={formData.people}
            placeholder="Party Size"
            className="form-control"
            onChange={onChange}
          />
        </div>
        <ErrorAlert error={errors} />
        <button type="submit" 
        className="btn btn-primary"
        >Submit</button>

        <button
          data-reservation-id-cancel={formData.reservation_id}
          type="button"
          className="btn btn-secondary ml-1"
          onClick={() => {
            history.go("-1");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}