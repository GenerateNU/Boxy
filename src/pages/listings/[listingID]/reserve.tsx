import { useRouter } from "next/router";

export default function ListingReservationPage() {
  const router = useRouter();
  const { listingID } = router.query;

  return (
    <div className="flex flex-col pt-16">
      <h1>reservation for listing {listingID} page go here</h1>
      <button onClick={sendReservationRequest}>
        click here to reserve reservation
      </button>
    </div>
  );

  function sendReservationRequest() {
    // make call to endpoint then redirect to my reservations

    router.push("http://localhost:3000/reservations/mine");
  }
}
