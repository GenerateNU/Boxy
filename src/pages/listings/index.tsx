import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

type Listing = {
  name: string;
  price: string;
  proximity: string;
};

export default function ListingsPage({ listings }) {
  return (
    <>
      {listings.map((listing: Listing) => {
        return (
          <h1>
            {"$" + listing.price + " " + listing.name + " " + listing.proximity}
          </h1>
        );
      })}
      <Link href="/login">Login</Link>
    </>
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
