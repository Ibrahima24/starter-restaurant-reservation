import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const query  = useQuery();
  const date = query.get("date") || today();

  const history = useHistory();

  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
      {reservations.length !== 0 ? (
      <ReservationsComponent reservations={reservations} 
      loadDashboard={loadDashboard}/>) : 
      (
          `There are no reservations today`
        )}
        </div>
      <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
      <button onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
      <ListTables tables={tables} loadTables={loadTables} loadDashboard={loadDashboard}/>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;