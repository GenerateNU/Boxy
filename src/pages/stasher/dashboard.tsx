import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type ReservationDetails = {
  datesRequested: Array<Date>;
  name: string;
  hostName: string;
  address: string;
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

    const reservations: {
      datesRequested: any;
      name: string;
      hostName: string;
      address: string;
    }[] = [];

    all_res.forEach((reservation: { [x: string]: any }) =>
      reservations.push({
        datesRequested: reservation["dates_requested"],
        name: reservation["name"],
        hostName: reservation["host_name"],
        address: reservation["address"],
      })
    );

    setReservations(reservations);
  }

  return (
    <div className="container flex justify-center min-w-full pt-16">
      <span></span>
      <ul>
        {reservations ? (
          reservations.map((reservation) => {
            return (
              <div>
                <li>{reservation.datesRequested.toString()}</li>
                <li>{reservation.name}</li>
                <li>{reservation.hostName}</li>
                <li>{reservation.address}</li>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
