import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { formatAsDate } from "../utils/date-time";

export default function FormComponent({
  errors,
  newReservation,
  submitHandler,
}) {
   
  const [formData, setFormData] = useState(newReservation);
  const history = useHistory();

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
    <>
      <form onSubmit={(event) => submitHandler(event, formData)}>
        <div>
          <input
            name="first_name"
            value={formData.first_name}
            placeholder={formData.first_name || "First Name"}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            name="last_name"
            value={formData.last_name}
            placeholder={formData.last_name || "Last Name"}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="string"
            name="mobile_number"
            value={formData.mobile_number}
            placeholder={formData.mobile_number || "Mobile Number"}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="people"
            value={formData.people}
            placeholder="Party Size"
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            value={formData.reservation_date}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="time"
            name="reservation_time"
            value={formData.reservation_time}
            onChange={onChange}
          />
        </div>
        <ErrorAlert error={errors} />
        <button type="submit">Submit</button>

        <button
          data-reservation-id-cancel={formData.reservation_id}
          type="button"
          onClick={() => {
            history.go("-1");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}