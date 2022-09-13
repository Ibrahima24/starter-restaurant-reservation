export default function ListTables({tables}){

    const list = tables.map((table) => {
        return (
            <div key={table.table_id}>
            <p>{table.table_name}</p>
            <p>{table.table_id}</p>
            <p>{table.table_capacity}</p>
            <p><span data-table-id-status={table.table_id}>
                {table.reservation_id ? 'Occupied' : 'Free'}
            </span></p>
            </div>
        )
    })
    return (<>{list}</>)
}