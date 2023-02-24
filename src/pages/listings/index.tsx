import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

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
          <div>
            <h1>{"listing id: " + listing.listing_id}</h1>
            <h1>{"listing price: $" + listing.price}</h1>
            <h1>{"listing name: " + listing.name}</h1>
            <h1>{"listing proximity: " + listing.proximity}</h1>
          </div>
        );
      })}
      <Link href="/login">this is a link to the login page</Link>
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
