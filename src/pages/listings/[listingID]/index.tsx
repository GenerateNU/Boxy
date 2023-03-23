import { useRouter } from "next/router";

export default function ListingDetailsPage() {
  const router = useRouter();
  const { listingID } = router.query;

  return (
    <div className="flex flex-col pt-16">
      <h1>listing {listingID} details go here</h1>
      <button onClick={() => router.push("./reserve")}>click here to reserve</button>
    </div>
  );
}
