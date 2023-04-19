import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ReservationDetails = {
  datesRequested: Array<Date>;
  name: string;
};

export default function StasherDashboard() {
  const { data, status } = useSession();
  const [reservations, setReservations] = useState<Array<ReservationDetails>>(
    []
  );

  if (status === "unauthenticated") {
    signIn();
  }

  useEffect(() => {
    getReservations();
  }, []);

  async function getReservations() {
    const all_res = (
      await (
        await fetch("http://localhost:3000/api/reservations/sent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json()
    )["my reservations"];

    console.log(all_res);

    const reservations: { datesRequested: any; name: any }[] = [];

    all_res.forEach((reservation: { [x: string]: any }) =>
      reservations.push({
        datesRequested: reservation["dates_requested"],
        name: reservation["reservation_name"],
      })
    );

    setReservations(reservations);
  }

  return (
    <div className="container flex justify-center min-w-full pt-16">
      <h1>my reservations </h1>
      <span></span>
      <ul>
        {reservations ? (
          reservations.map((reservation) => {
            return (
              <li>{reservation.datesRequested + " | " + reservation.name}</li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
