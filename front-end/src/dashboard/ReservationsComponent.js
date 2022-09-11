export default function ReservationsComponent({reservations}){
    let reservationsList = reservations.map((reservation) => {
        return (
            <div key={reservation.reservation_date}>
               <p>Name: {reservation.first_name} {reservation.last_name}</p>
               <p>Mobile number: {reservation.mobile_number}</p>
               <p>Date of reservation: {reservation.reservation_date}</p>
               <p>Time of reservation: {reservation.reservation_time}</p>
               <p>Number of guests: {reservation.people} </p>
            </div>
        )
    })

    return <>{reservationsList}</>
}