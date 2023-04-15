import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StasherDashboard() {
  const { data, status } = useSession();
  const [reservations, setReservations] = useState([]);

  if (status === "unauthenticated") {
    signIn();
  }

  useEffect(() => {
    getReservations();
  }, []);

  async function getReservations() {
    const all_res = await (
      await fetch("http://localhost:3000/api/reservations/sent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    console.log(all_res);

    setReservations(all_res["my reservation requests"]);
  }

  return (
    <div className="container flex justify-center min-w-full pt-16">
      <h1>my reservations </h1>
      <span></span>
      {reservations.map((reservation) => {
        return <h1>this is reservation with ID {reservation}</h1>;
      })}
    </div>
  );
}
