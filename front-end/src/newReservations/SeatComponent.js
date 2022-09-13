import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, updateTable } from "../utils/api";

export default function SeatComponent(){
const history = useHistory();
const [tableId, setTableId] = useState();
const [tablesError, setTablesError] = useState(null);
const [tables, setTables] = useState([]);

let params = useParams();
let reservation_id = params.reservation_id;

console.log(tables)

    useEffect(loadTables, []);
    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    const tablesForm = tables.map((table, index) => {
        return (
            <>
            <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
            </option>
            </>
        )
    })

    const onChange = (event) => {
        const { target } = event;
        const value = target.value;

        setTableId(value)
        console.log("line 38", value, [target.name], )
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(tableId){
        updateTable(tableId, reservation_id)
        .then(() => history.push("/")) 
        .catch(setTablesError) ;
        }
    };

console.log("tableId", tableId)


    return (
        <form onSubmit={submitHandler}>
            <select required name="table_id" onChange={onChange}>
                {tablesForm}
            </select>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => history.go(-1)}
            >Cancel</button>
        </form>
    )
}