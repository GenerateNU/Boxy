import { useRouter } from "next/router";

export default function ListingReservationPage() {
  const router = useRouter();
  const { listingID } = router.query;

  return (
    <div className="flex flex-col pt-16">
      <h1>reservation for listing {listingID} page go here</h1>
    </div>
  );
}
