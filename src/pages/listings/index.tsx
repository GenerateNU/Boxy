import Link from "next/link";

type Listing = {
  listing_id: string;
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({ listings }) {
  return (
    <div>
      {listings.map((listing: Listing) => {
        return (
          <h1 key={listing.listing_id}>
            {"$" + listing.price + " " + listing.name + " " + listing.proximity}
          </h1>
        );
      })}
      <Link href="/login">Login</Link>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      listings: await (
        await fetch("http://localhost:3000/api/listings")
      ).json(),
    },
  };
}
